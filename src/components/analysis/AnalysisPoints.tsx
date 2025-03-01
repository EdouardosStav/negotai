
import React from "react";
import { Building, CheckCircle, Gift, Award, Clock } from "lucide-react";

interface AnalysisPointsProps {
  companyName: string;
  fairnessScore: number;
  jobLevel: string;
  jobTitle: string;
  location: string;
  benefitsPackage: string;
  counterofferMin: number;
  counterofferMax: number;
  aiAnalysis: any;
  formatCurrency: (amount: number) => string;
}

const AnalysisPoints: React.FC<AnalysisPointsProps> = ({
  companyName,
  fairnessScore,
  jobLevel,
  jobTitle,
  location,
  benefitsPackage,
  counterofferMin,
  counterofferMax,
  aiAnalysis,
  formatCurrency
}) => {
  return (
    <div className="space-y-4 mb-6">
      {companyName && (
        <div className="flex items-start gap-3">
          <Building className="text-cyan mt-1 flex-shrink-0" size={18} />
          <div className="text-white/80 text-sm">
            <span className="font-medium text-white block mb-1">Company Specific</span>
            <p>
              {aiAnalysis?.companySpecific?.text ||
                `${companyName} is known for offering competitive compensation for ${jobLevel} ${jobTitle} roles.`}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3">
        <CheckCircle
          className={`${fairnessScore >= 80 ? "text-success" : "text-amber-400"} mt-1 flex-shrink-0`}
          size={18}
        />
        <div className="text-white/80 text-sm">
          <span className="font-medium text-white block mb-1">Competitive Base Salary</span>
          <p>
            {aiAnalysis?.marketComparison?.text ||
              `The average salary for this role in ${location} ranges between ${formatCurrency(
                counterofferMin * 0.9
              )}-${formatCurrency(counterofferMax)}.`}
          </p>
        </div>
      </div>

      {(benefitsPackage || aiAnalysis?.benefitsAssessment) && (
        <div className="flex items-start gap-3">
          <Gift className="text-amber-400 mt-1 flex-shrink-0" size={18} />
          <div className="text-white/80 text-sm">
            <span className="font-medium text-white block mb-1">Benefits Assessment</span>
            <p>
              {aiAnalysis?.benefitsAssessment?.text ||
                `Based on the provided benefits information, your package is ${
                  fairnessScore >= 80 ? "competitive" : "below industry standards"
                }.`}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3">
        <Award className="text-amber-400 mt-1 flex-shrink-0" size={18} />
        <div className="text-white/80 text-sm">
          <span className="font-medium text-white block mb-1">Bonus & Stock Potential</span>
          <p>
            {aiAnalysis?.bonusAndEquity?.text ||
              `Performance bonuses for similar roles typically range from 8-10% of base salary. Inquire about equity options if available.`}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Clock className="text-success mt-1 flex-shrink-0" size={18} />
        <div className="text-white/80 text-sm">
          <span className="font-medium text-white block mb-1">Growth Potential</span>
          <p>
            {aiAnalysis?.growthPotential?.text ||
              `Career growth for ${jobLevel} ${jobTitle} roles typically includes advancement opportunities within 1-2 years.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPoints;
