
import { Database } from "@/integrations/supabase/client";

export type Profile = Database['public']['Tables']['profiles']['Row'];

export interface ProfileFormProps {
  profile: Profile | null;
  userId: string;
}

export interface ProfileSettingsProps {
  profile: Profile | null;
  isLoading: boolean;
  userId: string;
}
