
import { useState, useEffect } from "react";
import { getUserAnalyses } from "@/services/analysisService";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];
type User = {
  id: string;
} | null;

export const useSalaryAnalyses = (user: User) => {
  const [analyses, setAnalyses] = useState<SalaryAnalysis[]>([]);
  const [isLoadingAnalyses, setIsLoadingAnalyses] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setIsLoadingAnalyses(false);
      return;
    }

    const fetchAnalyses = async () => {
      try {
        setIsLoadingAnalyses(true);
        const data = await getUserAnalyses(user.id);
        setAnalyses(data);
      } catch (error) {
        console.error('Error fetching analyses:', error);
        toast.error('Failed to load salary analyses');
      } finally {
        setIsLoadingAnalyses(false);
      }
    };

    fetchAnalyses();
  }, [user]);

  return { 
    analyses, 
    setAnalyses, 
    isLoadingAnalyses, 
    isUpdatingStatus, 
    setIsUpdatingStatus,
    selectedAnalysisId, 
    setSelectedAnalysisId 
  };
};
