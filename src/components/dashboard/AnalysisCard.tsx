
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface AnalysisCardProps {
  analysis: SalaryAnalysis;
  onStatusUpdate: (analysisId: string, status: string) => void;
  onEdit: (analysis: SalaryAnalysis) => void;
  onDelete: (analysis: SalaryAnalysis) => void;
  isUpdatingStatus: boolean;
  selectedAnalysisId: string | null;
}

const AnalysisCard = ({ 
  analysis, 
  onStatusUpdate, 
  onEdit, 
  onDelete, 
  isUpdatingStatus, 
  selectedAnalysisId 
}: AnalysisCardProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="glass-card border-0 overflow-hidden">
      <CardHeader className="relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onEdit(analysis)}
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
          >
            <Pencil size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onDelete(analysis)}
            className="h-8 w-8 text-white/70 hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 size={16} />
          </Button>
        </div>
        <div className="mt-2">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            analysis.negotiation_status === 'Offer Accepted' ? 'bg-success/20 text-success' :
            analysis.negotiation_status === 'Negotiation Failed' ? 'bg-destructive/20 text-destructive' :
            analysis.negotiation_status === 'Counteroffer Sent' ? 'bg-amber-500/20 text-amber-500' :
            'bg-white/10 text-white/80'
          }`}>
            {analysis.negotiation_status}
          </div>
        </div>
        <CardTitle className="text-white text-xl">{analysis.job_title}</CardTitle>
        <CardDescription className="text-white/70">
          {analysis.company_name ? `${analysis.company_name} • ` : ''}
          {analysis.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-white/60 text-xs mb-1">Offered Salary</div>
            <div className="text-white font-semibold">{formatCurrency(analysis.offered_salary)}</div>
          </div>
          {analysis.suggested_counteroffer && (
            <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
              <div className="text-white/60 text-xs mb-1">Suggested Counter</div>
              <div className="text-gradient font-semibold">{formatCurrency(analysis.suggested_counteroffer)}</div>
            </div>
          )}
        </div>
        
        {analysis.fairness_score !== null && (
          <div className="pt-2">
            <div className="flex justify-between mb-2">
              <span className="text-white/70 text-sm">Fairness Score</span>
              <span className={`text-sm font-medium ${
                analysis.fairness_score >= 70 ? 'text-success' :
                analysis.fairness_score >= 40 ? 'text-amber-400' :
                'text-destructive'
              }`}>
                {analysis.fairness_score}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  analysis.fairness_score >= 70 ? 'bg-gradient-to-r from-success/80 to-success' :
                  analysis.fairness_score >= 40 ? 'bg-gradient-to-r from-amber-500/80 to-amber-500' :
                  'bg-gradient-to-r from-destructive/80 to-destructive'
                }`}
                style={{ width: `${analysis.fairness_score}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex items-center text-white/70 text-xs mt-2">
          <Calendar size={14} className="mr-1" />
          Created {formatDate(analysis.created_at)}
        </div>
      </CardContent>
      <CardFooter className="border-t border-white/10 pt-4 flex flex-col gap-4">
        <p className="text-white/80 text-sm font-medium mb-1">Update Status:</p>
        <div className="grid grid-cols-2 gap-2 w-full">
          <Select 
            onValueChange={(value) => onStatusUpdate(analysis.id, value)}
            defaultValue={analysis.negotiation_status}
            disabled={isUpdatingStatus && selectedAnalysisId === analysis.id}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent className="bg-navy-dark border-white/10">
              <SelectItem value="Awaiting Response">Awaiting Response</SelectItem>
              <SelectItem value="Counteroffer Sent">Counteroffer Sent</SelectItem>
              <SelectItem value="Offer Accepted">Offer Accepted</SelectItem>
              <SelectItem value="Negotiation Failed">Negotiation Failed</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            onClick={() => navigate(`/analysis/${analysis.id}`)}
            className="border-white/10 text-white hover:bg-white/10"
          >
            View Details
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AnalysisCard;
