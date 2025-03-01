
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { softDeleteAnalysis } from "@/services/analysisService";
import { useAuth } from "@/context/AuthContext";
import { Database } from "@/integrations/supabase/client";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

interface DeleteAnalysisModalProps {
  analysis: SalaryAnalysis | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (analysisId: string) => void;
}

const DeleteAnalysisModal: React.FC<DeleteAnalysisModalProps> = ({
  analysis,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!user || !analysis) return;
    
    try {
      setIsDeleting(true);
      await softDeleteAnalysis(analysis.id, user.id);
      
      toast.success("Analysis deleted successfully");
      onSuccess(analysis.id);
    } catch (error: any) {
      console.error("Error deleting analysis:", error);
      toast.error("Failed to delete analysis", {
        description: error.message || "Please try again later"
      });
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="glass-card border-0">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Delete Salary Analysis</AlertDialogTitle>
          <AlertDialogDescription className="text-white/70">
            Are you sure you want to delete this salary analysis? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-6">
          <AlertDialogCancel 
            className="border-white/10 text-white hover:bg-white/10"
            disabled={isDeleting}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-destructive hover:bg-destructive/80 text-destructive-foreground"
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAnalysisModal;
