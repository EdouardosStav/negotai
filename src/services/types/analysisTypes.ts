
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

export interface AIAnalysis {
  companySpecific: {
    text: string;
    percentage: string;
  };
  marketComparison: {
    text: string;
    percentage: string;
  };
  benefitsAssessment: {
    text: string;
    rating: string;
  };
  bonusAndEquity: {
    text: string;
  };
  growthPotential: {
    text: string;
  };
  fairnessScore: number;
  suggestedCounteroffer: number;
  negotiationPoints: string[];
}
