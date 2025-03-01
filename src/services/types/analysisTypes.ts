
export interface SalaryAnalysisInput {
  jobTitle: string;
  companyName?: string;
  jobLevel?: string;
  employmentType: string;
  experience: string;
  location: string;
  salary: string | number;
  benefitsPackage?: string;
}

export interface AnalysisMeta {
  fairnessScore: number;
  suggestedCounteroffer: number;
}
