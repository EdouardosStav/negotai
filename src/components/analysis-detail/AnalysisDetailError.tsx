
import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AnalysisDetailError: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="flex flex-col items-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <p className="text-white text-xl font-bold mb-2">Analysis Not Found</p>
        <p className="text-white/70 mb-6">We couldn't find the requested analysis</p>
        <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
      </div>
    </div>
  );
};

export default AnalysisDetailError;
