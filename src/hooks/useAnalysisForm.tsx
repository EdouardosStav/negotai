
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { SalaryAnalysisInput, analyzeSalaryOffer, saveSalaryAnalysis } from "@/services/analysisService";

export const useAnalysisForm = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
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
  
  // Redirect to auth page for non-authenticated users
  const redirectToAuth = () => {
    toast.info("Please sign in to save your analysis");
    navigate("/auth");
  };
  
  return {
    formData,
    formSubmitted,
    isAnalyzing,
    isSaving,
    analysisResults,
    sampleData,
    handleChange,
    handleSubmit,
    handleSampleView,
    handleSaveAnalysis,
    redirectToAuth
  };
};
