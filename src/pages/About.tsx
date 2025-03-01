import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
const About = () => {
  useEffect(() => {
    // Update page title
    document.title = "About - NegotAI";

    // Scroll to top on page load
    window.scrollTo(0, 0);

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
      document.head.removeChild(style);
    };
  }, []);
  return <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="section-heading text-center mb-6 py-[7px]">About NegotAI</h1>
          <p className="section-subheading text-center mb-16">
            Empowering professionals to get the salary they deserve
          </p>
          
          {/* Our Story Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="glass-card p-8 rounded-xl">
              <p className="text-white/80 mb-4 leading-relaxed">
                NegotAI was founded in 2023 by a team of AI engineers, data scientists, and HR professionals who recognized a significant problem: most people lack the data, confidence, and strategies needed to effectively negotiate their salaries.
              </p>
              <p className="text-white/80 mb-4 leading-relaxed">
                After seeing friends and colleagues consistently undersell their value in the job market, our founders decided to build an AI-powered solution that would level the playing field in salary negotiations.
              </p>
              <p className="text-white/80 leading-relaxed">
                Today, NegotAI combines machine learning, real-time market data, and negotiation psychology to help professionals across industries secure better compensation packages and advance their careers.
              </p>
            </div>
          </div>
          
          {/* Our Mission Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <div className="glass-card p-8 rounded-xl">
              <p className="text-white/80 mb-6 leading-relaxed">
                At NegotAI, our mission is to eliminate salary inequality by empowering professionals with data-driven insights and AI-powered negotiation strategies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">Empower</h3>
                  <p className="text-white/70">
                    We believe everyone deserves to be paid fairly for their skills and experience, regardless of their negotiation abilities.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">Educate</h3>
                  <p className="text-white/70">
                    We're committed to teaching professionals the art and science of effective salary negotiation.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">Equalize</h3>
                  <p className="text-white/70">
                    We work to close compensation gaps by providing transparent market data and negotiation support.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">Elevate</h3>
                  <p className="text-white/70">
                    We help professionals advance their careers by securing compensation packages that reflect their true value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default About;