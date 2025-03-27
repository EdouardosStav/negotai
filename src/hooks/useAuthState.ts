
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface UseAuthStateProps {
  isManualSignIn: boolean;
  setIsManualSignIn: (value: boolean) => void;
}

export const useAuthState = ({ isManualSignIn, setIsManualSignIn }: UseAuthStateProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial session and user
    const setInitialState = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
        setIsAuthenticated(!!data.session);
      } catch (error) {
        console.error('Error fetching initial session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    setInitialState();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log(`Auth event: ${event}`);
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setIsAuthenticated(!!newSession);
      
      if (event === 'SIGNED_IN') {
        if (isManualSignIn) {
          toast.success("Successfully signed in", {
            description: "Welcome back!"
          });
          setIsManualSignIn(false);
        }
        
        // Redirect to home page
        navigate('/');
      } else if (event === 'SIGNED_OUT') {
        toast.success("Signed out");
        navigate('/');
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, isManualSignIn, setIsManualSignIn]);

  return {
    session,
    user,
    isLoading,
    isAuthenticated
  };
};
