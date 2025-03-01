
import React from "react";
import { CheckCircle2, XCircle, AlertCircle, Clock } from "lucide-react";

interface StatusIndicatorProps {
  status: string;
}

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Offer Accepted':
      return <CheckCircle2 className="text-success" size={18} />;
    case 'Negotiation Failed':
      return <XCircle className="text-destructive" size={18} />;
    case 'Counteroffer Sent':
      return <AlertCircle className="text-amber-500" size={18} />;
    default:
      return <Clock className="text-white/70" size={18} />;
  }
};

export const getStatusClass = (status: string) => {
  switch (status) {
    case 'Offer Accepted':
      return 'bg-success/20 text-success';
    case 'Negotiation Failed':
      return 'bg-destructive/20 text-destructive';
    case 'Counteroffer Sent':
      return 'bg-amber-500/20 text-amber-500';
    default:
      return 'bg-white/10 text-white/80';
  }
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  return (
    <div className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center ${getStatusClass(status)}`}>
      {getStatusIcon(status)}
      <span className="ml-1.5">{status}</span>
    </div>
  );
};

export default StatusIndicator;
