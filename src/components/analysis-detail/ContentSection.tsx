
import React from "react";
import BenefitsPackage from "@/components/analysis/BenefitsPackage";
import AnalysisActions from "./AnalysisActions";
import SalaryInfoSection from "./SalaryInfoSection";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface ContentSectionProps {
  analysis: SalaryAnalysis;
  formatCurrency: (value: number) => string;
  isUpdatingStatus: boolean;
  onStatusChange: (newStatus: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  analysis,
  formatCurrency,
  isUpdatingStatus,
  onStatusChange,
  onEdit,
  onDelete
}) => {
  return (
    <div className="p-8">
      <SalaryInfoSection
        analysis={analysis}
        formatCurrency={formatCurrency}
        isUpdatingStatus={isUpdatingStatus}
        onStatusChange={onStatusChange}
      />
      
      <BenefitsPackage benefitsPackage={analysis.benefits_package} />
      
      <AnalysisActions onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default ContentSection;
