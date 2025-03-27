
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { toast as sonnerToast } from 'sonner';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isManualSignIn, setIsManualSignIn] = useState(false);
  const { toast } = useToast();
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
          toast({
            title: "Successfully signed in",
            description: "Welcome back!",
            variant: "default",
          });
          sonnerToast.success("Successfully signed in", {
            description: "Welcome back!"
          });
          setIsManualSignIn(false);
        }
        
        // Redirect to home page instead of dashboard
        navigate('/');
      } else if (event === 'SIGNED_OUT') {
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
          variant: "default",
        });
        sonnerToast.success("Signed out");
        navigate('/');
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [toast, navigate, isManualSignIn]);

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
      toast({
        title: "Sign in failed",
        description: error.message || "An error occurred during sign in",
        variant: "destructive",
      });
      sonnerToast.error("Sign in failed", {
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
      
      toast({
        title: "Sign up successful",
        description: "Check your email for the confirmation link",
        variant: "default",
      });
      sonnerToast.success("Sign up successful", {
        description: "Check your email for the confirmation link"
      });
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred during sign up",
        variant: "destructive",
      });
      sonnerToast.error("Sign up failed", {
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
      
      // Only attempt sign out if we have a valid session
      if (session) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } else {
        // If no session, just clear the local state
        setSession(null);
        setUser(null);
        setIsAuthenticated(false);
        
        // Show success toast anyway to provide feedback
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
          variant: "default",
        });
        sonnerToast.success("Signed out");
        navigate('/');
      }
    } catch (error: any) {
      console.error('Error signing out:', error);
      
      // Still reset auth state on error
      setSession(null);
      setUser(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Sign out issue",
        description: "You've been signed out, but there was a technical issue.",
        variant: "default",
      });
      sonnerToast.success("Signed out");
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    session,
    user,
    isLoading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
