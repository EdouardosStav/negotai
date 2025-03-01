
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/negotiation-guide" element={<NegotiationGuide />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis/:id" element={<AnalysisDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
