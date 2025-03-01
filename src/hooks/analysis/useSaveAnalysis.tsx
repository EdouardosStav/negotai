
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { saveSalaryAnalysis } from "@/services/analysisService";
import { SalaryAnalysisInput } from "@/services/types/analysisTypes";
import { supabase } from "@/integrations/supabase/client";

type UseSaveAnalysisProps = {
  formData: SalaryAnalysisInput;
  analysisResults: {
    fairnessScore: number;
    suggestedCounteroffer: number;
    aiAnalysis?: any;
  } | null;
  setIsSaving: (value: boolean) => void;
};

export const useSaveAnalysis = ({
  formData,
  analysisResults,
  setIsSaving
}: UseSaveAnalysisProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  // Save analysis to user's dashboard
  const handleSaveAnalysis = async () => {
    if (!isAuthenticated || !user) {
      toast.error("Please sign in to save your analysis");
      return;
    }
    
    if (!analysisResults) {
      toast.error("No analysis results to save");
      return;
    }
    
    try {
      setIsSaving(true);
      
      // Save the analysis to the database
      const savedAnalysis = await saveSalaryAnalysis(
        user.id,
        {
          ...formData,
          salary: parseFloat(formData.salary.toString())
        },
        {
          fairnessScore: analysisResults.fairnessScore,
          suggestedCounteroffer: analysisResults.suggestedCounteroffer
        }
      );
      
      // Update the analysis with AI results
      if (savedAnalysis && analysisResults.aiAnalysis) {
        await supabase
          .from('salary_analyses')
          .update({
            ai_analysis: analysisResults.aiAnalysis,
            analysis_prompt: formData.jobTitle + " " + formData.location
          })
          .eq('id', savedAnalysis.id);
      }
      
      toast.success("Analysis saved to your dashboard");
      
      // Wait a moment before redirecting
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error saving analysis:", error);
      toast.error("Failed to save analysis. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  
  return {
    handleSaveAnalysis
  };
};
