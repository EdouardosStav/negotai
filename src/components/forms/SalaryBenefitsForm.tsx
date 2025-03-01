
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormField from "./FormField";

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
        <Input
          id="salary"
          type="number"
          min="0"
          value={formData.salary}
          onChange={(e) => handleChange("salary", e.target.value)}
          required
          className="bg-white/5 border-white/10 text-white"
        />
      </FormField>
      
      <FormField id="benefitsPackage" label="Benefits Package">
        <Textarea
          id="benefitsPackage"
          value={formData.benefitsPackage}
          onChange={(e) => handleChange("benefitsPackage", e.target.value)}
          placeholder="Health insurance, 401k, paid time off, etc."
          className="bg-white/5 border-white/10 text-white min-h-[80px]"
        />
      </FormField>
    </>
  );
};

export default SalaryBenefitsForm;
