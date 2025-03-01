
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormField from "./FormField";

interface JobInfoFormProps {
  formData: {
    jobTitle: string;
    companyName: string;
    jobLevel: string;
    employmentType: string;
    experience: string;
    location: string;
  };
  handleChange: (field: string, value: string) => void;
}

const JobInfoForm: React.FC<JobInfoFormProps> = ({ formData, handleChange }) => {
  return (
    <>
      <FormField id="jobTitle" label="Job Title" required>
        <Input
          id="jobTitle"
          value={formData.jobTitle}
          onChange={(e) => handleChange("jobTitle", e.target.value)}
          required
          className="bg-white/5 border-white/10 text-white"
        />
      </FormField>
      
      <FormField id="companyName" label="Company Name">
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
          className="bg-white/5 border-white/10 text-white"
        />
      </FormField>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField id="jobLevel" label="Job Level">
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
        </FormField>
        
        <FormField id="employmentType" label="Employment Type" required>
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
        </FormField>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField id="experience" label="Experience" required>
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
        </FormField>
        
        <FormField id="location" label="Location" required>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            required
            className="bg-white/5 border-white/10 text-white"
          />
        </FormField>
      </div>
    </>
  );
};

export default JobInfoForm;
