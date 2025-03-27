
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    
    // First set up the auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log(`Auth event: ${event}`);
      
      if (!mounted) return;
      
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setIsAuthenticated(!!newSession);
      
      if (event === 'SIGNED_IN') {
        if (isManualSignIn) {
          toast.success("Successfully signed in", {
            description: "Welcome back!"
          });
          setIsManualSignIn(false);
          
          // Only redirect to home if not already on a protected route
          const currentPath = location.pathname;
          if (currentPath === '/auth') {
            navigate('/');
          }
        }
      } else if (event === 'SIGNED_OUT') {
        toast.success("Signed out");
        navigate('/');
      }
    });

    // Then get the initial session
    const initializeAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        setSession(data.session);
        setUser(data.session?.user ?? null);
        setIsAuthenticated(!!data.session);
      } catch (error) {
        console.error('Error fetching initial session:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Cleanup subscription and mounted flag on unmount
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, isManualSignIn, setIsManualSignIn, location.pathname]);

  return {
    session,
    user,
    isLoading,
    isAuthenticated
  };
};
