
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getSalaryAnalysisById, updateNegotiationStatus } from "@/services/analysisService";
import { 
  ChevronLeft, 
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EditAnalysisModal from "@/components/EditAnalysisModal";
import DeleteAnalysisModal from "@/components/DeleteAnalysisModal";
import { Database } from "@/integrations/supabase/client";
import AnalysisHeader from "@/components/analysis/AnalysisHeader";
import BasicInfo from "@/components/analysis/BasicInfo";
import SalaryInfo from "@/components/analysis/SalaryInfo";
import AnalysisResults from "@/components/analysis/AnalysisResults";
import BenefitsPackage from "@/components/analysis/BenefitsPackage";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

const AnalysisDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<SalaryAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  
  // State for modals
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

  // Handle edit button click
  const handleEdit = () => {
    setEditModalOpen(true);
  };
  
  // Handle delete button click
  const handleDelete = () => {
    setDeleteModalOpen(true);
  };
  
  // Handle successful edit
  const handleEditSuccess = (updatedAnalysis: SalaryAnalysis) => {
    setAnalysis(updatedAnalysis);
    toast.success("Analysis updated successfully");
  };
  
  // Handle successful delete
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
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-cyan animate-spin mb-4" />
          <p className="text-white">Loading analysis...</p>
        </div>
      </div>
    );
  }
  
  if (!analysis) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="flex flex-col items-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <p className="text-white text-xl font-bold mb-2">Analysis Not Found</p>
          <p className="text-white/70 mb-6">We couldn't find the requested analysis</p>
          <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/dashboard" className="text-white inline-flex items-center hover:text-cyan transition-colors">
              <ChevronLeft size={16} className="mr-1" />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-8 border-b border-white/10">
                <AnalysisHeader 
                  analysis={analysis} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
                
                <BasicInfo analysis={analysis} formatDate={formatDate} />
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <SalaryInfo analysis={analysis} formatCurrency={formatCurrency} />
                  
                  <AnalysisResults 
                    analysis={analysis} 
                    isUpdatingStatus={isUpdatingStatus} 
                    onStatusChange={handleStatusChange} 
                  />
                </div>
                
                <BenefitsPackage benefitsPackage={analysis.benefits_package} />
                
                <div className="text-center mt-10">
                  <Button 
                    onClick={() => navigate('/#analyze')} 
                    className="bg-cyan hover:bg-cyan/80 text-white"
                  >
                    Create New Analysis
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Modals */}
      <EditAnalysisModal 
        analysis={analysis}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={handleEditSuccess}
      />
      
      <DeleteAnalysisModal
        analysis={analysis}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onSuccess={handleDeleteSuccess}
      />
      
      <Footer />
    </div>
  );
};

export default AnalysisDetail;
