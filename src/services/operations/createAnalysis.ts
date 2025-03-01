
import { supabase } from "@/integrations/supabase/client";
import { SalaryAnalysisInput, AnalysisMeta } from "../types/analysisTypes";
import { handleSupabaseError } from "../utils/analysisUtils";

export const saveSalaryAnalysis = async (
  userId: string, 
  data: SalaryAnalysisInput, 
  analysisMeta: AnalysisMeta
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
    handleSupabaseError(error, 'saving analysis');
  }

  return result;
};
