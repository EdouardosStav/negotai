
import { supabase } from "@/integrations/supabase/client";
import { SalaryAnalysisInput } from "../types/analysisTypes";
import { mapInputToDbFields, handleSupabaseError } from "../utils/analysisUtils";

export const updateSalaryAnalysis = async (
  analysisId: string,
  userId: string,
  data: Partial<SalaryAnalysisInput>
) => {
  // Convert input to database field names
  let updateData = mapInputToDbFields(data);
  
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
    handleSupabaseError(error, 'updating analysis');
  }

  return result;
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
    handleSupabaseError(error, 'updating status');
  }

  return data;
};
