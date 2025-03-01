
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
  const { data: response, error } = await supabase.functions.invoke('analyze-salary', {
    body: { salaryData: data, userId }
  });

  if (error) {
    console.error('Error calling analyze-salary function:', error);
    throw new Error(`Failed to analyze salary offer: ${error.message}`);
  }

  return response;
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
