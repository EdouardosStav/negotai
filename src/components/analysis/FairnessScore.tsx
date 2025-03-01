
import React from "react";

interface FairnessScoreProps {
  fairnessScore: number;
  jobLevel: string;
  jobTitle: string;
  location: string;
  aiAnalysis?: any;
}

const FairnessScore: React.FC<FairnessScoreProps> = ({
  fairnessScore,
  jobLevel,
  jobTitle,
  location,
  aiAnalysis
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-white/80">Fairness Score</span>
        <span className="text-amber-400 font-medium">{fairnessScore}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${
            fairnessScore < 60
              ? "bg-red-500"
              : fairnessScore < 80
              ? "bg-amber-500"
              : "bg-green-500"
          }`}
          style={{ width: `${fairnessScore}%` }}
        ></div>
      </div>
      <p className="text-white/70 text-sm mt-2">
        {aiAnalysis?.marketComparison?.text ||
          `Your offer is ${fairnessScore < 80 ? "below" : "above"} market value for ${jobLevel} ${jobTitle} roles in ${location}.`}
      </p>
    </div>
  );
};

export default FairnessScore;
