
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ChevronRight, ClipboardCheck, User, BriefcaseIcon, MapPinIcon, GraduationCapIcon, BarChart4, Calendar, Loader2 } from "lucide-react";
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
}

interface Profile {
  id: string;
  job_title: string | null;
  experience_level: string | null;
  industry: string | null;
  location: string | null;
  employment_type: string | null;
}

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState<SalaryAnalysis[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingAnalyses, setIsLoadingAnalyses] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);

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
        const { data, error } = await supabase
          .from('salary_analyses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAnalyses(data || []);
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

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !user) return;

    try {
      setIsUpdatingProfile(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          job_title: profile.job_title,
          experience_level: profile.experience_level,
          industry: profile.industry,
          location: profile.location,
          employment_type: profile.employment_type,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const updateNegotiationStatus = async (analysisId: string, status: string) => {
    if (!user) return;
    
    try {
      setIsUpdatingStatus(true);
      setSelectedAnalysisId(analysisId);
      
      const { error } = await supabase
        .from('salary_analyses')
        .update({
          negotiation_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', analysisId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Update local state
      setAnalyses(analyses.map(analysis => 
        analysis.id === analysisId 
          ? { ...analysis, negotiation_status: status } 
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

  const handleProfileChange = (field: keyof Profile, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
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
              <div className="mb-6">
                <Button 
                  onClick={() => navigate('/#analyze')} 
                  className="bg-cyan hover:bg-cyan/80 text-white"
                >
                  Create New Analysis
                </Button>
              </div>
              
              {isLoadingAnalyses ? (
                <div className="flex justify-center my-12">
                  <Loader2 className="h-8 w-8 text-cyan animate-spin" />
                </div>
              ) : analyses.length === 0 ? (
                <div className="glass-card p-8 rounded-xl text-center">
                  <BarChart4 className="h-12 w-12 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No salary analyses yet</h3>
                  <p className="text-white/70 mb-6">Get started by analyzing your first job offer</p>
                  <Button 
                    onClick={() => navigate('/#analyze')} 
                    className="bg-cyan hover:bg-cyan/80 text-white"
                  >
                    Analyze an Offer
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {analyses.map((analysis) => (
                    <Card key={analysis.id} className="glass-card border-0 overflow-hidden">
                      <CardHeader className="relative">
                        <div className="absolute top-4 right-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            analysis.negotiation_status === 'Offer Accepted' ? 'bg-success/20 text-success' :
                            analysis.negotiation_status === 'Negotiation Failed' ? 'bg-destructive/20 text-destructive' :
                            analysis.negotiation_status === 'Counteroffer Sent' ? 'bg-amber-500/20 text-amber-500' :
                            'bg-white/10 text-white/80'
                          }`}>
                            {analysis.negotiation_status}
                          </div>
                        </div>
                        <CardTitle className="text-white text-xl">{analysis.job_title}</CardTitle>
                        <CardDescription className="text-white/70">
                          {analysis.company_name ? `${analysis.company_name} • ` : ''}
                          {analysis.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/5 p-3 rounded-lg">
                            <div className="text-white/60 text-xs mb-1">Offered Salary</div>
                            <div className="text-white font-semibold">{formatCurrency(analysis.offered_salary)}</div>
                          </div>
                          {analysis.suggested_counteroffer && (
                            <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                              <div className="text-white/60 text-xs mb-1">Suggested Counter</div>
                              <div className="text-gradient font-semibold">{formatCurrency(analysis.suggested_counteroffer)}</div>
                            </div>
                          )}
                        </div>
                        
                        {analysis.fairness_score !== null && (
                          <div className="pt-2">
                            <div className="flex justify-between mb-2">
                              <span className="text-white/70 text-sm">Fairness Score</span>
                              <span className={`text-sm font-medium ${
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
                          </div>
                        )}
                        
                        <div className="flex items-center text-white/70 text-xs mt-2">
                          <Calendar size={14} className="mr-1" />
                          Created {formatDate(analysis.created_at)}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-white/10 pt-4 flex flex-col gap-4">
                        <p className="text-white/80 text-sm font-medium mb-1">Update Status:</p>
                        <div className="grid grid-cols-2 gap-2 w-full">
                          <Select 
                            onValueChange={(value) => updateNegotiationStatus(analysis.id, value)}
                            defaultValue={analysis.negotiation_status}
                            disabled={isUpdatingStatus && selectedAnalysisId === analysis.id}
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
                          
                          <Button 
                            variant="outline" 
                            onClick={() => navigate(`/analysis/${analysis.id}`)}
                            className="border-white/10 text-white hover:bg-white/10"
                          >
                            View Details
                            <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="profile">
              <div className="glass-card p-8 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-6">Profile Information</h3>
                
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="job_title" className="text-sm font-medium text-white/80">
                        Current Job Title
                      </label>
                      <div className="relative">
                        <BriefcaseIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                        <Input
                          id="job_title"
                          placeholder="Software Engineer"
                          value={profile?.job_title || ''}
                          onChange={(e) => handleProfileChange('job_title', e.target.value)}
                          className="pl-10 bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="experience_level" className="text-sm font-medium text-white/80">
                        Experience Level
                      </label>
                      <div className="relative">
                        <GraduationCapIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                        <Select
                          value={profile?.experience_level || ''}
                          onValueChange={(value) => handleProfileChange('experience_level', value)}
                        >
                          <SelectTrigger className="pl-10 bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent className="bg-navy-dark border-white/10">
                            <SelectItem value="Entry Level">Entry Level</SelectItem>
                            <SelectItem value="Junior">Junior (1-2 years)</SelectItem>
                            <SelectItem value="Mid-Level">Mid-Level (3-5 years)</SelectItem>
                            <SelectItem value="Senior">Senior (6-10 years)</SelectItem>
                            <SelectItem value="Lead">Lead (10+ years)</SelectItem>
                            <SelectItem value="Executive">Executive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="industry" className="text-sm font-medium text-white/80">
                        Industry
                      </label>
                      <div className="relative">
                        <BriefcaseIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                        <Select
                          value={profile?.industry || ''}
                          onValueChange={(value) => handleProfileChange('industry', value)}
                        >
                          <SelectTrigger className="pl-10 bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent className="bg-navy-dark border-white/10">
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Consulting">Consulting</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="location" className="text-sm font-medium text-white/80">
                        Location
                      </label>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                        <Input
                          id="location"
                          placeholder="San Francisco, CA"
                          value={profile?.location || ''}
                          onChange={(e) => handleProfileChange('location', e.target.value)}
                          className="pl-10 bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="employment_type" className="text-sm font-medium text-white/80">
                        Employment Type
                      </label>
                      <div className="relative">
                        <ClipboardCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                        <Select
                          value={profile?.employment_type || ''}
                          onValueChange={(value) => handleProfileChange('employment_type', value)}
                        >
                          <SelectTrigger className="pl-10 bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                          <SelectContent className="bg-navy-dark border-white/10">
                            <SelectItem value="Full-Time">Full-Time</SelectItem>
                            <SelectItem value="Part-Time">Part-Time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Freelance">Freelance</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-cyan hover:bg-cyan/80 text-white"
                    disabled={isUpdatingProfile}
                  >
                    {isUpdatingProfile ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
