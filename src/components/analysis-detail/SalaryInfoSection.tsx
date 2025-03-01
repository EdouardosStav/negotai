
import React from "react";
import SalaryInfo from "@/components/analysis/SalaryInfo";
import AnalysisResults from "@/components/analysis/AnalysisResults";
import NegotiationStatusBar from "./NegotiationStatusBar";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface SalaryInfoSectionProps {
  analysis: SalaryAnalysis;
  formatCurrency: (value: number) => string;
  isUpdatingStatus: boolean;
  onStatusChange: (newStatus: string) => void;
}

const SalaryInfoSection: React.FC<SalaryInfoSectionProps> = ({
  analysis,
  formatCurrency,
  isUpdatingStatus,
  onStatusChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <SalaryInfo analysis={analysis} formatCurrency={formatCurrency} />
      
      <div>
        <AnalysisResults 
          analysis={analysis} 
          isUpdatingStatus={isUpdatingStatus} 
          onStatusChange={onStatusChange} 
        />
        
        <NegotiationStatusBar
          status={analysis.negotiation_status}
          isUpdatingStatus={isUpdatingStatus}
          onStatusChange={onStatusChange}
        />
      </div>
    </div>
  );
};

export default SalaryInfoSection;
