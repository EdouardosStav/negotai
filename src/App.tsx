
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import NegotiationGuide from "./pages/NegotiationGuide";
import FAQ from "./pages/FAQ";
import Legal from "./pages/Legal";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AnalysisDetail from "./pages/AnalysisDetail";
import { FC, ReactNode } from "react";

const queryClient = new QueryClient();

// Protected route component
interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, redirectPath = '/auth' }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    // Show loading state or minimal fallback
    return <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-cyan border-t-transparent rounded-full"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/negotiation-guide" element={<NegotiationGuide />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/analysis/:id" 
        element={
          <ProtectedRoute>
            <AnalysisDetail />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
