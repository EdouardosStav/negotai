
import React, { createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthOperations } from '@/hooks/useAuthOperations';

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
  const { 
    signIn, 
    signUp, 
    signOut, 
    isLoading: operationsLoading,
    isManualSignIn,
    setIsManualSignIn
  } = useAuthOperations();
  
  const { 
    session, 
    user, 
    isLoading: stateLoading, 
    isAuthenticated 
  } = useAuthState({ 
    isManualSignIn, 
    setIsManualSignIn 
  });

  // Combine loading states
  const isLoading = stateLoading || operationsLoading;

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
