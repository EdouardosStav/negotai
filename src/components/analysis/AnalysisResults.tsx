
import React from "react";
import { Building, CheckCircle, Gift, Award, Clock, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { SalaryAnalysisInput } from "@/services/types/analysisTypes";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface AnalysisResultsProps {
  // We'll support both formData and analysis for different contexts
  formData?: SalaryAnalysisInput;
  analysis?: SalaryAnalysis;
  analysisResults?: {
    fairnessScore: number;
    suggestedCounteroffer: number;
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
  const suggestedCounteroffer = analysisResults?.suggestedCounteroffer || 
    (analysis ? Math.round(analysis.offered_salary * 1.12) : 0);
  
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
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-white/80">Fairness Score</span>
          <span className="text-amber-400 font-medium">{fairnessScore}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-amber-500 to-green-500 h-2 rounded-full" 
            style={{ width: `${fairnessScore}%` }}
          ></div>
        </div>
        <p className="text-white/70 text-xs mt-2">
          {aiAnalysis?.marketComparison?.text || 
           "Your offer is well above market value considering your job level and benefits package."}
        </p>
      </div>
      
      <div className="space-y-4 mb-6">
        {companyName && (
          <div className="flex items-start gap-3">
            <Building className="text-cyan mt-1 flex-shrink-0" size={18} />
            <p className="text-white/80 text-sm">
              <span className="font-medium text-white block mb-1">Company Specific</span>
              {aiAnalysis?.companySpecific?.text || 
               `Your offer is 75% above average for ${jobLevel} ${jobTitle} roles at ${companyName}`}
            </p>
          </div>
        )}
        
        <div className="flex items-start gap-3">
          <CheckCircle className="text-success mt-1 flex-shrink-0" size={18} />
          <p className="text-white/80 text-sm">
            <span className="font-medium text-white block mb-1">Competitive Base Salary</span>
            {aiAnalysis?.marketComparison?.text || 
             `Your offer is 70% above industry average for ${jobLevel} ${jobTitle} roles in ${location}`}
          </p>
        </div>
        
        {(benefitsPackage || aiAnalysis?.benefitsAssessment) && (
          <div className="flex items-start gap-3">
            <Gift className="text-amber-400 mt-1 flex-shrink-0" size={18} />
            <p className="text-white/80 text-sm">
              <span className="font-medium text-white block mb-1">Benefits Assessment</span>
              {aiAnalysis?.benefitsAssessment?.text || 
               `Your benefits package is <span className="text-amber-400 font-medium">At Industry Standard</span>. Your equity offer (2%) is competitive, but your PTO (15 days) is below the average of 20 days for your level.`}
            </p>
          </div>
        )}
        
        <div className="flex items-start gap-3">
          <Award className="text-amber-400 mt-1 flex-shrink-0" size={18} />
          <p className="text-white/80 text-sm">
            <span className="font-medium text-white block mb-1">Bonus & Stock Potential</span>
            {aiAnalysis?.bonusAndEquity?.text || 
             `Your 8% performance bonus is slightly below the 10% industry average for ${jobLevel} roles.`}
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <Clock className="text-success mt-1 flex-shrink-0" size={18} />
          <p className="text-white/80 text-sm">
            <span className="font-medium text-white block mb-1">Growth Potential</span>
            {aiAnalysis?.growthPotential?.text || 
             `Salary growth trajectory aligns with industry standards for ${employmentType} positions`}
          </p>
        </div>
      </div>
      
      <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
        <p className="text-white/90 text-sm mb-2">
          <span className="font-medium text-white">Suggested Counter-Offer:</span>
        </p>
        <p className="text-2xl font-bold text-gradient">
          ${suggestedCounteroffer.toLocaleString()}
        </p>
        <p className="text-white/70 text-xs mt-1">
          {fairnessScore < 70 ? "Increase recommended with strong justification based on market data" : 
          "This is a competitive offer, but some increase may be possible"}
        </p>
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-sm text-white mb-2">Additional negotiation points:</p>
          <ul className="text-xs text-white/70 space-y-1">
            {aiAnalysis?.negotiationPoints ? (
              aiAnalysis.negotiationPoints.map((point: string, index: number) => (
                <li key={index}>• {point}</li>
              ))
            ) : (
              <>
                <li>• Request 20 PTO days (industry standard is 20-25 days)</li>
                <li>• Negotiate for 10% performance bonus (currently 8%)</li>
                <li>• Ask about professional development budget</li>
              </>
            )}
          </ul>
        </div>
      </div>
      
      {analysis && onStatusChange ? (
        // Rendering for AnalysisDetail page (with status update controls)
        <div className="mt-6">
          {/* Status update controls would go here */}
        </div>
      ) : isAuthenticated && handleSaveAnalysis ? (
        // Rendering for saving analysis
        <button
          onClick={handleSaveAnalysis}
          className="w-full mt-6 py-2.5 px-4 rounded-lg bg-gradient-to-r from-primary/80 to-primary text-white hover:from-primary hover:to-primary/80 transition-all duration-300 text-sm"
          disabled={isSaving}
        >
          {isSaving ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </div>
          ) : (
            "Save Analysis to Dashboard"
          )}
        </button>
      ) : redirectToAuth && (
        // Rendering for unauthenticated users
        <button
          onClick={redirectToAuth}
          className="w-full mt-6 py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 text-sm"
        >
          Sign in for Full Analysis & Report
        </button>
      )}
    </div>
  );
};

export default AnalysisResults;
