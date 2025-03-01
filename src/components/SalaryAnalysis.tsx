
import { useState, useEffect, useRef } from "react";
import { CheckCircle, AlertCircle, DollarSign } from "lucide-react";

const SalaryAnalysis = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    experience: "",
    location: "",
    salary: "",
  });
  
  const analysisRef = useRef<HTMLDivElement>(null);
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    setFormSubmitted(true);
  };

  return (
    <section id="analyze" className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-gradient-radial from-cyan/10 to-transparent blur-3xl"></div>
      
      <div 
        ref={analysisRef}
        className="container mx-auto px-4 relative z-10 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <h2 className="section-heading text-center">Salary Analysis</h2>
        <p className="section-subheading text-center">
          See how your offer compares to market rates and get personalized negotiation insights
        </p>
        
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-6">Analyze Your Offer</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-white/80 mb-2">
                      Job Title
                    </label>
                    <input 
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="e.g. Software Engineer"
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-white/80 mb-2">
                      Years of Experience
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all"
                      required
                    >
                      <option value="" disabled className="bg-navy-dark">Select experience</option>
                      <option value="0-2" className="bg-navy-dark">0-2 years</option>
                      <option value="3-5" className="bg-navy-dark">3-5 years</option>
                      <option value="6-10" className="bg-navy-dark">6-10 years</option>
                      <option value="10+" className="bg-navy-dark">10+ years</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-white/80 mb-2">
                      Location
                    </label>
                    <input 
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. San Francisco, CA"
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="salary" className="block text-sm font-medium text-white/80 mb-2">
                      Offered Salary (USD)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <DollarSign className="text-white/50" size={16} />
                      </div>
                      <input 
                        type="number"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="e.g. 120000"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="cta-button w-full mt-4"
                  >
                    Analyze My Offer
                  </button>
                </div>
              </form>
            </div>
            
            {/* Results Section */}
            <div className="glass-card p-8 rounded-xl">
              {!formSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="h-32 w-32 rounded-full bg-white/5 flex items-center justify-center mb-6 animate-pulse">
                    <ChartIcon />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Insights Preview</h3>
                  <p className="text-white/70">
                    Submit your offer details to get personalized salary insights and negotiation strategies.
                  </p>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-bold text-white mb-6">Offer Analysis</h3>
                  
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">Fairness Score</span>
                      <span className="text-amber-400 font-medium">75%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-amber-500 to-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-success mt-1 flex-shrink-0" size={18} />
                      <p className="text-white/80 text-sm">
                        <span className="font-medium text-white block mb-1">Competitive Base Salary</span>
                        Your offer is in the 60th percentile for {formData.jobTitle} roles in {formData.location}
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <AlertCircle className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                      <p className="text-white/80 text-sm">
                        <span className="font-medium text-white block mb-1">Bonus Potential</span>
                        Consider negotiating for a performance bonus of 10-15%
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-success mt-1 flex-shrink-0" size={18} />
                      <p className="text-white/80 text-sm">
                        <span className="font-medium text-white block mb-1">Growth Potential</span>
                        Salary growth trajectory aligns with industry standards
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <p className="text-white/90 text-sm mb-2">
                      <span className="font-medium text-white">Suggested Counter-Offer:</span>
                    </p>
                    <p className="text-2xl font-bold text-gradient">
                      ${(parseInt(formData.salary) * 1.12).toLocaleString()}
                    </p>
                    <p className="text-white/70 text-xs mt-1">
                      12% increase with strong justification based on market data
                    </p>
                  </div>
                  
                  <button className="w-full mt-6 py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 text-sm">
                    View Full Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Chart icon SVG component
const ChartIcon = () => (
  <svg 
    width="64" 
    height="64" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-cyan/80"
  >
    <path d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 8L16.0811 12.1827C15.9326 12.3412 15.8584 12.4204 15.7688 12.4614C15.6897 12.4976 15.6026 12.5125 15.516 12.5047C15.418 12.4958 15.3250 12.4522 15.1391 12.365L11.8609 10.635C11.6751 10.5478 11.582 10.5042 11.484 10.4953C11.3975 10.4875 11.3104 10.5024 11.2313 10.5386C11.1416 10.5796 11.0674 10.6588 10.919 10.8173L7 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default SalaryAnalysis;
