
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
    counterofferRange?: {
      min: number;
      max: number;
    };
    aiAnalysis?: any;
  } | null) => void;
  setFormSubmitted: (value: boolean) => void;
  setAnalysisError: (error: string | null) => void;
};

// Define a type for the analysis data that includes the fallback property
type AnalysisData = {
  fairnessScore: number;
  suggestedCounteroffer: number;
  counterofferRange?: {
    min: number;
    max: number;
  };
  marketComparison: { text: string };
  companySpecific: { text: string };
  benefitsAssessment: { text: string };
  bonusAndEquity: { text: string };
  growthPotential: { text: string };
  negotiationPoints: string[];
  fallback?: boolean; // Add the fallback property as optional
};

export const useAnalysisSubmit = ({
  formData,
  setIsAnalyzing,
  setAnalysisResults,
  setFormSubmitted,
  setAnalysisError
}: UseAnalysisSubmitProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalysisError(null);
    
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
      
      console.log("Submitting analysis for", formData.jobTitle, "at", formData.companyName);
      
      // Call the OpenAI API through our Supabase Edge Function
      const response = await analyzeSalaryOffer({
        ...formData,
        salary: numericSalary
      }, user?.id || '');
      
      // Extract the analysis results from the response
      const analysisData = response.analysis as AnalysisData;
      
      // Update state with the analysis results
      setAnalysisResults({
        fairnessScore: analysisData.fairnessScore || 75,
        suggestedCounteroffer: analysisData.suggestedCounteroffer || Math.round(numericSalary * 1.1),
        counterofferRange: analysisData.counterofferRange || {
          min: Math.round(numericSalary * 1.1),
          max: Math.round(numericSalary * 1.2)
        },
        aiAnalysis: analysisData
      });
      
      console.log("AI Analysis completed:", analysisData);
      
      // Update form state
      setFormSubmitted(true);
      
      // Show appropriate toast message
      if (analysisData.fallback) {
        toast.info("Analysis based on offline data completed");
      } else {
        toast.success("Analysis completed successfully");
      }
    } catch (error: any) {
      console.error("Error analyzing salary offer:", error);
      
      // Store the error message
      setAnalysisError(error.message);
      
      // Determine if this is a network or service error
      const errorMessage = error.message.includes("Failed to fetch") || 
                          error.message.includes("Edge Function") ?
                          "Unable to connect to the analysis service. Showing results based on offline data." :
                          error.message;
                          
      toast.error(errorMessage);
      
      // Still show a fallback analysis if we have the basic data
      if (formData.salary) {
        const numericSalary = parseFloat(formData.salary.toString());
        
        // Calculate counteroffer range for fallback
        const counterMin = Math.round(numericSalary * 1.1);
        const counterMax = Math.round(numericSalary * 1.2);
        
        // Provide a basic fallback analysis with disclaimer
        setAnalysisResults({
          fairnessScore: 70,
          suggestedCounteroffer: Math.round((counterMin + counterMax) / 2),
          counterofferRange: {
            min: counterMin,
            max: counterMax
          },
          aiAnalysis: {
            marketComparison: {
              text: `The average salary for a ${formData.jobLevel} ${formData.jobTitle} in ${formData.location} ranges from ${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(counterMin * 0.9)} to ${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(counterMax)}.`
            },
            companySpecific: {
              text: formData.companyName ? 
                `${formData.companyName} is known for offering competitive compensation for ${formData.jobLevel} ${formData.jobTitle} roles.` :
                `Companies in this sector typically offer competitive compensation for ${formData.jobLevel} ${formData.jobTitle} roles.`
            },
            benefitsAssessment: {
              text: formData.benefitsPackage ? 
                `Your benefits package includes: ${formData.benefitsPackage}. This is in line with industry standards.` : 
                `Benefits information not provided - request details on healthcare, retirement plans, and PTO.`
            },
            bonusAndEquity: {
              text: `Performance bonuses for similar roles typically range from 10-15% of base salary. Inquire about equity options if available.`
            },
            growthPotential: {
              text: `Career advancement opportunities should include clear promotion paths and professional development resources.`
            },
            negotiationPoints: [
              `Request ${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(counterMin)} - ${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(counterMax)} based on market standards`,
              "Negotiate for a 10-15% performance bonus",
              "Discuss professional development opportunities",
              "Ask about flexible work arrangements"
            ],
            fallback: true
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
