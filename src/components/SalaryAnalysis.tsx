
import { useRef, useEffect } from "react";
import { useAnalysisForm } from "@/hooks/useAnalysisForm";
import AnalysisForm from "./analysis/AnalysisForm";
import AnalysisPreview from "./analysis/AnalysisPreview";
import AnalysisResults from "./analysis/AnalysisResults";

const SalaryAnalysis = () => {
  const {
    formData,
    formSubmitted,
    isAnalyzing,
    isSaving,
    analysisResults,
    sampleData,
    handleChange,
    handleSubmit,
    handleSampleView,
    handleSaveAnalysis,
    redirectToAuth
  } = useAnalysisForm();
  
  const analysisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, {
      threshold: 0.1
    });
    
    const analysisEl = analysisRef.current;
    if (analysisEl) {
      observer.observe(analysisEl);
    }
    
    return () => {
      if (analysisEl) {
        observer.unobserve(analysisEl);
      }
    };
  }, []);

  // Handle form input changes that need to update the formData state
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    handleChange(e);
  };

  return (
    <section id="analyze" className="py-20 md:py-32 relative">
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-gradient-radial from-cyan/10 to-transparent blur-3xl"></div>
      
      <div ref={analysisRef} className="container mx-auto px-4 relative z-10 opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <h2 className="section-heading text-center py-[8px]">Salary Analysis</h2>
        <p className="section-subheading text-center">
          See how your offer compares to market rates and get personalized negotiation insights
        </p>
        
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnalysisForm 
              formData={formData}
              handleChange={handleFormChange}
              handleSubmit={handleSubmit}
              isAnalyzing={isAnalyzing}
            />
            
            <div className="glass-card p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              {!formSubmitted ? (
                <AnalysisPreview 
                  handleSampleView={handleSampleView}
                  sampleData={sampleData}
                />
              ) : (
                <AnalysisResults 
                  formData={formData}
                  analysisResults={analysisResults}
                  handleSaveAnalysis={handleSaveAnalysis}
                  redirectToAuth={redirectToAuth}
                  isSaving={isSaving}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalaryAnalysis;
