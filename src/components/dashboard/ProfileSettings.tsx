
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  GraduationCapIcon, 
  ClipboardCheck, 
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/client";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileSettingsProps {
  profile: Profile | null;
  isLoading: boolean;
  userId: string;
}

const ProfileSettings = ({ profile, isLoading, userId }: ProfileSettingsProps) => {
  const [profileState, setProfileState] = useState<Profile | null>(profile);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileState || !userId) return;

    try {
      setIsUpdatingProfile(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          job_title: profileState.job_title,
          experience_level: profileState.experience_level,
          industry: profileState.industry,
          location: profileState.location,
          employment_type: profileState.employment_type,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleProfileChange = (field: keyof Profile, value: string) => {
    if (!profileState) return;
    setProfileState({ ...profileState, [field]: value });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-12">
        <Loader2 className="h-8 w-8 text-cyan animate-spin" />
      </div>
    );
  }

  return (
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
                value={profileState?.job_title || ''}
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
                value={profileState?.experience_level || ''}
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
                value={profileState?.industry || ''}
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
                value={profileState?.location || ''}
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
                value={profileState?.employment_type || ''}
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
  );
};

export default ProfileSettings;
