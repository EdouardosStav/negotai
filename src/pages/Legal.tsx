
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LegalTabsContainer from "../components/legal/LegalTabsContainer";

const Legal = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("terms");
  
  useEffect(() => {
    // Set page title
    document.title = "Legal Information - NegotAI";

    // Handle direct navigation to sections
    if (location.state && location.state.section) {
      setActiveTab(location.state.section);
    } else if (location.hash) {
      // Handle URL hash without state (e.g., /legal#privacy)
      const section = location.hash.substring(1);
      if (["terms", "privacy", "cookies", "gdpr"].includes(section)) {
        setActiveTab(section);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-12 text-center py-[7px]">Legal Information</h1>
        
        <LegalTabsContainer activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Legal;
