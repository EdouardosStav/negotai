
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { getUserAnalyses, updateNegotiationStatus } from "@/services/analysisService";
import EditAnalysisModal from "@/components/EditAnalysisModal";
import DeleteAnalysisModal from "@/components/DeleteAnalysisModal";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardLoader from "@/components/dashboard/DashboardLoader";
import AnalysesList from "@/components/dashboard/AnalysesList";
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import { useProfileData } from "@/hooks/useProfileData";
import { useSalaryAnalyses } from "@/hooks/useSalaryAnalyses";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  // Use custom hooks for data fetching
  const { profile, isLoadingProfile } = useProfileData(user);
  const { 
    analyses, 
    isLoadingAnalyses, 
    setAnalyses, 
    isUpdatingStatus, 
    setIsUpdatingStatus,
    selectedAnalysisId, 
    setSelectedAnalysisId 
  } = useSalaryAnalyses(user);
  
  // State for edit/delete modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<SalaryAnalysis | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !authLoading) {
      navigate('/auth');
    }
  }, [user, navigate, authLoading]);

  const handleStatusUpdate = async (analysisId: string, status: string) => {
    if (!user) return;
    
    try {
      setIsUpdatingStatus(true);
      setSelectedAnalysisId(analysisId);
      
      const updatedAnalysis = await updateNegotiationStatus(analysisId, user.id, status);
      
      // Update local state
      setAnalyses(analyses.map(analysis => 
        analysis.id === analysisId 
          ? updatedAnalysis 
          : analysis
      ));
      
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setIsUpdatingStatus(false);
      setSelectedAnalysisId(null);
    }
  };

  // Open edit modal for a specific analysis
  const handleEditAnalysis = (analysis: SalaryAnalysis) => {
    setSelectedAnalysis(analysis);
    setEditModalOpen(true);
  };
  
  // Open delete modal for a specific analysis
  const handleDeleteAnalysis = (analysis: SalaryAnalysis) => {
    setSelectedAnalysis(analysis);
    setDeleteModalOpen(true);
  };
  
  // Handle successful edit
  const handleEditSuccess = (updatedAnalysis: SalaryAnalysis) => {
    setAnalyses(analyses.map(analysis => 
      analysis.id === updatedAnalysis.id 
        ? updatedAnalysis 
        : analysis
    ));
  };
  
  // Handle successful delete
  const handleDeleteSuccess = (analysisId: string) => {
    setAnalyses(analyses.filter(analysis => analysis.id !== analysisId));
  };
  
  // Handle create new analysis click
  const handleCreateNewAnalysis = () => {
    // Set flag to scroll to analysis section after navigation
    sessionStorage.setItem('scrollToAnalysis', 'true');
    navigate('/#analyze');
  };

  if (authLoading || isLoadingProfile) {
    return <DashboardLoader />;
  }

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <DashboardHeader />
          
          <Tabs defaultValue="analyses" className="w-full">
            <TabsList className="w-full max-w-md mb-8">
              <TabsTrigger value="analyses" className="flex-1">Salary Analyses</TabsTrigger>
              <TabsTrigger value="profile" className="flex-1">Profile Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analyses">
              <AnalysesList 
                analyses={analyses}
                isLoading={isLoadingAnalyses}
                onStatusUpdate={handleStatusUpdate}
                onEdit={handleEditAnalysis}
                onDelete={handleDeleteAnalysis}
                onCreateNew={handleCreateNewAnalysis}
                isUpdatingStatus={isUpdatingStatus}
                selectedAnalysisId={selectedAnalysisId}
              />
            </TabsContent>
            
            <TabsContent value="profile">
              <ProfileSettings 
                profile={profile}
                isLoading={isLoadingProfile}
                userId={user?.id || ''}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Modals */}
      <EditAnalysisModal 
        analysis={selectedAnalysis}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={handleEditSuccess}
      />
      
      <DeleteAnalysisModal
        analysis={selectedAnalysis}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onSuccess={handleDeleteSuccess}
      />
      
      <Footer />
    </div>
  );
};

export default Dashboard;
