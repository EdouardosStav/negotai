
import { SalaryAnalysisInput } from "@/services/types/analysisTypes";

type UseAnalysisStateReturn = {
  setFormData: (data: SalaryAnalysisInput | ((prev: SalaryAnalysisInput) => SalaryAnalysisInput)) => void;
  setAnalysisResults: (results: {
    fairnessScore: number;
    suggestedCounteroffer: number;
    aiAnalysis?: any;
  } | null) => void;
  setFormSubmitted: (submitted: boolean) => void;
  sampleData: SalaryAnalysisInput;
};

export const useSampleAnalysis = ({
  setFormData,
  setAnalysisResults,
  setFormSubmitted,
  sampleData
}: UseAnalysisStateReturn) => {
  
  // Load sample data for the preview
  const handleSampleView = () => {
    setFormData(sampleData);
    
    // Set some example analysis results for the preview
    setAnalysisResults({
      fairnessScore: 80,
      suggestedCounteroffer: 168000,
      aiAnalysis: {
        companySpecific: {
          text: "Your offer is 75% above average for Senior Software Engineer roles at TechCorp Inc.",
          percentage: "75% above average"
        },
        marketComparison: {
          text: "Your offer is 70% above industry average for Senior Software Engineer roles in San Francisco, CA",
          percentage: "70% above average"
        },
        benefitsAssessment: {
          text: "Your benefits package is At Industry Standard. Your equity offer (2%) is competitive, but your PTO (15 days) is below the average of 20 days for your level.",
          rating: "At Industry Standard"
        },
        bonusAndEquity: {
          text: "Your 8% performance bonus is slightly below the 10% industry average for Senior roles."
        },
        growthPotential: {
          text: "Salary growth trajectory aligns with industry standards for Full-Time positions"
        },
        negotiationPoints: [
          "Request 20 PTO days (industry standard is 20-25 days)",
          "Negotiate for 10% performance bonus (currently 8%)",
          "Ask about professional development budget",
          "Inquire about remote work flexibility"
        ]
      }
    });
    
    setFormSubmitted(true);
  };

  return {
    handleSampleView
  };
};
