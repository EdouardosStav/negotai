
import { useAnalysisState } from "./analysis/useAnalysisState";
import { useSampleAnalysis } from "./analysis/useSampleAnalysis";
import { useAnalysisSubmit } from "./analysis/useAnalysisSubmit";
import { useSaveAnalysis } from "./analysis/useSaveAnalysis";

export const useAnalysisForm = () => {
  // Get form state and handlers
  const {
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
    analysisError,
    setAnalysisError,
    sampleData,
    handleChange
  } = useAnalysisState();
  
  // Get sample data handlers
  const { handleSampleView } = useSampleAnalysis({
    setFormData,
    setAnalysisResults,
    setFormSubmitted,
    sampleData
  });
  
  // Get form submission handlers
  const { handleSubmit, redirectToAuth } = useAnalysisSubmit({
    formData,
    setIsAnalyzing,
    setAnalysisResults,
    setFormSubmitted,
    setAnalysisError
  });
  
  // Get save analysis handlers
  const { handleSaveAnalysis } = useSaveAnalysis({
    formData,
    analysisResults,
    setIsSaving
  });
  
  return {
    formData,
    formSubmitted,
    isAnalyzing,
    isSaving,
    analysisResults,
    analysisError,
    sampleData,
    handleChange,
    handleSubmit,
    handleSampleView,
    handleSaveAnalysis,
    redirectToAuth
  };
};
