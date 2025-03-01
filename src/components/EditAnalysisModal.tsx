
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/client";
import { updateSalaryAnalysis } from "@/services/analysisService";
import { useAuth } from "@/context/AuthContext";
import JobInfoForm from "./forms/JobInfoForm";
import SalaryBenefitsForm from "./forms/SalaryBenefitsForm";

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
          <JobInfoForm formData={formData} handleChange={handleChange} />
          <SalaryBenefitsForm formData={formData} handleChange={handleChange} />
          
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
