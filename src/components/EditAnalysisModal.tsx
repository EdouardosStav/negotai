
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Database } from "@/integrations/supabase/client";
import { updateSalaryAnalysis } from "@/services/analysisService";
import { useAuth } from "@/context/AuthContext";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface EditAnalysisModalProps {
  analysis: SalaryAnalysis | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedAnalysis: SalaryAnalysis) => void;
}

const EditAnalysisModal: React.FC<EditAnalysisModalProps> = ({ 
  analysis, 
  isOpen, 
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobLevel: "",
    employmentType: "",
    experience: "",
    location: "",
    salary: "",
    benefitsPackage: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (analysis) {
      setFormData({
        jobTitle: analysis.job_title,
        companyName: analysis.company_name || "",
        jobLevel: analysis.job_level || "",
        employmentType: analysis.employment_type,
        experience: analysis.experience,
        location: analysis.location,
        salary: analysis.offered_salary.toString(),
        benefitsPackage: analysis.benefits_package || ""
      });
    }
  }, [analysis]);
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !analysis) return;
    
    try {
      setIsLoading(true);
      
      const updatedAnalysis = await updateSalaryAnalysis(
        analysis.id,
        user.id,
        formData
      );
      
      toast.success("Analysis updated successfully");
      onSuccess(updatedAnalysis);
      onClose();
    } catch (error: any) {
      console.error("Error updating analysis:", error);
      toast.error("Failed to update analysis", {
        description: error.message || "Please try again later"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="glass-card border-0 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Edit Salary Analysis</DialogTitle>
          <DialogDescription className="text-white/70">
            Update the details of your salary analysis
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-3">
          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-white/80">Job Title</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-white/80">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobLevel" className="text-white/80">Job Level</Label>
              <Select 
                value={formData.jobLevel} 
                onValueChange={(value) => handleChange("jobLevel", value)}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-navy-dark border-white/10">
                  <SelectItem value="Entry">Entry</SelectItem>
                  <SelectItem value="Junior">Junior</SelectItem>
                  <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employmentType" className="text-white/80">Employment Type</Label>
              <Select 
                value={formData.employmentType} 
                onValueChange={(value) => handleChange("employmentType", value)}
                required
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-navy-dark border-white/10">
                  <SelectItem value="Full-Time">Full-Time</SelectItem>
                  <SelectItem value="Part-Time">Part-Time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-white/80">Experience</Label>
              <Select 
                value={formData.experience} 
                onValueChange={(value) => handleChange("experience", value)}
                required
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent className="bg-navy-dark border-white/10">
                  <SelectItem value="0-1 years">0-1 years</SelectItem>
                  <SelectItem value="1-3 years">1-3 years</SelectItem>
                  <SelectItem value="3-5 years">3-5 years</SelectItem>
                  <SelectItem value="5-10 years">5-10 years</SelectItem>
                  <SelectItem value="10+ years">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white/80">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="salary" className="text-white/80">Offered Salary ($)</Label>
            <Input
              id="salary"
              type="number"
              min="0"
              value={formData.salary}
              onChange={(e) => handleChange("salary", e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="benefitsPackage" className="text-white/80">Benefits Package</Label>
            <Textarea
              id="benefitsPackage"
              value={formData.benefitsPackage}
              onChange={(e) => handleChange("benefitsPackage", e.target.value)}
              placeholder="Health insurance, 401k, paid time off, etc."
              className="bg-white/5 border-white/10 text-white min-h-[80px]"
            />
          </div>
          
          <DialogFooter className="pt-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="border-white/10 text-white hover:bg-white/10"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-cyan hover:bg-cyan/80 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAnalysisModal;
