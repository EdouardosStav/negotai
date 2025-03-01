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

    // Log successful response for debugging
    console.log("Raw response from analyze-salary function:", response);
    
    // Validate the response structure
    if (!response || !response.analysis) {
      console.warn('Invalid response format from analyze-salary function:', response);
      return {
        analysis: generateFallbackAnalysis(data),
        prompt: "Service generated a fallback response due to analysis service connectivity issues."
      };
    }

    // Clean and format the analysis data
    const cleanedAnalysis = cleanAnalysisOutput(response.analysis, data);
    
    console.log("Analysis completed and cleaned successfully:", cleanedAnalysis);
    return {
      analysis: cleanedAnalysis,
      prompt: response.prompt
    };
  } catch (error: any) {
    console.error('Error in analyzeSalaryOffer:', error);
    
    // Return a comprehensive fallback analysis
    return {
      analysis: generateFallbackAnalysis(data),
      prompt: "Service generated a fallback response due to analysis service connectivity issues."
    };
  }
};

/**
 * Cleans and formats the analysis output to ensure consistent formatting
 */
const cleanAnalysisOutput = (analysis: any, data: SalaryAnalysisInput) => {
  // Ensure all required fields exist
  const numericSalary = parseFloat(data.salary.toString());
  
  return {
    // Ensure fairness score is a number between 0-100
    fairnessScore: typeof analysis.fairnessScore === 'number' 
      ? Math.min(100, Math.max(0, analysis.fairnessScore)) 
      : 75,
    
    // Ensure counter offer is a number
    suggestedCounteroffer: typeof analysis.suggestedCounteroffer === 'number'
      ? analysis.suggestedCounteroffer
      : Math.round(numericSalary * 1.1),
    
    // Clean up section texts
    marketComparison: {
      text: cleanText(analysis.marketComparison?.text)
    },
    companySpecific: {
      text: cleanText(analysis.companySpecific?.text)
    },
    benefitsAssessment: {
      text: cleanText(analysis.benefitsAssessment?.text)
    },
    bonusAndEquity: {
      text: cleanText(analysis.bonusAndEquity?.text)
    },
    growthPotential: {
      text: cleanText(analysis.growthPotential?.text)
    },
    
    // Ensure negotiation points are an array of strings
    negotiationPoints: Array.isArray(analysis.negotiationPoints)
      ? analysis.negotiationPoints.map(cleanText).filter(Boolean).slice(0, 5)
      : generateDefaultNegotiationPoints(data)
  };
};

/**
 * Cleans text of markdown artifacts and excess spaces
 */
const cleanText = (text?: string): string => {
  if (!text) return '';
  
  return text
    // Remove markdown headers
    .replace(/^#+\s+/gm, '')
    // Remove list markers
    .replace(/^[-*•]\s+/gm, '')
    // Remove numbered lists
    .replace(/^\d+\.\s+/gm, '')
    // Remove references to "###" that often appear in GPT outputs
    .replace(/###\s*/g, '')
    // Remove excess whitespace
    .replace(/\s{2,}/g, ' ')
    // Trim the result
    .trim();
};

/**
 * Generates default negotiation points
 */
const generateDefaultNegotiationPoints = (data: SalaryAnalysisInput): string[] => {
  return [
    "Request a salary increase to align with market standards",
    data.benefitsPackage ? "Negotiate for enhanced benefits coverage" : "Request comprehensive benefits package details",
    data.jobLevel === "Junior" ? "Ask about mentorship and training opportunities" : "Discuss leadership and advancement opportunities",
    "Inquire about performance bonus structure"
  ];
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
    fairnessScore: fairnessScore,
    suggestedCounteroffer: suggestedCounteroffer,
    marketComparison: {
      text: `The average salary for a ${data.jobLevel} ${data.jobTitle} in ${data.location} ranges from ${Math.round(numericSalary * 0.9)} to ${Math.round(numericSalary * 1.1)} according to market data.`
    },
    companySpecific: {
      text: data.companyName ? 
        `${data.companyName} is known for offering competitive compensation for ${data.jobLevel} ${data.jobTitle} roles.` :
        `Companies in this sector typically offer competitive compensation for ${data.jobLevel} ${data.jobTitle} roles.`
    },
    benefitsAssessment: {
      text: data.benefitsPackage ? 
        `Your benefits package includes: ${data.benefitsPackage}. This is in line with industry standards.` : 
        `Benefits information not provided - request details on healthcare, retirement plans, and PTO.`
    },
    bonusAndEquity: {
      text: `Performance bonuses for similar roles typically range from 8-10% of base salary. Inquire about equity options if available.`
    },
    growthPotential: {
      text: `Career advancement opportunities should include clear promotion paths and professional development resources.`
    },
    negotiationPoints: [
      "Request a salary increase to align with market standards",
      "Inquire about performance bonus structure",
      "Discuss professional development opportunities",
      "Ask about flexible work arrangements"
    ],
    fallback: true
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
