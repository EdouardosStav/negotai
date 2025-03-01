
import React from "react";
import { MapPin, Calendar } from "lucide-react";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface BasicInfoProps {
  analysis: SalaryAnalysis;
  formatDate: (dateString: string) => string;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ analysis, formatDate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <div className="text-white/60 text-sm">Job Level</div>
        <div className="text-white font-medium">{analysis.job_level || "Not specified"}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-white/60 text-sm">Employment Type</div>
        <div className="text-white font-medium">{analysis.employment_type}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-white/60 text-sm">Experience</div>
        <div className="text-white font-medium">{analysis.experience} years</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-white/60 text-sm">Location</div>
        <div className="text-white font-medium flex items-center">
          <MapPin size={14} className="mr-1" />
          {analysis.location}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-white/60 text-sm">Created</div>
        <div className="text-white font-medium">
          {formatDate(analysis.created_at)}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-white/60 text-sm">Last Updated</div>
        <div className="text-white font-medium">
          {formatDate(analysis.updated_at)}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
