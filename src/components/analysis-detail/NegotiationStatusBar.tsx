
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface NegotiationStatusBarProps {
  status: string;
  isUpdatingStatus: boolean;
  onStatusChange: (status: string) => void;
}

const NegotiationStatusBar: React.FC<NegotiationStatusBarProps> = ({
  status,
  isUpdatingStatus,
  onStatusChange
}) => {
  const statuses = ["Not Started", "In Progress", "Accepted", "Rejected", "Countered"];
  
  return (
    <div className="mt-6 bg-white/5 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-medium">Negotiation Status</h4>
        {isUpdatingStatus && <Loader2 size={16} className="text-cyan animate-spin" />}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {statuses.map((statusOption) => (
          <Button
            key={statusOption}
            size="sm"
            variant={status === statusOption ? "default" : "outline"}
            className={status === statusOption 
              ? "bg-cyan hover:bg-cyan/80 text-white" 
              : "bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
            }
            onClick={() => onStatusChange(statusOption)}
            disabled={isUpdatingStatus}
          >
            {statusOption}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NegotiationStatusBar;
