
import React from "react";

interface AnalysisPreviewProps {
  handleSampleView: () => void;
  sampleData: {
    jobLevel: string;
    employmentType: string;
  };
}

const ChartIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan">
    <path d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 8L16.0811 12.1827C15.9326 12.3412 15.8584 12.4204 15.7688 12.4614C15.6897 12.4976 15.6026 12.5125 15.516 12.5047C15.418 12.4958 15.3250 12.4522 15.1391 12.365L11.8609 10.635C11.6751 10.5478 11.582 10.5042 11.484 10.4953C11.3975 10.4875 11.3104 10.5024 11.2313 10.5386C11.1416 10.5796 11.0674 10.6588 10.919 10.8173L7 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AnalysisPreview: React.FC<AnalysisPreviewProps> = ({ handleSampleView, sampleData }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
      <div className="h-32 w-32 rounded-full bg-white/5 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,140,255,0.2)]">
        <ChartIcon />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">Insights Preview</h3>
      <p className="text-white/70 mb-4 leading-relaxed">
        Submit your offer details to get personalized salary insights and negotiation strategies.
      </p>
      <div className="glass-card p-5 rounded-lg text-left text-sm text-white/80 shadow-lg space-y-3 w-full">
        <p className="font-medium text-white mb-2">Example insights:</p>
        <div className="space-y-3">
          {/* Static sample insights that don't update with form changes */}
          <p className="py-1.5 px-2 bg-white/5 rounded-md">Your salary offer is 15% below market value for a Senior role. Consider negotiating for $135K – $145K.</p>
          <p className="py-1.5 px-2 bg-white/5 rounded-md">Your benefits package is below industry standard. Request additional PTO days and higher equity percentage.</p>
        </div>
      </div>
      
      <button 
        onClick={handleSampleView} 
        className="mt-6 py-2 px-4 bg-white/10 rounded-lg text-white hover:bg-white/15 transition-all duration-300 text-sm flex items-center"
      >
        View Sample Analysis
      </button>
    </div>
  );
};

export default AnalysisPreview;
