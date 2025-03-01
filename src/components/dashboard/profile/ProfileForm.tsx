
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  GraduationCapIcon, 
  ClipboardCheck, 
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProfileInputField, ProfileSelectField } from "./ProfileFormField";
import { Profile, ProfileFormProps } from "./types";

export const ProfileForm = ({ profile, userId }: ProfileFormProps) => {
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

  return (
    <form onSubmit={handleProfileUpdate} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileInputField
          id="job_title"
          icon={<BriefcaseIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />}
          placeholder="Current Job Title"
          value={profileState?.job_title || ''}
          onChange={(value) => handleProfileChange('job_title', value)}
        />
        
        <ProfileSelectField
          id="experience_level"
          icon={<GraduationCapIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />}
          placeholder="Experience Level"
          value={profileState?.experience_level || ''}
          onChange={(value) => handleProfileChange('experience_level', value)}
          options={[
            { value: "Entry Level", label: "Entry Level" },
            { value: "Junior", label: "Junior (1-2 years)" },
            { value: "Mid-Level", label: "Mid-Level (3-5 years)" },
            { value: "Senior", label: "Senior (6-10 years)" },
            { value: "Lead", label: "Lead (10+ years)" },
            { value: "Executive", label: "Executive" }
          ]}
        />
        
        <ProfileSelectField
          id="industry"
          icon={<BriefcaseIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />}
          placeholder="Industry"
          value={profileState?.industry || ''}
          onChange={(value) => handleProfileChange('industry', value)}
          options={[
            { value: "Technology", label: "Technology" },
            { value: "Finance", label: "Finance" },
            { value: "Healthcare", label: "Healthcare" },
            { value: "Education", label: "Education" },
            { value: "Manufacturing", label: "Manufacturing" },
            { value: "Retail", label: "Retail" },
            { value: "Marketing", label: "Marketing" },
            { value: "Consulting", label: "Consulting" },
            { value: "Other", label: "Other" }
          ]}
        />
        
        <ProfileInputField
          id="location"
          icon={<MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />}
          placeholder="Location"
          value={profileState?.location || ''}
          onChange={(value) => handleProfileChange('location', value)}
        />
        
        <ProfileSelectField
          id="employment_type"
          icon={<ClipboardCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />}
          placeholder="Employment Type"
          value={profileState?.employment_type || ''}
          onChange={(value) => handleProfileChange('employment_type', value)}
          options={[
            { value: "Full-Time", label: "Full-Time" },
            { value: "Part-Time", label: "Part-Time" },
            { value: "Contract", label: "Contract" },
            { value: "Freelance", label: "Freelance" },
            { value: "Internship", label: "Internship" }
          ]}
        />
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
  );
};
