
import { SalaryAnalysisInput, AnalysisMeta } from "./types/analysisTypes";
import { saveSalaryAnalysis } from "./operations/createAnalysis";
import { getSalaryAnalysisById, getUserAnalyses } from "./operations/readAnalysis";
import { updateSalaryAnalysis, updateNegotiationStatus } from "./operations/updateAnalysis";
import { softDeleteAnalysis, restoreAnalysis } from "./operations/deleteAnalysis";

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
