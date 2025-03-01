
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const AnalysisDetailHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <Link to="/dashboard" className="text-white inline-flex items-center hover:text-cyan transition-colors">
        <ChevronLeft size={16} className="mr-1" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default AnalysisDetailHeader;
