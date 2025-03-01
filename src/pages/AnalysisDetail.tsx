
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EditAnalysisModal from "@/components/EditAnalysisModal";
import DeleteAnalysisModal from "@/components/DeleteAnalysisModal";
import AnalysisDetailHeader from "@/components/analysis-detail/AnalysisDetailHeader";
import AnalysisDetailContent from "@/components/analysis-detail/AnalysisDetailContent";
import AnalysisDetailLoading from "@/components/analysis-detail/AnalysisDetailLoading";
import AnalysisDetailError from "@/components/analysis-detail/AnalysisDetailError";
import { useAnalysisDetail } from "@/hooks/useAnalysisDetail";

const AnalysisDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const {
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
  } = useAnalysisDetail(id, user);
  
  if (isLoading) {
    return <AnalysisDetailLoading />;
  }
  
  if (!analysis) {
    return <AnalysisDetailError />;
  }

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <AnalysisDetailHeader />
          
          <AnalysisDetailContent
            analysis={analysis}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            isUpdatingStatus={isUpdatingStatus}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
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
