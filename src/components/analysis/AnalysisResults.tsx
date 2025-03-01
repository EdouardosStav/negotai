
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { SalaryAnalysisInput } from "@/services/types/analysisTypes";
import { Database } from "@/integrations/supabase/client";
import { formatCurrency, calculateCounterOfferRange } from "@/utils/analysisUtils";
import FairnessScore from "./FairnessScore";
import AnalysisPoints from "./AnalysisPoints";
import CounterOfferSection from "./CounterOfferSection";
import AnalysisResultButtons from "./AnalysisResultButtons";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface AnalysisResultsProps {
  // We'll support both formData and analysis for different contexts
  formData?: SalaryAnalysisInput;
  analysis?: SalaryAnalysis;
  analysisResults?: {
    fairnessScore: number;
    suggestedCounteroffer: number;
    counterofferRange?: {
      min: number;
      max: number;
    };
    aiAnalysis?: any;
  };
  handleSaveAnalysis?: () => void;
  redirectToAuth?: () => void;
  isSaving?: boolean;
  isUpdatingStatus?: boolean;
  onStatusChange?: (newStatus: string) => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  formData,
  analysis,
  analysisResults,
  handleSaveAnalysis,
  redirectToAuth,
  isSaving,
  isUpdatingStatus,
  onStatusChange
}) => {
  const { isAuthenticated } = useAuth();
  
  // Handle both formData and analysis prop patterns
  const jobTitle = formData?.jobTitle || analysis?.job_title || '';
  const companyName = formData?.companyName || analysis?.company_name || '';
  const jobLevel = formData?.jobLevel || analysis?.job_level || 'Senior';
  const employmentType = formData?.employmentType || analysis?.employment_type || 'Full-Time';
  const location = formData?.location || analysis?.location || '';
  const benefitsPackage = formData?.benefitsPackage || analysis?.benefits_package || '';
  
  // Determine scores based on which props are passed
  const fairnessScore = analysisResults?.fairnessScore || analysis?.fairness_score || 80;
  
  // Get offered salary
  const offeredSalary = formData?.salary ? 
    (typeof formData.salary === 'string' ? Number(formData.salary) : formData.salary) : 
    (analysis?.offered_salary || 100000);

  // Get counter-offer range or calculate one if not provided
  const counterofferRange = analysisResults?.counterofferRange || 
    (analysis?.ai_analysis?.counterofferRange) || 
    calculateCounterOfferRange(jobLevel, fairnessScore, offeredSalary);
  
  // Get AI analysis data
  const aiAnalysis = analysisResults?.aiAnalysis || analysis?.ai_analysis || null;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Offer Analysis</h3>
        <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white/80">
          {isAuthenticated ? "Full Analysis" : "Sample Preview"}
        </div>
      </div>
      
      <FairnessScore 
        fairnessScore={fairnessScore}
        jobLevel={jobLevel}
        jobTitle={jobTitle}
        location={location}
        aiAnalysis={aiAnalysis}
      />
      
      <AnalysisPoints
        companyName={companyName}
        fairnessScore={fairnessScore}
        jobLevel={jobLevel}
        jobTitle={jobTitle}
        location={location}
        benefitsPackage={benefitsPackage}
        counterofferMin={counterofferRange.min}
        counterofferMax={counterofferRange.max}
        aiAnalysis={aiAnalysis}
        formatCurrency={formatCurrency}
      />
      
      <CounterOfferSection
        counterofferMin={counterofferRange.min}
        counterofferMax={counterofferRange.max}
        offeredSalary={offeredSalary}
        jobLevel={jobLevel}
        jobTitle={jobTitle}
        location={location}
        fairnessScore={fairnessScore}
        aiAnalysis={aiAnalysis}
        formatCurrency={formatCurrency}
      />
      
      <AnalysisResultButtons
        isAuthenticated={isAuthenticated}
        handleSaveAnalysis={handleSaveAnalysis}
        redirectToAuth={redirectToAuth}
        isSaving={isSaving}
        isUpdatingStatus={isUpdatingStatus}
        onStatusChange={onStatusChange}
        analysis={analysis}
      />
    </div>
  );
};

export default AnalysisResults;
