
import React from "react";
import { Loader2, Building, DollarSign, Gift } from "lucide-react";
import { SalaryAnalysisInput } from "@/services/types/analysisTypes";

interface AnalysisFormProps {
  formData: SalaryAnalysisInput;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isAnalyzing: boolean;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ 
  formData, 
  handleChange, 
  handleSubmit, 
  isAnalyzing 
}) => {
  return (
    <div className="glass-card p-8 rounded-xl">
      <h3 className="text-xl font-bold text-white mb-6">Analyze Your Offer</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          {/* Job Details Section */}
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
                value={formData.companyName || ''} 
                onChange={handleChange} 
                placeholder="TechCorp Inc." 
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="jobLevel" className="block text-sm font-medium text-white/80 mb-2">
                Job Level <span className="text-white/50">(Optional)</span>
              </label>
              <select 
                id="jobLevel" 
                name="jobLevel" 
                value={formData.jobLevel || ''} 
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
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
          </div>
          
          {/* Salary Section */}
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
          
          {/* Benefits Section */}
          <div>
            <label htmlFor="benefitsPackage" className="block text-sm font-medium text-white/80 mb-2">
              Benefits Package
            </label>
            <div className="relative">
              <div className="absolute top-3 left-4 pointer-events-none">
                <Gift className="text-white/50" size={16} />
              </div>
              <textarea 
                id="benefitsPackage" 
                name="benefitsPackage" 
                value={formData.benefitsPackage || ''} 
                onChange={handleChange} 
                placeholder="Health Insurance Premium Plan, 2% Equity, 8% Performance Bonus, Hybrid Work (3 days in office), 15 PTO days" 
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all resize-none h-24" 
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="relative overflow-hidden px-8 py-4 rounded-lg font-semibold text-white shadow-lg
              w-full transform transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98]
              bg-[#008CFF] hover:shadow-[0_0_25px_rgba(0,140,255,0.6)]"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </div>
            ) : (
              "Analyze My Offer"
            )}
          </button>
        </div>
      </form>
      
      <div className="flex items-center justify-center text-xs text-white/60 mt-4">
        <a href="#privacy" className="hover:text-white mr-3 transition-colors">Privacy Policy</a>
        <span className="mx-2">•</span>
        <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  );
};

export default AnalysisForm;
