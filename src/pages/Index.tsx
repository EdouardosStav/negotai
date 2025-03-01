
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import SalaryAnalysis from "../components/SalaryAnalysis";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Index = () => {
  useEffect(() => {
    // Update page title
    document.title = "NegotAI - AI-Powered Salary Negotiation";
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Clean up event listeners
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function(e) {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <Features />
        <SalaryAnalysis />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
