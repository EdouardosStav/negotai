
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
    
    // Clean up
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function(e) {});
      });
      document.head.removeChild(style);
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
        <div id="analyze">
          <SalaryAnalysis />
        </div>
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
