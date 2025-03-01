
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
      
      // Form validation
      if (!formData.jobTitle.trim()) {
        throw new Error("Job title is required");
      }
      
      if (!formData.location.trim()) {
        throw new Error("Location is required");
      }
      
      if (!formData.experience) {
        throw new Error("Years of experience is required");
      }
      
      // Convert salary to a number
      const numericSalary = parseFloat(formData.salary.toString());
      if (isNaN(numericSalary) || numericSalary <= 0) {
        throw new Error("Please enter a valid salary amount");
      }
      
      // Call the OpenAI API through our Supabase Edge Function
      const response = await analyzeSalaryOffer({
        ...formData,
        salary: numericSalary
      }, user?.id || '');
      
      // If we didn't get a proper response, handle gracefully
      if (!response || !response.analysis) {
        console.log("Invalid response from salary analysis:", response);
        throw new Error("Unable to analyze your offer. The service may be temporarily unavailable.");
      }
      
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
    } catch (error: any) {
      console.error("Error analyzing salary offer:", error);
      
      // Determine if this is a network or service error
      const errorMessage = error.message.includes("Failed to fetch") || 
                          error.message.includes("Edge Function") ?
                          "Network error: Unable to connect to the analysis service. Please check your connection and try again." :
                          error.message;
                          
      toast.error(errorMessage);
      
      // Still show a fallback analysis if we have the basic data
      if (formData.salary) {
        const numericSalary = parseFloat(formData.salary.toString());
        
        // Provide a basic fallback analysis with disclaimer
        setAnalysisResults({
          fairnessScore: 70,
          suggestedCounteroffer: Math.round(numericSalary * 1.12),
          aiAnalysis: {
            disclaimer: "This is a fallback analysis due to service connectivity issues.",
            marketComparison: {
              text: `Based on limited offline data, your offer appears to be within market range.`
            },
            negotiationPoints: [
              "Consider negotiating for better benefits",
              "Request a performance-based bonus structure",
              "Discuss professional development opportunities"
            ]
          }
        });
        
        setFormSubmitted(true);
        toast.warning("Showing simplified analysis due to service connectivity issues");
      }
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
