
import { supabase } from "@/integrations/supabase/client";
import { handleSupabaseError } from "../utils/analysisUtils";

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
    handleSupabaseError(error, 'deleting analysis');
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
    handleSupabaseError(error, 'restoring analysis');
  }

  return data;
};
