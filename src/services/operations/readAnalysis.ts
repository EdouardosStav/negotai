
import { supabase } from "@/integrations/supabase/client";
import { handleSupabaseError } from "../utils/analysisUtils";

export const getSalaryAnalysisById = async (analysisId: string, userId: string) => {
  const { data, error } = await supabase
    .from('salary_analyses')
    .select('*')
    .eq('id', analysisId)
    .eq('user_id', userId)
    .is('deleted_at', null)
    .maybeSingle();

  if (error) {
    handleSupabaseError(error, 'fetching analysis');
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
    handleSupabaseError(error, 'fetching analyses');
  }

  return data || [];
};
