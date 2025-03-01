
import React from "react";
import { formatPercentIncrease, getCounterOfferJustification } from "@/utils/analysisUtils";

interface CounterOfferSectionProps {
  counterofferMin: number;
  counterofferMax: number;
  offeredSalary: number;
  jobLevel: string;
  jobTitle: string;
  location: string;
  fairnessScore: number;
  aiAnalysis: any;
  formatCurrency: (amount: number) => string;
}

const CounterOfferSection: React.FC<CounterOfferSectionProps> = ({
  counterofferMin,
  counterofferMax,
  offeredSalary,
  jobLevel,
  jobTitle,
  location,
  fairnessScore,
  aiAnalysis,
  formatCurrency
}) => {
  const percentIncrease = formatPercentIncrease(offeredSalary, counterofferMin, counterofferMax);
  const justificationText = getCounterOfferJustification(
    fairnessScore,
    jobLevel,
    jobTitle,
    location,
    aiAnalysis,
    percentIncrease
  );

  return (
    <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
      <p className="text-white/90 text-sm mb-2">
        <span className="font-medium text-white">Suggested Counter-Offer Range:</span>
      </p>
      <p className="text-2xl font-bold text-gradient">
        {formatCurrency(counterofferMin)} - {formatCurrency(counterofferMax)}
      </p>
      <p className="text-white/70 text-xs mt-1">{justificationText}</p>
      <div className="mt-3 pt-3 border-t border-white/10">
        <p className="text-sm text-white mb-2">Negotiation strategy:</p>
        <ul className="text-xs text-white/70 space-y-1">
          {aiAnalysis?.negotiationPoints ? (
            aiAnalysis.negotiationPoints.map((point: string, index: number) => (
              <li key={index} className="flex items-start gap-1.5">
                <span className="text-success">✓</span>
                <span>{point}</span>
              </li>
            ))
          ) : (
            <>
              <li className="flex items-start gap-1.5">
                <span className="text-success">✓</span>
                <span>
                  Request {formatCurrency(counterofferMin)} - {formatCurrency(counterofferMax)} based on market rates
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-success">✓</span>
                <span>Negotiate for 10-15% performance bonus (industry standard)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-success">✓</span>
                <span>Ask about professional development budget and learning opportunities</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-success">✓</span>
                <span>Discuss flexible work arrangements (remote/hybrid options)</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CounterOfferSection;
