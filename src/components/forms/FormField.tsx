
import React from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ 
  id, 
  label, 
  required = false, 
  children 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white/80">
        {label}{required && <span className="ml-1 text-red-400">*</span>}
      </Label>
      {children}
    </div>
  );
};

export default FormField;
