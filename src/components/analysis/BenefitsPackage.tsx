
import React from "react";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface BenefitsPackageProps {
  benefitsPackage: string | null;
}

const BenefitsPackage: React.FC<BenefitsPackageProps> = ({ benefitsPackage }) => {
  if (!benefitsPackage) return null;
  
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">Benefits Package</h3>
      <div className="bg-white/5 p-6 rounded-lg">
        <div className="text-white/80 whitespace-pre-wrap">
          {benefitsPackage}
        </div>
      </div>
    </div>
  );
};

export default BenefitsPackage;
