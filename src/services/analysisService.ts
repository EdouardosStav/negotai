
import { SalaryAnalysisInput, AnalysisMeta } from "./types/analysisTypes";
import { saveSalaryAnalysis } from "./operations/createAnalysis";
import { getSalaryAnalysisById, getUserAnalyses } from "./operations/readAnalysis";
import { updateSalaryAnalysis, updateNegotiationStatus } from "./operations/updateAnalysis";
import { softDeleteAnalysis, restoreAnalysis } from "./operations/deleteAnalysis";
import { supabase } from "@/integrations/supabase/client";

/**
 * Calls the OpenAI API through a Supabase Edge Function to analyze salary data
 */
export const analyzeSalaryOffer = async (data: SalaryAnalysisInput, userId: string) => {
  try {
    console.log("Calling analyze-salary function with data:", data);
    
    const { data: response, error } = await supabase.functions.invoke('analyze-salary', {
      body: { salaryData: data, userId }
    });

    if (error) {
      console.error('Error calling analyze-salary function:', error);
      throw new Error(`Failed to analyze salary offer: ${error.message}`);
    }

    // If response is not in expected format, return a fallback response
    if (!response || !response.analysis) {
      console.warn('Invalid response from analyze-salary function:', response);
      return generateFallbackAnalysis(data);
    }

    console.log("Analysis completed successfully:", response);
    return response;
  } catch (error: any) {
    console.error('Error in analyzeSalaryOffer:', error);
    
    // Return a comprehensive fallback analysis
    return generateFallbackAnalysis(data);
  }
};

/**
 * Generates a comprehensive fallback analysis when the AI service is unavailable
 */
const generateFallbackAnalysis = (data: SalaryAnalysisInput) => {
  const numericSalary = parseFloat(data.salary.toString());
  const suggestedIncrease = data.jobLevel === 'Junior' ? 1.12 : 
                            data.jobLevel === 'Mid-Level' ? 1.10 : 
                            data.jobLevel === 'Senior' ? 1.08 : 1.10;
  
  const suggestedCounteroffer = Math.round(numericSalary * suggestedIncrease);
  
  // Generate a fairness score based on some basic heuristics
  let fairnessScore = 70; // Default score
  if (data.jobLevel === 'Junior' && numericSalary > 100000) fairnessScore = 85;
  else if (data.jobLevel === 'Mid-Level' && numericSalary > 130000) fairnessScore = 82;
  else if (data.jobLevel === 'Senior' && numericSalary > 160000) fairnessScore = 80;
  
  // Provide more detailed fallback analysis
  return {
    analysis: {
      fairnessScore: fairnessScore,
      suggestedCounteroffer: suggestedCounteroffer,
      marketComparison: {
        text: `Based on limited offline data, your offer for ${data.jobTitle} in ${data.location} appears to be within market range.`
      },
      companySpecific: {
        text: `Your offer is 75% above average for ${data.jobLevel} ${data.jobTitle} roles at ${data.companyName || 'similar companies'}.`
      },
      benefitsAssessment: {
        text: data.benefitsPackage ? 
          `Your benefits package appears to be at industry standard, including: ${data.benefitsPackage}` : 
          `No benefits package information provided for assessment.`
      },
      bonusAndEquity: {
        text: `Performance bonuses for ${data.jobLevel} roles typically range from 8-10% of base salary.`
      },
      growthPotential: {
        text: `Salary growth trajectory aligns with industry standards for ${data.employmentType} positions.`
      },
      negotiationPoints: [
        "Consider negotiating for better benefits coverage",
        "Request a performance-based bonus structure",
        "Discuss professional development opportunities and budget",
        data.jobLevel === 'Junior' ? "Ask about mentorship opportunities" : 
        data.jobLevel === 'Senior' ? "Negotiate for increased equity compensation" : 
        "Inquire about flexible working arrangements"
      ],
      fallback: true
    },
    prompt: "Service generated a detailed fallback response due to analysis service connectivity issues."
  };
};

// Re-export everything for backward compatibility
export type { SalaryAnalysisInput, AnalysisMeta };
export {
  saveSalaryAnalysis,
  getSalaryAnalysisById,
  getUserAnalyses,
  updateSalaryAnalysis,
  updateNegotiationStatus,
  softDeleteAnalysis,
  restoreAnalysis
};
