
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormField from "./FormField";
import { DollarSign, Gift } from "lucide-react";

interface SalaryBenefitsFormProps {
  formData: {
    salary: string;
    benefitsPackage: string;
  };
  handleChange: (field: string, value: string) => void;
}

const SalaryBenefitsForm: React.FC<SalaryBenefitsFormProps> = ({ formData, handleChange }) => {
  return (
    <>
      <FormField id="salary" label="Offered Salary ($)" required>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <DollarSign className="text-white/50" size={16} />
          </div>
          <Input
            id="salary"
            type="number"
            min="0"
            value={formData.salary}
            onChange={(e) => handleChange("salary", e.target.value)}
            required
            className="bg-white/5 border-white/10 text-white pl-10"
          />
        </div>
      </FormField>
      
      <FormField id="benefitsPackage" label="Benefits Package">
        <div className="relative">
          <div className="absolute top-3 left-4 pointer-events-none">
            <Gift className="text-white/50" size={16} />
          </div>
          <Textarea
            id="benefitsPackage"
            value={formData.benefitsPackage}
            onChange={(e) => handleChange("benefitsPackage", e.target.value)}
            placeholder="Health insurance, 401k, paid time off, etc."
            className="bg-white/5 border-white/10 text-white min-h-[80px] pl-10"
          />
        </div>
      </FormField>
    </>
  );
};

export default SalaryBenefitsForm;
