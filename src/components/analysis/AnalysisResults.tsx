
import React from "react";
import { Building, CheckCircle, Gift, Award, Clock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface AnalysisResultsProps {
  formData: {
    jobTitle: string;
    companyName: string;
    jobLevel: string;
    employmentType: string;
    experience: string;
    location: string;
    salary: string;
    benefitsPackage: string;
  };
  analysisResults: {
    fairnessScore: number;
    suggestedCounteroffer: number;
  };
  handleSaveAnalysis: () => void;
  redirectToAuth: () => void;
  isSaving: boolean;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  formData,
  analysisResults,
  handleSaveAnalysis,
  redirectToAuth,
  isSaving
}) => {
  const { isAuthenticated } = useAuth();

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
          <span className="text-amber-400 font-medium">{analysisResults.fairnessScore}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-amber-500 to-green-500 h-2 rounded-full" 
            style={{ width: `${analysisResults.fairnessScore}%` }}
          ></div>
        </div>
        <p className="text-white/70 text-xs mt-2">
          Your offer is well above market value considering your job level and benefits package.
        </p>
      </div>
      
      <div className="space-y-4 mb-6">
        {formData.companyName && (
          <div className="flex items-start gap-3">
            <Building className="text-cyan mt-1 flex-shrink-0" size={18} />
            <p className="text-white/80 text-sm">
              <span className="font-medium text-white block mb-1">Company Specific</span>
              Your offer is 75% above average for {formData.jobLevel || "Senior"} {formData.jobTitle} roles at {formData.companyName}
            </p>
          </div>
        )}
        
        <div className="flex items-start gap-3">
          <CheckCircle className="text-success mt-1 flex-shrink-0" size={18} />
          <p className="text-white/80 text-sm">
            <span className="font-medium text-white block mb-1">Competitive Base Salary</span>
            Your offer is 70% above industry average for {formData.jobLevel || "Senior"} {formData.jobTitle} roles in {formData.location}
          </p>
        </div>
        
        {formData.benefitsPackage && (
          <div className="flex items-start gap-3">
            <Gift className="text-amber-400 mt-1 flex-shrink-0" size={18} />
            <p className="text-white/80 text-sm">
              <span className="font-medium text-white block mb-1">Benefits Assessment</span>
              Your benefits package is <span className="text-amber-400 font-medium">At Industry Standard</span>. Your equity offer (2%) is competitive, but your PTO (15 days) is below the average of 20 days for your level.
            </p>
          </div>
        )}
        
        <div className="flex items-start gap-3">
          <Award className="text-amber-400 mt-1 flex-shrink-0" size={18} />
          <p className="text-white/80 text-sm">
            <span className="font-medium text-white block mb-1">Bonus & Stock Potential</span>
            Your 8% performance bonus is slightly below the 10% industry average for {formData.jobLevel || "Senior"} roles.
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <Clock className="text-success mt-1 flex-shrink-0" size={18} />
          <p className="text-white/80 text-sm">
            <span className="font-medium text-white block mb-1">Growth Potential</span>
            Salary growth trajectory aligns with industry standards for {formData.employmentType} positions
          </p>
        </div>
      </div>
      
      <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
        <p className="text-white/90 text-sm mb-2">
          <span className="font-medium text-white">Suggested Counter-Offer:</span>
        </p>
        <p className="text-2xl font-bold text-gradient">
          ${analysisResults.suggestedCounteroffer.toLocaleString()}
        </p>
        <p className="text-white/70 text-xs mt-1">
          12% increase with strong justification based on market data
        </p>
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-sm text-white mb-2">Additional negotiation points:</p>
          <ul className="text-xs text-white/70 space-y-1">
            <li>• Request 20 PTO days (industry standard is 20-25 days)</li>
            <li>• Negotiate for 10% performance bonus (currently 8%)</li>
            <li>• Ask about professional development budget</li>
          </ul>
        </div>
      </div>
      
      {isAuthenticated ? (
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
      ) : (
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
