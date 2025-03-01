
import React from "react";
import { Loader2 } from "lucide-react";

const AnalysisDetailLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 text-cyan animate-spin mb-4" />
        <p className="text-white">Loading analysis...</p>
      </div>
    </div>
  );
};

export default AnalysisDetailLoading;
