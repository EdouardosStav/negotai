
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AnalysisActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const AnalysisActions: React.FC<AnalysisActionsProps> = ({ onEdit, onDelete }) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center mt-10">
      <div className="flex flex-wrap justify-center gap-4">
        <Button 
          onClick={onEdit} 
          variant="outline"
          className="bg-white/5 hover:bg-white/10 border-white/10 text-white"
        >
          Edit Analysis
        </Button>
        
        <Button 
          onClick={onDelete} 
          variant="outline"
          className="bg-white/5 hover:bg-destructive/10 border-white/10 text-white hover:text-destructive"
        >
          Delete Analysis
        </Button>
        
        <Button 
          onClick={() => navigate('/#analyze')} 
          className="bg-cyan hover:bg-cyan/80 text-white"
        >
          Create New Analysis
        </Button>
      </div>
    </div>
  );
};

export default AnalysisActions;
