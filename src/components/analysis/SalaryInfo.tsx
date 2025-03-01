
import React from "react";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface SalaryInfoProps {
  analysis: SalaryAnalysis;
  formatCurrency: (value: number) => string;
}

const SalaryInfo: React.FC<SalaryInfoProps> = ({ analysis, formatCurrency }) => {
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
            <div className="text-white/60 text-sm mb-1">Suggested Counteroffer</div>
            <div className="text-gradient text-2xl font-bold">
              {formatCurrency(analysis.suggested_counteroffer)}
            </div>
            <div className="text-white/60 text-xs mt-1">
              {Math.round((analysis.suggested_counteroffer / analysis.offered_salary - 1) * 100)}% increase
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryInfo;
