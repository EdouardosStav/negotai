
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import SalaryAnalysis from "../components/SalaryAnalysis";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Index = () => {
  const location = useLocation();
  const initialized = useRef(false);

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
    
    // Add CSS to improve text rendering
    const style = document.createElement('style');
    style.textContent = `
      h1, h2, h3, h4, h5, h6 {
        letter-spacing: 0.01em;
        line-height: 1.3;
        text-rendering: optimizeLegibility;
      }
      p {
        letter-spacing: 0.005em;
        line-height: 1.6;
        text-rendering: optimizeLegibility;
      }
    `;
    document.head.appendChild(style);
    
    // Handle scrolling from other pages
    if ((location.state && location.state.scrollTo && !initialized.current) || 
        (location.hash === '#analyze') || 
        sessionStorage.getItem('scrollToAnalysis')) {
      
      const sectionId = location.state?.scrollTo || 'analyze';
      const section = document.getElementById(sectionId);
      
      if (section) {
        // Use setTimeout to ensure the DOM is fully loaded
        setTimeout(() => {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          initialized.current = true;
          // Clear the flag after scrolling
          sessionStorage.removeItem('scrollToAnalysis');
        }, 500);
      }
    }
    
    // Clean up
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function(e) {});
      });
      document.head.removeChild(style);
    };
  }, [location]);

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <Features />
        <div id="analyze">
          <SalaryAnalysis />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
