
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
    .select()
    .single();

  if (error) {
    console.error('Error updating status:', error);
    throw error;
  }

  return data;
};
