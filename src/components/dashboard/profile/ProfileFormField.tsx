
import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ProfileFormFieldProps {
  label: string;
  id: string;
  children: ReactNode;
}

export const ProfileFormField = ({ label, id, children }: ProfileFormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-white/80">
        {label}
      </Label>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export interface ProfileInputFieldProps {
  id: string;
  icon: ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const ProfileInputField = ({ id, icon, placeholder, value, onChange }: ProfileInputFieldProps) => {
  return (
    <ProfileFormField label={placeholder} id={id}>
      {icon}
      <Input
        id={id}
        placeholder={placeholder}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-white/5 border-white/10 text-white"
      />
    </ProfileFormField>
  );
};

export interface ProfileSelectFieldProps {
  id: string;
  icon: ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const ProfileSelectField = ({ id, icon, placeholder, value, onChange, options }: ProfileSelectFieldProps) => {
  return (
    <ProfileFormField label={placeholder} id={id}>
      {icon}
      <Select
        value={value || ''}
        onValueChange={(value) => onChange(value)}
      >
        <SelectTrigger className="pl-10 bg-white/5 border-white/10 text-white">
          <SelectValue placeholder={`Select ${placeholder.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent className="bg-navy-dark border-white/10">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ProfileFormField>
  );
};
