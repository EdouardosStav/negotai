
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { SalaryAnalysisInput, saveSalaryAnalysis } from "@/services/analysisService";
import { toast } from "sonner";

export const useAnalysisForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<SalaryAnalysisInput>({
    jobTitle: "",
    experience: "",
    location: "",
    salary: "",
    companyName: "",
    benefitsPackage: "",
    jobLevel: "",
    employmentType: "Full-Time"
  });
  
  // Static analysis results - won't update until form is submitted
  const [analysisResults, setAnalysisResults] = useState({
    fairnessScore: 80,
    suggestedCounteroffer: 0
  });
  
  // Static sample data for preview - won't update with form changes
  const sampleData = {
    jobLevel: "Senior",
    employmentType: "Full-Time"
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.jobTitle || !formData.location || !formData.salary || !formData.experience) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      setIsAnalyzing(true);
      
      // Calculate suggested counteroffer (12% increase)
      const salary = typeof formData.salary === 'string' ? parseFloat(formData.salary) : formData.salary;
      const suggestedCounteroffer = Math.round(salary * 1.12);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAnalysisResults({
        fairnessScore: 80, // Mock score
        suggestedCounteroffer
      });
      
      setFormSubmitted(true);
      
      // Auto-save for authenticated users
      if (isAuthenticated && user) {
        await handleSaveAnalysis();
      }
    } catch (error) {
      console.error("Error analyzing offer:", error);
      toast.error("Failed to analyze offer. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSampleView = () => {
    // Use static sample data that doesn't rely on form inputs
    setFormData({
      jobTitle: "Software Engineer",
      experience: "3-5",
      location: "San Francisco, CA",
      salary: "120000",
      companyName: "TechCorp Inc.",
      benefitsPackage: "Health Insurance Premium Plan, 2% Equity, 8% Performance Bonus, Hybrid Work (3 days in office), 15 PTO days",
      jobLevel: "Senior",
      employmentType: "Full-Time"
    });
    
    setAnalysisResults({
      fairnessScore: 80,
      suggestedCounteroffer: 134400 // 120000 * 1.12
    });
    
    setFormSubmitted(true);
  };

  const handleSaveAnalysis = async () => {
    if (!isAuthenticated) {
      // Store current analysis data in session storage for after login
      sessionStorage.setItem('pendingAnalysis', JSON.stringify({
        formData,
        analysisResults
      }));
      
      // Redirect to auth with return path
      navigate("/auth?redirect=analyze");
      return;
    }
    
    if (!user) {
      toast.error("User authentication error. Please try logging in again.");
      return;
    }
    
    try {
      setIsSaving(true);
      await saveSalaryAnalysis(user.id, formData, analysisResults);
      toast.success("Analysis saved successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving analysis:", error);
      toast.error("Failed to save analysis. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const redirectToAuth = () => {
    // Store current analysis data in session storage for after login
    sessionStorage.setItem('pendingAnalysis', JSON.stringify({
      formData,
      analysisResults
    }));
    
    // Redirect to auth with return path
    navigate("/auth?redirect=analyze");
  };

  // Check for pending analysis after authentication
  useEffect(() => {
    if (isAuthenticated && user) {
      const pendingAnalysis = sessionStorage.getItem('pendingAnalysis');
      if (pendingAnalysis) {
        try {
          const parsedData = JSON.parse(pendingAnalysis);
          setFormData(parsedData.formData);
          setAnalysisResults(parsedData.analysisResults);
          setFormSubmitted(true);
          sessionStorage.removeItem('pendingAnalysis');
          
          // Show toast
          toast.info("Analysis restored. You can now save it to your account.");
        } catch (error) {
          console.error("Error restoring pending analysis:", error);
        }
      }
    }
  }, [isAuthenticated, user, navigate]);

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
