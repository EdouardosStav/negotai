
import React from "react";
import { Database } from "@/integrations/supabase/client";
import HeaderInfoSection from "./HeaderInfoSection";
import ContentSection from "./ContentSection";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface AnalysisDetailContentProps {
  analysis: SalaryAnalysis;
  formatCurrency: (value: number) => string;
  formatDate: (dateString: string) => string;
  isUpdatingStatus: boolean;
  onStatusChange: (newStatus: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const AnalysisDetailContent: React.FC<AnalysisDetailContentProps> = ({
  analysis,
  formatCurrency,
  formatDate,
  isUpdatingStatus,
  onStatusChange,
  onEdit,
  onDelete
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card rounded-xl overflow-hidden">
        <HeaderInfoSection 
          analysis={analysis} 
          formatDate={formatDate}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        
        <ContentSection
          analysis={analysis}
          formatCurrency={formatCurrency}
          isUpdatingStatus={isUpdatingStatus}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default AnalysisDetailContent;
