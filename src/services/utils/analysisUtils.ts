
import { supabase } from "@/integrations/supabase/client";

/**
 * Maps analysis input fields to database column names for updates
 */
export const mapInputToDbFields = (data: Partial<any>) => {
  let updateData: any = { ...data };
  
  if (data.salary !== undefined) {
    updateData.offered_salary = typeof data.salary === 'string' 
      ? parseFloat(data.salary) 
      : data.salary;
    delete updateData.salary;
  }
  
  if (data.jobTitle !== undefined) {
    updateData.job_title = data.jobTitle;
    delete updateData.jobTitle;
  }
  
  if (data.companyName !== undefined) {
    updateData.company_name = data.companyName;
    delete updateData.companyName;
  }
  
  if (data.jobLevel !== undefined) {
    updateData.job_level = data.jobLevel;
    delete updateData.jobLevel;
  }
  
  if (data.employmentType !== undefined) {
    updateData.employment_type = data.employmentType;
    delete updateData.employmentType;
  }
  
  if (data.experience !== undefined) {
    updateData.experience = data.experience;
    delete updateData.experience;
  }
  
  if (data.location !== undefined) {
    updateData.location = data.location;
    delete updateData.location;
  }
  
  if (data.benefitsPackage !== undefined) {
    updateData.benefits_package = data.benefitsPackage;
    delete updateData.benefitsPackage;
  }
  
  return updateData;
};

/**
 * Error handler for Supabase operations
 */
export const handleSupabaseError = (error: any, operationName: string) => {
  console.error(`Error ${operationName}:`, error);
  throw error;
};
