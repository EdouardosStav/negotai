
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import EditAnalysisModal from "@/components/EditAnalysisModal";
import DeleteAnalysisModal from "@/components/DeleteAnalysisModal";
import { getUserAnalyses, updateNegotiationStatus } from "@/services/analysisService";
import { Database } from "@/integrations/supabase/client";
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import AnalysesList from "@/components/dashboard/AnalysesList";
import { toast } from "sonner";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState<SalaryAnalysis[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingAnalyses, setIsLoadingAnalyses] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);
  
  // State for edit/delete modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<SalaryAnalysis | null>(null);

  // Fetch user profile and analyses
  useEffect(() => {
    if (!user) {
      if (!authLoading) {
        navigate('/auth');
      }
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setIsLoadingProfile(false);
      }
    };

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

    fetchProfile();
    fetchAnalyses();
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
    if (window.location.pathname === '/') {
      // If on home page, scroll to analysis section
      const analysisSection = document.getElementById('analyze');
      if (analysisSection) {
        analysisSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on home page, navigate to home and set flag to scroll
      sessionStorage.setItem('scrollToAnalysis', 'true');
      navigate('/#analyze');
    }
  };

  if (authLoading || isLoadingProfile) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-cyan animate-spin mb-4" />
          <p className="text-white">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Your Dashboard</h1>
          <p className="text-white/70 mb-8">Manage your profile and salary negotiations</p>
          
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
