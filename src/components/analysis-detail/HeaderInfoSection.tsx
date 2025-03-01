
import React from "react";
import AnalysisHeader from "@/components/analysis/AnalysisHeader";
import BasicInfo from "@/components/analysis/BasicInfo";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface HeaderInfoSectionProps {
  analysis: SalaryAnalysis;
  formatDate: (dateString: string) => string;
  onEdit: () => void;
  onDelete: () => void;
}

const HeaderInfoSection: React.FC<HeaderInfoSectionProps> = ({
  analysis,
  formatDate,
  onEdit,
  onDelete
}) => {
  return (
    <div className="p-8 border-b border-white/10">
      <AnalysisHeader 
        analysis={analysis} 
        onEdit={onEdit} 
        onDelete={onDelete} 
      />
      
      <BasicInfo analysis={analysis} formatDate={formatDate} />
    </div>
  );
};

export default HeaderInfoSection;
