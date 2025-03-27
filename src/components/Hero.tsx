import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
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
    const heroEl = heroRef.current;
    if (heroEl) {
      observer.observe(heroEl);
    }
    return () => {
      if (heroEl) {
        observer.unobserve(heroEl);
      }
    };
  }, []);
  const handleAnalyzeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // For now, we just scroll to the analyze section
    const analyzeSection = document.getElementById('analyze');
    if (analyzeSection) {
      analyzeSection.scrollIntoView({
        behavior: 'smooth'
      });
    }

    // In a real implementation, we would check auth state here
    // and show the auth modal if needed
    console.log("User clicked Analyze My Offer - would check auth state here");
  };
  return <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden" id="hero">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-cyan/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
      <div className="absolute top-1/4 right-10 w-32 h-32 rounded-full bg-cyan/5 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div ref={heroRef} className="container mx-auto px-4 text-center relative z-10 opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div className="mb-8 flex justify-center">
          <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-cyan animate-pulse">
            AI-Powered Salary Negotiation
          </span>
        </div>
        
        <h1 className="text-gradient md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.2] tracking-normal text-6xl text-center py-[7px]">
          Get the Salary You Deserve – AI-Powered Salary Negotiation for Job Offers
        </h1>
        
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          AI-powered salary insights and negotiation strategies tailored to your skills and experience.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="#analyze" onClick={handleAnalyzeClick} className="relative overflow-hidden px-8 py-4 rounded-lg font-semibold text-white shadow-lg
                  transform transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98]
                  bg-[#008CFF] hover:shadow-[0_0_25px_rgba(0,140,255,0.6)]">
                  Analyze My Offer
                  <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </a>
              </TooltipTrigger>
              <TooltipContent className="bg-navy-dark border border-white/10 text-white">
                <p>Sign in to unlock AI-powered salary analysis</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex justify-center">
          
        </div>
      </div>
    </section>;
};
export default Hero;