
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { SalaryAnalysisInput, analyzeSalaryOffer } from "@/services/analysisService";

type UseAnalysisSubmitProps = {
  formData: SalaryAnalysisInput;
  setIsAnalyzing: (value: boolean) => void;
  setAnalysisResults: (results: {
    fairnessScore: number;
    suggestedCounteroffer: number;
    aiAnalysis?: any;
  } | null) => void;
  setFormSubmitted: (value: boolean) => void;
};

export const useAnalysisSubmit = ({
  formData,
  setIsAnalyzing,
  setAnalysisResults,
  setFormSubmitted
}: UseAnalysisSubmitProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please sign in to analyze your offer");
      navigate("/auth");
      return;
    }
    
    try {
      setIsAnalyzing(true);
      
      // Convert salary to a number
      const numericSalary = parseFloat(formData.salary.toString());
      if (isNaN(numericSalary)) {
        throw new Error("Please enter a valid salary amount");
      }
      
      // Call the OpenAI API through our Supabase Edge Function
      const response = await analyzeSalaryOffer({
        ...formData,
        salary: numericSalary
      }, user?.id || '');
      
      // Extract the analysis results
      const { analysis, prompt } = response;
      
      // Update state with the analysis results
      setAnalysisResults({
        fairnessScore: analysis.fairnessScore || 75,
        suggestedCounteroffer: analysis.suggestedCounteroffer || Math.round(numericSalary * 1.1),
        aiAnalysis: analysis
      });
      
      console.log("AI Analysis completed:", analysis);
      
      // Update form state
      setFormSubmitted(true);
      toast.success("Analysis completed successfully");
    } catch (error) {
      console.error("Error analyzing salary offer:", error);
      toast.error("Failed to analyze your offer. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Redirect to auth page for non-authenticated users
  const redirectToAuth = () => {
    toast.info("Please sign in to save your analysis");
    navigate("/auth");
  };
  
  return {
    handleSubmit,
    redirectToAuth
  };
};
