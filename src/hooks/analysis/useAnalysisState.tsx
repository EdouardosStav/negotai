
import { useState } from "react";
import { SalaryAnalysisInput } from "@/services/types/analysisTypes";

export const useAnalysisState = () => {
  // Form state
  const [formData, setFormData] = useState<SalaryAnalysisInput>({
    jobTitle: "",
    companyName: "",
    jobLevel: "",
    employmentType: "Full-Time",
    experience: "",
    location: "",
    salary: "",
    benefitsPackage: ""
  });
  
  // Analysis state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<{
    fairnessScore: number;
    suggestedCounteroffer: number;
    aiAnalysis?: any;
  } | null>(null);
  
  // Sample data for the preview panel
  const sampleData = {
    jobTitle: "Senior Software Engineer",
    companyName: "TechCorp Inc.",
    jobLevel: "Senior",
    employmentType: "Full-Time",
    experience: "6-10",
    location: "San Francisco, CA",
    salary: "150000",
    benefitsPackage: "Health Insurance Premium Plan, 2% Equity, 8% Performance Bonus, Hybrid Work (3 days in office), 15 PTO days"
  };
  
  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    setFormData,
    formSubmitted,
    setFormSubmitted,
    isAnalyzing,
    setIsAnalyzing,
    isSaving,
    setIsSaving,
    analysisResults,
    setAnalysisResults,
    sampleData,
    handleChange
  };
};
