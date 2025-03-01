
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface AnalysisResultsProps {
  analysis: SalaryAnalysis;
  isUpdatingStatus: boolean;
  onStatusChange: (status: string) => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  analysis, 
  isUpdatingStatus, 
  onStatusChange 
}) => {
  return (
    <div className="bg-white/5 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Analysis Results</h3>
      
      {analysis.fairness_score !== null && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-white/70">Fairness Score</span>
            <span className={`font-medium ${
              analysis.fairness_score >= 70 ? 'text-success' :
              analysis.fairness_score >= 40 ? 'text-amber-400' :
              'text-destructive'
            }`}>
              {analysis.fairness_score}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                analysis.fairness_score >= 70 ? 'bg-gradient-to-r from-success/80 to-success' :
                analysis.fairness_score >= 40 ? 'bg-gradient-to-r from-amber-500/80 to-amber-500' :
                'bg-gradient-to-r from-destructive/80 to-destructive'
              }`}
              style={{ width: `${analysis.fairness_score}%` }}
            ></div>
          </div>
          <div className="text-white/60 text-xs mt-2">
            {analysis.fairness_score >= 70 
              ? "Your offer is above market value. Strong position for acceptance." 
              : analysis.fairness_score >= 40 
                ? "Your offer is near market value. Consider negotiating key points."
                : "Your offer is below market value. Strong position for negotiation."}
          </div>
        </div>
      )}
      
      <div>
        <div className="text-white/60 text-sm mb-2">Negotiation Status:</div>
        <Select 
          value={analysis.negotiation_status} 
          onValueChange={onStatusChange}
          disabled={isUpdatingStatus}
        >
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Update status" />
          </SelectTrigger>
          <SelectContent className="bg-navy-dark border-white/10">
            <SelectItem value="Awaiting Response">Awaiting Response</SelectItem>
            <SelectItem value="Counteroffer Sent">Counteroffer Sent</SelectItem>
            <SelectItem value="Offer Accepted">Offer Accepted</SelectItem>
            <SelectItem value="Negotiation Failed">Negotiation Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AnalysisResults;
