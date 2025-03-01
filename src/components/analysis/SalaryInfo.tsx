
import React from "react";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface SalaryInfoProps {
  analysis: SalaryAnalysis;
  formatCurrency: (value: number) => string;
}

const SalaryInfo: React.FC<SalaryInfoProps> = ({ analysis, formatCurrency }) => {
  // Extract counteroffer range from AI analysis if available
  const counterofferRange = analysis.ai_analysis?.counterofferRange || {
    min: analysis.suggested_counteroffer || Math.round(analysis.offered_salary * 1.1),
    max: Math.round(analysis.offered_salary * 1.2)
  };
  
  return (
    <div className="bg-white/5 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Salary Information</h3>
      <div className="space-y-6">
        <div>
          <div className="text-white/60 text-sm mb-1">Offered Salary</div>
          <div className="text-white text-2xl font-bold">
            {formatCurrency(analysis.offered_salary)}
          </div>
        </div>
        
        {analysis.suggested_counteroffer && (
          <div>
            <div className="text-white/60 text-sm mb-1">Suggested Counteroffer Range</div>
            <div className="text-gradient text-2xl font-bold">
              {formatCurrency(counterofferRange.min)} - {formatCurrency(counterofferRange.max)}
            </div>
            <div className="text-white/60 text-xs mt-1">
              {Math.round(((counterofferRange.min + counterofferRange.max) / 2 / analysis.offered_salary - 1) * 100)}% average increase
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryInfo;
