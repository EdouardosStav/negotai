
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
      return {
        analysis: {
          fairnessScore: 70,
          suggestedCounteroffer: Math.round(parseFloat(data.salary.toString()) * 1.12),
          marketComparison: {
            text: `Offer assessment is based on limited data for ${data.jobTitle} roles in ${data.location}.`
          },
          fallback: true
        },
        prompt: "Service generated a fallback response"
      };
    }

    return response;
  } catch (error: any) {
    console.error('Error in analyzeSalaryOffer:', error);
    throw error;
  }
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
