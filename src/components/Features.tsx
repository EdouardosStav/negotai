
import { ArrowRight, ChartBar, DollarSign, Briefcase } from "lucide-react";
import { useEffect, useRef } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const featuresEl = featuresRef.current;
    if (featuresEl) {
      observer.observe(featuresEl);
    }
    
    return () => {
      if (featuresEl) {
        observer.unobserve(featuresEl);
      }
    };
  }, []);

  const handleStepClick = (stepId: string) => {
    // Scroll to the analyze section when clicking on a feature step
    const analyzeSection = document.getElementById('analyze');
    if (analyzeSection) {
      analyzeSection.scrollIntoView({ behavior: 'smooth' });
    }
    console.log(`User clicked on step ${stepId}`);
  };

  return (
    <section 
      id="features" 
      className="py-20 md:py-32 relative"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
      
      <div 
        ref={featuresRef}
        className="container mx-auto px-4 relative z-10 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <h2 className="section-heading text-center">How It Works</h2>
        <p className="section-subheading text-center">
          Three simple steps to maximize your salary potential with our AI-powered negotiation tool
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Step 1 */}
          <div className="glass-card p-8 rounded-xl transition-all duration-500 hover:translate-y-[-5px] hover:shadow-[0_10px_25px_-5px_rgba(0,212,255,0.1)]">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
              <Briefcase className="text-cyan" size={28} />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium">1</span>
              <h3 className="text-xl font-bold text-white">Share Your Offer</h3>
            </div>
            <p className="text-white/70 mb-6">
              Enter your job details, experience level, location, and the salary offer you've received.
            </p>
            <div className="pt-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => handleStepClick('step1')} 
                      className="text-cyan text-sm font-medium inline-flex items-center group cursor-pointer"
                    >
                      Input your offer details 
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-navy-dark border border-white/10 text-white">
                    <p>Try out our salary analysis tool</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="glass-card p-8 rounded-xl transition-all duration-500 hover:translate-y-[-5px] hover:shadow-[0_10px_25px_-5px_rgba(0,212,255,0.1)]">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
              <ChartBar className="text-cyan" size={28} />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium">2</span>
              <h3 className="text-xl font-bold text-white">AI Analysis</h3>
            </div>
            <p className="text-white/70 mb-6">
              Our AI analyzes market data, industry standards, and location-specific factors to evaluate your offer's fairness.
            </p>
            <div className="pt-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => handleStepClick('step2')} 
                      className="text-cyan text-sm font-medium inline-flex items-center group cursor-pointer"
                    >
                      How our AI works 
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-navy-dark border border-white/10 text-white">
                    <p>See a sample analysis</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="glass-card p-8 rounded-xl transition-all duration-500 hover:translate-y-[-5px] hover:shadow-[0_10px_25px_-5px_rgba(0,212,255,0.1)]">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
              <DollarSign className="text-cyan" size={28} />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium">3</span>
              <h3 className="text-xl font-bold text-white">Get Insights</h3>
            </div>
            <p className="text-white/70 mb-6">
              Receive personalized negotiation strategies, talking points, and suggested counter-offers based on your specific situation.
            </p>
            <div className="pt-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => handleStepClick('step3')} 
                      className="text-cyan text-sm font-medium inline-flex items-center group cursor-pointer"
                    >
                      View sample insights 
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-navy-dark border border-white/10 text-white">
                    <p>Sign in to get personalized insights</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
