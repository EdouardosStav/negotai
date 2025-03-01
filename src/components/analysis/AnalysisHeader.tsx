
import React from "react";
import { Building, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusIndicator from "./StatusIndicator";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface AnalysisHeaderProps {
  analysis: SalaryAnalysis;
  onEdit: () => void;
  onDelete: () => void;
}

const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({ 
  analysis, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">{analysis.job_title}</h1>
        {analysis.company_name && (
          <div className="flex items-center text-white/70 mb-2">
            <Building size={14} className="mr-1" />
            {analysis.company_name}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-3 mt-4 md:mt-0">
        <StatusIndicator status={analysis.negotiation_status} />
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onEdit}
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
          >
            <Pencil size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onDelete}
            className="h-8 w-8 text-white/70 hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisHeader;
