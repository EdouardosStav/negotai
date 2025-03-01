
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSalaryAnalysisById, updateNegotiationStatus } from "@/services/analysisService";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];
type User = {
  id: string;
} | null;

export const useAnalysisDetail = (id: string | undefined, user: User) => {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<SalaryAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    const fetchAnalysis = async () => {
      try {
        setIsLoading(true);
        if (!id) return;
        
        const data = await getSalaryAnalysisById(id, user.id);
        
        if (!data) {
          toast.error("Analysis not found");
          navigate('/dashboard');
          return;
        }
        
        setAnalysis(data);
      } catch (error) {
        console.error("Error fetching analysis:", error);
        toast.error("Failed to load analysis");
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalysis();
  }, [id, user, navigate]);
  
  const handleStatusChange = async (newStatus: string) => {
    if (!analysis || !user || !id) return;
    
    try {
      setIsUpdatingStatus(true);
      const updatedAnalysis = await updateNegotiationStatus(id, user.id, newStatus);
      setAnalysis(updatedAnalysis);
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };
  
  const handleDelete = () => {
    setDeleteModalOpen(true);
  };
  
  const handleEditSuccess = (updatedAnalysis: SalaryAnalysis) => {
    setAnalysis(updatedAnalysis);
    toast.success("Analysis updated successfully");
  };
  
  const handleDeleteSuccess = () => {
    toast.success("Analysis deleted successfully");
    navigate('/dashboard');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return {
    analysis,
    isLoading,
    isUpdatingStatus,
    editModalOpen,
    setEditModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    handleStatusChange,
    handleEdit,
    handleDelete,
    handleEditSuccess,
    handleDeleteSuccess,
    formatDate,
    formatCurrency
  };
};
