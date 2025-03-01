
import { Loader2 } from "lucide-react";
import { ProfileForm } from "./profile/ProfileForm";
import { ProfileSettingsProps } from "./profile/types";

const ProfileSettings = ({ profile, isLoading, userId }: ProfileSettingsProps) => {
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
      <ProfileForm profile={profile} userId={userId} />
    </div>
  );
};

export default ProfileSettings;
