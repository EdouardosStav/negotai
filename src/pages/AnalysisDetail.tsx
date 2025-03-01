
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getSalaryAnalysisById, updateNegotiationStatus } from "@/services/analysisService";
import { 
  DollarSign, 
  Building, 
  Gift, 
  Award, 
  Clock, 
  MapPin, 
  Briefcase, 
  ChevronLeft, 
  Calendar, 
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SalaryAnalysis {
  id: string;
  job_title: string;
  company_name: string | null;
  job_level: string | null;
  employment_type: string;
  experience: string;
  location: string;
  offered_salary: number;
  benefits_package: string | null;
  fairness_score: number | null;
  suggested_counteroffer: number | null;
  negotiation_status: string;
  created_at: string;
  updated_at: string;
}

const AnalysisDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<SalaryAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  
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
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Offer Accepted':
        return <CheckCircle2 className="text-success" size={18} />;
      case 'Negotiation Failed':
        return <XCircle className="text-destructive" size={18} />;
      case 'Counteroffer Sent':
        return <AlertCircle className="text-amber-500" size={18} />;
      default:
        return <Clock className="text-white/70" size={18} />;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Offer Accepted':
        return 'bg-success/20 text-success';
      case 'Negotiation Failed':
        return 'bg-destructive/20 text-destructive';
      case 'Counteroffer Sent':
        return 'bg-amber-500/20 text-amber-500';
      default:
        return 'bg-white/10 text-white/80';
    }
  };

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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">{analysis.job_title}</h1>
                    {analysis.company_name && (
                      <div className="flex items-center text-white/70 mb-2">
                        <Building size={14} className="mr-1" />
                        {analysis.company_name}
                      </div>
                    )}
                  </div>
                  
                  <div className={`px-4 py-1.5 rounded-full text-sm font-medium mt-4 md:mt-0 flex items-center ${getStatusClass(analysis.negotiation_status)}`}>
                    {getStatusIcon(analysis.negotiation_status)}
                    <span className="ml-1.5">{analysis.negotiation_status}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-white/60 text-sm">Job Level</div>
                    <div className="text-white font-medium">{analysis.job_level || "Not specified"}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-white/60 text-sm">Employment Type</div>
                    <div className="text-white font-medium">{analysis.employment_type}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-white/60 text-sm">Experience</div>
                    <div className="text-white font-medium">{analysis.experience} years</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-white/60 text-sm">Location</div>
                    <div className="text-white font-medium flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {analysis.location}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-white/60 text-sm">Created</div>
                    <div className="text-white font-medium">
                      {formatDate(analysis.created_at)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-white/60 text-sm">Last Updated</div>
                    <div className="text-white font-medium">
                      {formatDate(analysis.updated_at)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white/5 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Salary Information</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="text-white/60 text-sm mb-1">Offered Salary</div>
                        <div className="text-white text-2xl font-bold">
                          {formatCurrency(analysis.offered_salary)}
                        </div>
                      </div>
                      
                      {analysis.suggested_counteroffer && (
                        <div>
                          <div className="text-white/60 text-sm mb-1">Suggested Counteroffer</div>
                          <div className="text-gradient text-2xl font-bold">
                            {formatCurrency(analysis.suggested_counteroffer)}
                          </div>
                          <div className="text-white/60 text-xs mt-1">
                            {Math.round((analysis.suggested_counteroffer / analysis.offered_salary - 1) * 100)}% increase
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Analysis Results</h3>
                    
                    {analysis.fairness_score !== null && (
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-white/70">Fairness Score</span>
                          <span className={`font-medium ${
                            analysis.fairness_score >= 70 ? 'text-success' :
                            analysis.fairness_score >= 40 ? 'text-amber-400' :
                            'text-destructive'
                          }`}>
                            {analysis.fairness_score}%
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              analysis.fairness_score >= 70 ? 'bg-gradient-to-r from-success/80 to-success' :
                              analysis.fairness_score >= 40 ? 'bg-gradient-to-r from-amber-500/80 to-amber-500' :
                              'bg-gradient-to-r from-destructive/80 to-destructive'
                            }`}
                            style={{ width: `${analysis.fairness_score}%` }}
                          ></div>
                        </div>
                        <div className="text-white/60 text-xs mt-2">
                          {analysis.fairness_score >= 70 
                            ? "Your offer is above market value. Strong position for acceptance." 
                            : analysis.fairness_score >= 40 
                              ? "Your offer is near market value. Consider negotiating key points."
                              : "Your offer is below market value. Strong position for negotiation."}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <div className="text-white/60 text-sm mb-2">Negotiation Status:</div>
                      <Select 
                        value={analysis.negotiation_status} 
                        onValueChange={handleStatusChange}
                        disabled={isUpdatingStatus}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent className="bg-navy-dark border-white/10">
                          <SelectItem value="Awaiting Response">Awaiting Response</SelectItem>
                          <SelectItem value="Counteroffer Sent">Counteroffer Sent</SelectItem>
                          <SelectItem value="Offer Accepted">Offer Accepted</SelectItem>
                          <SelectItem value="Negotiation Failed">Negotiation Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                {analysis.benefits_package && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Benefits Package</h3>
                    <div className="bg-white/5 p-6 rounded-lg">
                      <div className="text-white/80 whitespace-pre-wrap">
                        {analysis.benefits_package}
                      </div>
                    </div>
                  </div>
                )}
                
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
      <Footer />
    </div>
  );
};

export default AnalysisDetail;
