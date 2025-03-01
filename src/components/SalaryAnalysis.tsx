
import { useState, useEffect, useRef } from "react";
import { CheckCircle, AlertCircle, DollarSign, ShieldCheck, Building, Gift, Award, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SalaryAnalysis = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    experience: "",
    location: "",
    salary: "",
    companyName: "",
    benefitsPackage: "",
    jobLevel: "",
    employmentType: "Full-Time"
  });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In the pre-auth experience, we simulate the form submission
    // But would prompt for sign in before showing full results
    console.log("Form submitted, would require auth before showing full results");
    setFormSubmitted(true);
  };

  const handleSampleView = () => {
    // Pre-fill the form with sample data for the demo
    setFormData({
      jobTitle: "Software Engineer",
      experience: "3-5",
      location: "San Francisco, CA",
      salary: "120000",
      companyName: "TechCorp Inc.",
      benefitsPackage: "Health Insurance Premium Plan, 2% Equity, 8% Performance Bonus, Hybrid Work (3 days in office), 15 PTO days",
      jobLevel: "Senior",
      employmentType: "Full-Time"
    });
    // Show sample results
    setFormSubmitted(true);
  };

  return (
    <section id="analyze" className="py-20 md:py-32 relative">
      {/* Background elements */}
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
            {/* Form Section - Updated with new fields */}
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
                      placeholder="Software Engineer" 
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all" 
                      required 
                    />
                  </div>
                  
                  {/* New Field: Company Name */}
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-white/80 mb-2">
                      Company Name <span className="text-white/50">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Building className="text-white/50" size={16} />
                      </div>
                      <input 
                        type="text" 
                        id="companyName" 
                        name="companyName" 
                        value={formData.companyName} 
                        onChange={handleChange} 
                        placeholder="TechCorp Inc." 
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all" 
                      />
                    </div>
                  </div>
                  
                  {/* New Field: Job Level */}
                  <div>
                    <label htmlFor="jobLevel" className="block text-sm font-medium text-white/80 mb-2">
                      Job Level <span className="text-white/50">(Optional)</span>
                    </label>
                    <select 
                      id="jobLevel" 
                      name="jobLevel" 
                      value={formData.jobLevel} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all"
                    >
                      <option value="" disabled className="bg-navy-dark">Select job level</option>
                      <option value="Junior" className="bg-navy-dark">Junior</option>
                      <option value="Mid-Level" className="bg-navy-dark">Mid-Level</option>
                      <option value="Senior" className="bg-navy-dark">Senior</option>
                      <option value="Lead" className="bg-navy-dark">Lead</option>
                      <option value="Director" className="bg-navy-dark">Director</option>
                      <option value="VP" className="bg-navy-dark">VP</option>
                      <option value="C-Level" className="bg-navy-dark">C-Level</option>
                    </select>
                  </div>
                  
                  {/* New Field: Employment Type */}
                  <div>
                    <label htmlFor="employmentType" className="block text-sm font-medium text-white/80 mb-2">
                      Employment Type
                    </label>
                    <select 
                      id="employmentType" 
                      name="employmentType" 
                      value={formData.employmentType} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all"
                      required
                    >
                      <option value="Full-Time" className="bg-navy-dark">Full-Time</option>
                      <option value="Contract" className="bg-navy-dark">Contract</option>
                      <option value="Internship" className="bg-navy-dark">Internship</option>
                    </select>
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
                      placeholder="San Francisco, CA" 
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
                        type="text" 
                        id="salary" 
                        name="salary" 
                        value={formData.salary} 
                        onChange={handleChange} 
                        placeholder="120000" 
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all" 
                        required 
                      />
                    </div>
                  </div>
                  
                  {/* New Field: Benefits Package */}
                  <div>
                    <label htmlFor="benefitsPackage" className="block text-sm font-medium text-white/80 mb-2">
                      Benefits Package <span className="text-xs text-white/50">(Health insurance, Stock options, Bonus, Remote policy, PTO, etc.)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-4 pointer-events-none">
                        <Gift className="text-white/50" size={16} />
                      </div>
                      <textarea 
                        id="benefitsPackage" 
                        name="benefitsPackage" 
                        value={formData.benefitsPackage} 
                        onChange={handleChange} 
                        placeholder="Health Insurance Premium Plan, 2% Equity, 8% Performance Bonus, Hybrid Work (3 days in office), 15 PTO days" 
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all resize-none h-24" 
                      />
                    </div>
                  </div>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          type="submit" 
                          className="relative overflow-hidden px-8 py-4 rounded-lg font-semibold text-white shadow-lg
                            w-full transform transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98]
                            bg-[#008CFF] hover:shadow-[0_0_25px_rgba(0,140,255,0.6)]"
                        >
                          Analyze My Offer
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-navy-dark border border-white/10 text-white">
                        <p>Sign in to unlock AI-powered salary analysis</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </form>
              
              {/* Privacy links below the form */}
              <div className="flex items-center justify-center text-xs text-white/60 mt-4">
                <a href="#privacy" className="hover:text-white mr-3 transition-colors">Privacy Policy</a>
                <span className="mx-2">•</span>
                <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
            
            {/* Results Section - Enhanced with new assessments */}
            <div className="glass-card p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              {!formSubmitted ? (
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
                      <p className="py-1.5 px-2 bg-white/5 rounded-md">Your salary offer is 15% below market value for a {formData.jobLevel || "Senior"} role. Consider negotiating for $135K – $145K.</p>
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
              ) : (
                <div className="animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Offer Analysis</h3>
                    <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white/80">
                      Sample Preview
                    </div>
                  </div>
                  
                  {/* Updated Fairness Score */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">Fairness Score</span>
                      <span className="text-amber-400 font-medium">80%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-green-500 h-2 rounded-full" 
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                    <p className="text-white/70 text-xs mt-2">
                      Your offer is well above market value considering your job level and benefits package.
                    </p>
                  </div>
                  
                  {/* Updated Analysis Sections */}
                  <div className="space-y-4 mb-6">
                    {/* Company-specific insights if company name is provided */}
                    {formData.companyName && (
                      <div className="flex items-start gap-3">
                        <Building className="text-cyan mt-1 flex-shrink-0" size={18} />
                        <p className="text-white/80 text-sm">
                          <span className="font-medium text-white block mb-1">Company Specific</span>
                          Your offer is in the 75th percentile for {formData.jobLevel || "Senior"} {formData.jobTitle} roles at {formData.companyName}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-success mt-1 flex-shrink-0" size={18} />
                      <p className="text-white/80 text-sm">
                        <span className="font-medium text-white block mb-1">Competitive Base Salary</span>
                        Your offer is in the 70th percentile for {formData.jobLevel || "Senior"} {formData.jobTitle} roles in {formData.location}
                      </p>
                    </div>
                    
                    {/* Benefits Analysis */}
                    {formData.benefitsPackage && (
                      <div className="flex items-start gap-3">
                        <Gift className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                        <p className="text-white/80 text-sm">
                          <span className="font-medium text-white block mb-1">Benefits Assessment</span>
                          Your benefits package is <span className="text-amber-400 font-medium">At Industry Standard</span>. Your equity offer (2%) is competitive, but your PTO (15 days) is below the average of 20 days for your level.
                        </p>
                      </div>
                    )}
                    
                    {/* Bonus & Stock Potential */}
                    <div className="flex items-start gap-3">
                      <Award className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                      <p className="text-white/80 text-sm">
                        <span className="font-medium text-white block mb-1">Bonus & Stock Potential</span>
                        Your 8% performance bonus is slightly below the 10% industry average for {formData.jobLevel || "Senior"} roles.
                      </p>
                    </div>
                    
                    {/* Growth Potential */}
                    <div className="flex items-start gap-3">
                      <Clock className="text-success mt-1 flex-shrink-0" size={18} />
                      <p className="text-white/80 text-sm">
                        <span className="font-medium text-white block mb-1">Growth Potential</span>
                        Salary growth trajectory aligns with industry standards for {formData.employmentType} positions
                      </p>
                    </div>
                  </div>
                  
                  {/* Updated Counter-Offer section */}
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <p className="text-white/90 text-sm mb-2">
                      <span className="font-medium text-white">Suggested Counter-Offer:</span>
                    </p>
                    <p className="text-2xl font-bold text-gradient">
                      ${formData.salary ? (parseInt(formData.salary) * 1.12).toLocaleString() : "0"}
                    </p>
                    <p className="text-white/70 text-xs mt-1">
                      12% increase with strong justification based on market data
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-sm text-white mb-2">Additional negotiation points:</p>
                      <ul className="text-xs text-white/70 space-y-1">
                        <li>• Request 20 PTO days (industry standard is 20-25 days)</li>
                        <li>• Negotiate for 10% performance bonus (currently 8%)</li>
                        <li>• Ask about professional development budget</li>
                      </ul>
                    </div>
                  </div>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="w-full mt-6 py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 text-sm">
                          Sign in for Full Analysis & Report
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-navy-dark border border-white/10 text-white">
                        <p>Sign in to access your personalized report</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Chart icon SVG component - Increased size and improved color
const ChartIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan">
    <path d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 8L16.0811 12.1827C15.9326 12.3412 15.8584 12.4204 15.7688 12.4614C15.6897 12.4976 15.6026 12.5125 15.516 12.5047C15.418 12.4958 15.3250 12.4522 15.1391 12.365L11.8609 10.635C11.6751 10.5478 11.582 10.5042 11.484 10.4953C11.3975 10.4875 11.3104 10.5024 11.2313 10.5386C11.1416 10.5796 11.0674 10.6588 10.919 10.8173L7 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default SalaryAnalysis;
