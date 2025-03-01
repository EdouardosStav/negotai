
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
        toast({
          title: "Successfully signed in",
          description: "Welcome back!",
          variant: "default",
        });
        sonnerToast.success("Successfully signed in", {
          description: "Welcome back!"
        });
        
        // If user is coming from a specific page, redirect them back
        const redirectPath = sessionStorage.getItem('redirectAfterAuth');
        if (redirectPath) {
          sessionStorage.removeItem('redirectAfterAuth');
          navigate(redirectPath);
        } else {
          navigate('/dashboard');
        }
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
  }, [toast, navigate]);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
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

  // Sign out
  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out",
        variant: "destructive",
      });
      sonnerToast.error("Sign out failed", {
        description: error.message || "An error occurred during sign out"
      });
      console.error('Error signing out:', error);
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
