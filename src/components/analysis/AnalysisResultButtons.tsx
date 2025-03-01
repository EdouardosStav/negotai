
import React from "react";
import { Loader2 } from "lucide-react";

interface AnalysisResultButtonsProps {
  isAuthenticated: boolean;
  handleSaveAnalysis?: () => void;
  redirectToAuth?: () => void;
  isSaving?: boolean;
  isUpdatingStatus?: boolean;
  onStatusChange?: (newStatus: string) => void;
  analysis?: any;
}

const AnalysisResultButtons: React.FC<AnalysisResultButtonsProps> = ({
  isAuthenticated,
  handleSaveAnalysis,
  redirectToAuth,
  isSaving,
  isUpdatingStatus,
  onStatusChange,
  analysis
}) => {
  if (analysis && onStatusChange) {
    // Rendering for AnalysisDetail page (with status update controls)
    return <div className="mt-6">{/* Status update controls would go here */}</div>;
  }

  if (isAuthenticated && handleSaveAnalysis) {
    // Rendering for saving analysis
    return (
      <button
        onClick={handleSaveAnalysis}
        className="w-full mt-6 py-2.5 px-4 rounded-lg bg-gradient-to-r from-primary/80 to-primary text-white hover:from-primary hover:to-primary/80 transition-all duration-300 text-sm"
        disabled={isSaving}
      >
        {isSaving ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </div>
        ) : (
          "Save Analysis to Dashboard"
        )}
      </button>
    );
  }

  if (redirectToAuth) {
    // Rendering for unauthenticated users
    return (
      <button
        onClick={redirectToAuth}
        className="w-full mt-6 py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 text-sm"
      >
        Sign in for Full Analysis & Report
      </button>
    );
  }

  return null;
};

export default AnalysisResultButtons;
