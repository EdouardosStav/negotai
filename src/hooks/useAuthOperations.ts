
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAuthOperations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isManualSignIn, setIsManualSignIn] = useState(false);
  const navigate = useNavigate();

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setIsManualSignIn(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast.error("Sign in failed", {
        description: error.message || "An error occurred during sign in"
      });
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setIsManualSignIn(true);
      const { error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        throw error;
      }
      
      toast.success("Sign up successful", {
        description: "Check your email for the confirmation link"
      });
    } catch (error: any) {
      toast.error("Sign up failed", {
        description: error.message || "An error occurred during sign up"
      });
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out - improved with better error handling
  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Try to get the current session first
      const { data: { session } } = await supabase.auth.getSession();
      
      // Only attempt sign out if we have a valid session
      if (session) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } else {
        // If no session, show feedback and redirect
        toast.success("Signed out");
        navigate('/');
      }
    } catch (error: any) {
      console.error('Error signing out:', error);
      
      // Still provide feedback and redirect on error
      toast.success("Signed out");
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    isLoading,
    isManualSignIn,
    setIsManualSignIn,
  };
};
