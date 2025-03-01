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
  
  // Ensure counteroffer range exists
  let counterofferRange = analysis.counterofferRange;
  if (!counterofferRange || !counterofferRange.min || !counterofferRange.max) {
    counterofferRange = calculateCounterOfferRange(numericSalary, data.jobLevel, analysis.fairnessScore || 75);
  }
  
  return {
    // Ensure fairness score is a number between 0-100
    fairnessScore: typeof analysis.fairnessScore === 'number' 
      ? Math.min(100, Math.max(0, analysis.fairnessScore)) 
      : 75,
    
    // Ensure counter offer is a number
    suggestedCounteroffer: typeof analysis.suggestedCounteroffer === 'number'
      ? analysis.suggestedCounteroffer
      : Math.round((counterofferRange.min + counterofferRange.max) / 2),
    
    // Include counteroffer range
    counterofferRange: counterofferRange,
    
    // Add counteroffer justification if missing
    counterofferJustification: {
      text: cleanText(analysis.counterofferJustification?.text) || 
            generateCounterOfferJustification(data, counterofferRange, analysis.fairnessScore || 75)
    },
    
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
      : generateDefaultNegotiationPoints(data, counterofferRange)
  };
};

/**
 * Calculate counteroffer range based on salary, job level, and fairness score
 */
const calculateCounterOfferRange = (salary: number, jobLevel: string = 'Mid-Level', fairnessScore: number = 75) => {
  // Default ranges for different levels
  let minIncrease = 1.10; // 10% minimum increase
  let maxIncrease = 1.20; // 20% maximum increase
  
  // Adjust based on fairness score
  if (fairnessScore < 60) {
    // Very unfair offers get bigger suggested increases
    minIncrease = 1.25; // 25% minimum 
    maxIncrease = 1.40; // 40% maximum
  } else if (fairnessScore < 75) {
    // Somewhat unfair offers
    minIncrease = 1.15; // 15% minimum
    maxIncrease = 1.30; // 30% maximum
  } else if (fairnessScore >= 90) {
    // Very fair offers
    minIncrease = 1.03; // 3% minimum
    maxIncrease = 1.08; // 8% maximum
  }
  
  // Adjust based on job level
  if (jobLevel === 'Junior' || jobLevel === 'Entry') {
    minIncrease = Math.min(minIncrease + 0.05, 1.40); // Junior roles have more negotiation room
    maxIncrease = Math.min(maxIncrease + 0.05, 1.50);
  } else if (jobLevel === 'Senior' || jobLevel === 'Lead') {
    minIncrease = Math.min(minIncrease + 0.02, 1.30); // Senior roles more valuable
    maxIncrease = Math.min(maxIncrease + 0.03, 1.40);
  }
  
  // Calculate range
  const min = Math.round(salary * minIncrease);
  const max = Math.round(salary * maxIncrease);
  
  return { min, max };
};

/**
 * Generate counteroffer justification based on data
 */
const generateCounterOfferJustification = (
  data: SalaryAnalysisInput, 
  counterofferRange: { min: number, max: number },
  fairnessScore: number
) => {
  const numericSalary = parseFloat(data.salary.toString());
  const percentIncrease = Math.round(((counterofferRange.min + counterofferRange.max) / 2 / numericSalary - 1) * 100);
  
  if (fairnessScore < 70) {
    return `${percentIncrease}% increase to align with market rates for ${data.jobLevel} ${data.jobTitle} roles in ${data.location}`;
  } else if (fairnessScore < 85) {
    return `This range would bring your compensation in line with industry standards for your experience level`;
  } else {
    return `Your offer is competitive, but a small increase may still be negotiable`;
  }
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
 * Generates default negotiation points with counteroffer range
 */
const generateDefaultNegotiationPoints = (data: SalaryAnalysisInput, counterofferRange: { min: number, max: number }): string[] => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
  
  return [
    `Request ${formatter.format(counterofferRange.min)} - ${formatter.format(counterofferRange.max)} based on market rates`,
    data.benefitsPackage ? "Negotiate for enhanced benefits coverage" : "Request comprehensive benefits package details",
    "Negotiate for 10-15% performance bonus (industry standard)",
    data.jobLevel === "Junior" ? "Ask about mentorship and training opportunities" : "Discuss leadership and advancement opportunities",
    "Request flexible working arrangements"
  ];
};

/**
 * Generates a comprehensive fallback analysis when the AI service is unavailable
 */
const generateFallbackAnalysis = (data: SalaryAnalysisInput) => {
  const numericSalary = parseFloat(data.salary.toString());
  
  // Generate a fairness score based on some basic heuristics
  let fairnessScore = 70; // Default score
  if (data.jobLevel === 'Junior' && numericSalary > 100000) fairnessScore = 85;
  else if (data.jobLevel === 'Mid-Level' && numericSalary > 130000) fairnessScore = 82;
  else if (data.jobLevel === 'Senior' && numericSalary > 160000) fairnessScore = 80;
  
  // Calculate counteroffer range
  const counterofferRange = calculateCounterOfferRange(numericSalary, data.jobLevel, fairnessScore);
  const suggestedCounteroffer = Math.round((counterofferRange.min + counterofferRange.max) / 2);
  
  // Format currency for market range
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
  
  const marketRangeText = `The average salary for a ${data.jobLevel} ${data.jobTitle} in ${data.location} ranges from ${formatter.format(counterofferRange.min * 0.9)} to ${formatter.format(counterofferRange.max)}.`;
  
  // Provide more detailed fallback analysis
  return {
    fairnessScore: fairnessScore,
    suggestedCounteroffer: suggestedCounteroffer,
    counterofferRange: counterofferRange,
    counterofferJustification: {
      text: generateCounterOfferJustification(data, counterofferRange, fairnessScore)
    },
    marketComparison: {
      text: marketRangeText
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
      text: `Performance bonuses for similar roles typically range from 10-15% of base salary. Inquire about equity options if available.`
    },
    growthPotential: {
      text: `Career advancement opportunities should include clear promotion paths and professional development resources.`
    },
    negotiationPoints: generateDefaultNegotiationPoints(data, counterofferRange),
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
