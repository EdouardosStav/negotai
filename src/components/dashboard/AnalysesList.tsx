
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BarChart4, Loader2, PlusCircle } from "lucide-react";
import AnalysisCard from "./AnalysisCard";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface AnalysesListProps {
  analyses: SalaryAnalysis[];
  isLoading: boolean;
  onStatusUpdate: (analysisId: string, status: string) => void;
  onEdit: (analysis: SalaryAnalysis) => void;
  onDelete: (analysis: SalaryAnalysis) => void;
  onCreateNew: () => void;
  isUpdatingStatus: boolean;
  selectedAnalysisId: string | null;
}

const AnalysesList = ({
  analyses,
  isLoading,
  onStatusUpdate,
  onEdit,
  onDelete,
  onCreateNew,
  isUpdatingStatus,
  selectedAnalysisId
}: AnalysesListProps) => {
  return (
    <>
      <div className="mb-6">
        <Button 
          onClick={onCreateNew} 
          className="bg-cyan hover:bg-cyan/80 text-white"
        >
          <PlusCircle size={16} className="mr-1" />
          Create New Analysis
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <Loader2 className="h-8 w-8 text-cyan animate-spin" />
        </div>
      ) : analyses.length === 0 ? (
        <div className="glass-card p-8 rounded-xl text-center">
          <BarChart4 className="h-12 w-12 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No salary analyses yet</h3>
          <p className="text-white/70 mb-6">Get started by analyzing your first job offer</p>
          <Button 
            onClick={onCreateNew} 
            className="bg-cyan hover:bg-cyan/80 text-white"
          >
            Analyze an Offer
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {analyses.map((analysis) => (
            <AnalysisCard
              key={analysis.id}
              analysis={analysis}
              onStatusUpdate={onStatusUpdate}
              onEdit={onEdit}
              onDelete={onDelete}
              isUpdatingStatus={isUpdatingStatus}
              selectedAnalysisId={selectedAnalysisId}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AnalysesList;
