
import { createClient } from '@supabase/supabase-js';

// Define database schema
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          job_title: string | null;
          experience_level: string | null;
          industry: string | null;
          location: string | null;
          employment_type: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          job_title?: string | null;
          experience_level?: string | null;
          industry?: string | null;
          location?: string | null;
          employment_type?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          job_title?: string | null;
          experience_level?: string | null;
          industry?: string | null;
          location?: string | null;
          employment_type?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      salary_analyses: {
        Row: {
          id: string;
          user_id: string;
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
        };
        Insert: {
          id?: string;
          user_id: string;
          job_title: string;
          company_name?: string | null;
          job_level?: string | null;
          employment_type: string;
          experience: string;
          location: string;
          offered_salary: number;
          benefits_package?: string | null;
          fairness_score?: number | null;
          suggested_counteroffer?: number | null;
          negotiation_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          job_title?: string;
          company_name?: string | null;
          job_level?: string | null;
          employment_type?: string;
          experience?: string;
          location?: string;
          offered_salary?: number;
          benefits_package?: string | null;
          fairness_score?: number | null;
          suggested_counteroffer?: number | null;
          negotiation_status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};

const SUPABASE_URL = "https://wdrdyvyzrxrzmotarpzp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcmR5dnl6cnhyem1vdGFycHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MTkxMDQsImV4cCI6MjA1NjM5NTEwNH0.fnVUAn5CxuVcfjLjZ218aier4-hi-E8qu_6trk8mmtI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
