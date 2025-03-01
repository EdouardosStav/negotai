
import React from "react";
import { Button } from "@/components/ui/button";
import { Database } from "@/integrations/supabase/client";
import AnalysisHeader from "@/components/analysis/AnalysisHeader";
import BasicInfo from "@/components/analysis/BasicInfo";
import SalaryInfo from "@/components/analysis/SalaryInfo";
import AnalysisResults from "@/components/analysis/AnalysisResults";
import BenefitsPackage from "@/components/analysis/BenefitsPackage";
import NegotiationStatusBar from "./NegotiationStatusBar";
import AnalysisActions from "./AnalysisActions";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-8 border-b border-white/10">
          <AnalysisHeader 
            analysis={analysis} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
          
          <BasicInfo analysis={analysis} formatDate={formatDate} />
        </div>
        
        <div className="p-8">
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
          
          <BenefitsPackage benefitsPackage={analysis.benefits_package} />
          
          <AnalysisActions onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetailContent;
