
import { supabase } from "@/integrations/supabase/client";

export interface SalaryAnalysisInput {
  jobTitle: string;
  companyName?: string;
  jobLevel?: string;
  employmentType: string;
  experience: string;
  location: string;
  salary: string | number;
  benefitsPackage?: string;
}

export const saveSalaryAnalysis = async (
  userId: string, 
  data: SalaryAnalysisInput, 
  analysisMeta: { 
    fairnessScore: number, 
    suggestedCounteroffer: number 
  }
) => {
  const { 
    jobTitle, 
    companyName, 
    jobLevel, 
    employmentType, 
    experience, 
    location, 
    salary, 
    benefitsPackage 
  } = data;
  
  const { fairnessScore, suggestedCounteroffer } = analysisMeta;

  const offeredSalary = typeof salary === 'string' ? parseFloat(salary) : salary;
  
  const { data: result, error } = await supabase
    .from('salary_analyses')
    .insert({
      user_id: userId,
      job_title: jobTitle,
      company_name: companyName || null,
      job_level: jobLevel || null,
      employment_type: employmentType,
      experience: experience,
      location: location,
      offered_salary: offeredSalary,
      benefits_package: benefitsPackage || null,
      fairness_score: fairnessScore,
      suggested_counteroffer: suggestedCounteroffer,
      negotiation_status: 'Awaiting Response'
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving analysis:', error);
    throw error;
  }

  return result;
};

export const getSalaryAnalysisById = async (analysisId: string, userId: string) => {
  const { data, error } = await supabase
    .from('salary_analyses')
    .select('*')
    .eq('id', analysisId)
    .eq('user_id', userId)
    .is('deleted_at', null)
    .maybeSingle();

  if (error) {
    console.error('Error fetching analysis:', error);
    throw error;
  }

  return data;
};

export const updateNegotiationStatus = async (
  analysisId: string, 
  userId: string, 
  status: string
) => {
  const { data, error } = await supabase
    .from('salary_analyses')
    .update({
      negotiation_status: status,
      updated_at: new Date().toISOString()
    })
    .eq('id', analysisId)
    .eq('user_id', userId)
    .is('deleted_at', null)
    .select()
    .single();

  if (error) {
    console.error('Error updating status:', error);
    throw error;
  }

  return data;
};

// New functions for updating and deleting analyses

export const updateSalaryAnalysis = async (
  analysisId: string,
  userId: string,
  data: Partial<SalaryAnalysisInput>
) => {
  // Convert any string salary to number
  let updateData: any = { ...data };
  
  if (data.salary !== undefined) {
    updateData.offered_salary = typeof data.salary === 'string' 
      ? parseFloat(data.salary) 
      : data.salary;
    delete updateData.salary;
  }
  
  // Map input fields to database column names
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
  
  // Add updated timestamp
  updateData.updated_at = new Date().toISOString();

  const { data: result, error } = await supabase
    .from('salary_analyses')
    .update(updateData)
    .eq('id', analysisId)
    .eq('user_id', userId)
    .is('deleted_at', null)
    .select()
    .single();

  if (error) {
    console.error('Error updating analysis:', error);
    throw error;
  }

  return result;
};

export const softDeleteAnalysis = async (analysisId: string, userId: string) => {
  const { data, error } = await supabase
    .from('salary_analyses')
    .update({
      deleted_at: new Date().toISOString()
    })
    .eq('id', analysisId)
    .eq('user_id', userId)
    .is('deleted_at', null)
    .select()
    .single();

  if (error) {
    console.error('Error deleting analysis:', error);
    throw error;
  }

  return data;
};

export const restoreAnalysis = async (analysisId: string, userId: string) => {
  const { data, error } = await supabase
    .from('salary_analyses')
    .update({
      deleted_at: null
    })
    .eq('id', analysisId)
    .eq('user_id', userId)
    .not('deleted_at', 'is', null)
    .select()
    .single();

  if (error) {
    console.error('Error restoring analysis:', error);
    throw error;
  }

  return data;
};

export const getUserAnalyses = async (userId: string) => {
  const { data, error } = await supabase
    .from('salary_analyses')
    .select('*')
    .eq('user_id', userId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching analyses:', error);
    throw error;
  }

  return data || [];
};
