import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import Index from "./pages/Index";
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
  const location = useLocation();
  
  if (isLoading) {
    // Show loading state or minimal fallback
    return <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-cyan border-t-transparent rounded-full"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    // Use the location state to remember where the user was trying to go
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
  }
  
  return <>{children}</>;
};

// Handle navigation and scrolling
const ScrollToSection = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Handle hash navigation (e.g., /#analyze)
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    
    // Handle scrollToAnalysis flag from session storage
    const shouldScrollToAnalysis = sessionStorage.getItem('scrollToAnalysis') === 'true';
    if (shouldScrollToAnalysis && location.pathname === '/') {
      sessionStorage.removeItem('scrollToAnalysis');
      const analysisSection = document.getElementById('analyze');
      if (analysisSection) {
        setTimeout(() => {
          analysisSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);
  
  return null;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToSection />
      <Routes>
        <Route path="/" element={<Index />} />
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
    </>
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
