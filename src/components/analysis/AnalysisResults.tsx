
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
  
  // Get counter-offer range or calculate one if not provided
  const counterofferRange = analysisResults?.counterofferRange || 
    (analysis?.ai_analysis?.counterofferRange) || 
    calculateCounterOfferRange();
  
  // Single counteroffer value (for backward compatibility)
  const suggestedCounteroffer = analysisResults?.suggestedCounteroffer || 
    analysis?.suggested_counteroffer ||
    (counterofferRange ? Math.round((counterofferRange.min + counterofferRange.max) / 2) : 0);
  
  // Get AI analysis data
  const aiAnalysis = analysisResults?.aiAnalysis || analysis?.ai_analysis || null;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate a counteroffer range based on job level and offered salary
  function calculateCounterOfferRange() {
    // Convert salary to number if it's a string
    const offeredSalary = formData?.salary ? 
      (typeof formData.salary === 'string' ? Number(formData.salary) : formData.salary) : 
      (analysis?.offered_salary || 100000);
    
    // Default ranges for different levels
    let minIncrease = 1.10; // 10% minimum increase
    let maxIncrease = 1.20; // 20% maximum increase
    
    // Adjust based on fairness score
    if (fairnessScore < 60) {
      // Very unfair offers get bigger suggested increases
      minIncrease = 1.25; // 25% minimum 
      maxIncrease = 1.40; // 40% maximum
    } else if (fairnessScore < 75) {
      // Somewhat unfair offers
      minIncrease = 1.15; // 15% minimum
      maxIncrease = 1.30; // 30% maximum
    } else if (fairnessScore >= 90) {
      // Very fair offers
      minIncrease = 1.03; // 3% minimum
      maxIncrease = 1.08; // 8% maximum
    }
    
    // Ensure the counter offer is meaningful (at least 10-15% higher for low salaries)
    const min = Math.round(offeredSalary * minIncrease);
    const max = Math.round(offeredSalary * maxIncrease);
    
    return { min, max };
  }

  // Get justification text for counteroffer
  const getCounterOfferJustification = () => {
    // Convert salary to number if it's a string
    const offeredSalary = formData?.salary ? 
      (typeof formData.salary === 'string' ? Number(formData.salary) : formData.salary) : 
      (analysis?.offered_salary || 100000);
    
    if (aiAnalysis?.counterofferJustification?.text) {
      return aiAnalysis.counterofferJustification.text;
    }
    
    if (fairnessScore < 70) {
      return `${formatPercentIncrease()}% increase to align with market rates for ${jobLevel} ${jobTitle} roles in ${location}`;
    } else if (fairnessScore < 85) {
      return `This increase would bring your compensation in line with industry standards for your experience level`;
    } else {
      return `Your offer is competitive, but a small increase may still be negotiable`;
    }
  };

  // Calculate percentage increase from offered to suggested (middle of range)
  const formatPercentIncrease = () => {
    // Convert salary to number if it's a string
    const offeredSalary = formData?.salary ? 
      (typeof formData.salary === 'string' ? Number(formData.salary) : formData.salary) : 
      (analysis?.offered_salary || 100000);
    
    // Use middle of range for percentage calculation
    const midRange = (counterofferRange.min + counterofferRange.max) / 2;
    return Math.round((midRange / offeredSalary - 1) * 100);
  };

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
            className={`h-2 rounded-full ${fairnessScore < 60 
              ? 'bg-red-500' 
              : fairnessScore < 80 
                ? 'bg-amber-500'
                : 'bg-green-500'}`}
            style={{ width: `${fairnessScore}%` }}
          ></div>
        </div>
        <p className="text-white/70 text-sm mt-2">
          {aiAnalysis?.marketComparison?.text || 
           `Your offer is ${fairnessScore < 80 ? 'below' : 'above'} market value for ${jobLevel} ${jobTitle} roles in ${location}.`}
        </p>
      </div>
      
      <div className="space-y-4 mb-6">
        {companyName && (
          <div className="flex items-start gap-3">
            <Building className="text-cyan mt-1 flex-shrink-0" size={18} />
            <div className="text-white/80 text-sm">
              <span className="font-medium text-white block mb-1">Company Specific</span>
              <p>{aiAnalysis?.companySpecific?.text || 
                 `${companyName} is known for offering competitive compensation for ${jobLevel} ${jobTitle} roles.`}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-3">
          <CheckCircle className={`${fairnessScore >= 80 ? 'text-success' : 'text-amber-400'} mt-1 flex-shrink-0`} size={18} />
          <div className="text-white/80 text-sm">
            <span className="font-medium text-white block mb-1">Competitive Base Salary</span>
            <p>{aiAnalysis?.marketComparison?.text || 
               `The average salary for this role in ${location} ranges between ${formatCurrency(counterofferRange.min * 0.9)}-${formatCurrency(counterofferRange.max)}.`}</p>
          </div>
        </div>
        
        {(benefitsPackage || aiAnalysis?.benefitsAssessment) && (
          <div className="flex items-start gap-3">
            <Gift className="text-amber-400 mt-1 flex-shrink-0" size={18} />
            <div className="text-white/80 text-sm">
              <span className="font-medium text-white block mb-1">Benefits Assessment</span>
              <p>{aiAnalysis?.benefitsAssessment?.text || 
                 `Based on the provided benefits information, your package is ${fairnessScore >= 80 ? 'competitive' : 'below industry standards'}.`}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-3">
          <Award className="text-amber-400 mt-1 flex-shrink-0" size={18} />
          <div className="text-white/80 text-sm">
            <span className="font-medium text-white block mb-1">Bonus & Stock Potential</span>
            <p>{aiAnalysis?.bonusAndEquity?.text || 
               `Performance bonuses for similar roles typically range from 8-10% of base salary. Inquire about equity options if available.`}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Clock className="text-success mt-1 flex-shrink-0" size={18} />
          <div className="text-white/80 text-sm">
            <span className="font-medium text-white block mb-1">Growth Potential</span>
            <p>{aiAnalysis?.growthPotential?.text || 
               `Career growth for ${jobLevel} ${jobTitle} roles typically includes advancement opportunities within 1-2 years.`}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
        <p className="text-white/90 text-sm mb-2">
          <span className="font-medium text-white">Suggested Counter-Offer Range:</span>
        </p>
        <p className="text-2xl font-bold text-gradient">
          {formatCurrency(counterofferRange.min)} - {formatCurrency(counterofferRange.max)}
        </p>
        <p className="text-white/70 text-xs mt-1">
          {getCounterOfferJustification()}
        </p>
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-sm text-white mb-2">Negotiation strategy:</p>
          <ul className="text-xs text-white/70 space-y-1">
            {aiAnalysis?.negotiationPoints ? (
              aiAnalysis.negotiationPoints.map((point: string, index: number) => (
                <li key={index} className="flex items-start gap-1.5">
                  <span className="text-success">✓</span> 
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start gap-1.5">
                  <span className="text-success">✓</span> 
                  <span>Request {formatCurrency(counterofferRange.min)} - {formatCurrency(counterofferRange.max)} based on market rates</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-success">✓</span> 
                  <span>Negotiate for 10-15% performance bonus (industry standard)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-success">✓</span> 
                  <span>Ask about professional development budget and learning opportunities</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-success">✓</span> 
                  <span>Discuss flexible work arrangements (remote/hybrid options)</span>
                </li>
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
