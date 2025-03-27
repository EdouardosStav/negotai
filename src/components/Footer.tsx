import { useState } from "react";
import { Mail, Github, Twitter, Linkedin, Heart } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ContactModal from "./ContactModal";
const Footer = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToSection = (sectionId: string) => {
    // Check if we're on the home page
    if (location.pathname !== '/') {
      // If not, navigate to home and then scroll after page loads
      navigate('/', {
        state: {
          scrollTo: sectionId
        }
      });
      return;
    }
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const handleLegalClick = (section: string) => {
    navigate('/legal', {
      state: {
        section
      }
    });
  };
  return <>
      <footer className="pt-16 pb-8 relative" id="contact">
        {/* Background elements - adding pointer-events-none to fix clickable area */}
        <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Column 1 - Brand */}
            <div>
              <div className="flex items-center mb-6">
                <span className="text-lg font-bold text-white">NegotAI</span>
              </div>
              <p className="text-white/70 text-sm mb-6">
                AI-powered salary insights and negotiation strategies tailored to your skills and experience.
              </p>
              <div className="flex space-x-4">
                <a href="https://twitter.com/negotiai" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all" aria-label="Twitter">
                  <Twitter size={16} className="text-white" />
                </a>
                <a href="https://linkedin.com/company/negotiai" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all" aria-label="LinkedIn">
                  <Linkedin size={16} className="text-white" />
                </a>
                <a href="https://github.com/negotiai" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all" aria-label="GitHub">
                  <Github size={16} className="text-white" />
                </a>
                
              </div>
            </div>
            
            {/* Column 2 - Company */}
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link>
                </li>
                <li>
                  <button onClick={() => setIsContactModalOpen(true)} className="text-white/70 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Column 3 - Resources */}
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/negotiation-guide" className="text-white/70 hover:text-white transition-colors">Negotiation Guide</Link>
                </li>
                <li>
                  <button onClick={() => scrollToSection("testimonials")} className="text-white/70 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">
                    Success Stories
                  </button>
                </li>
                <li>
                  <Link to="/faq" className="text-white/70 hover:text-white transition-colors">FAQ</Link>
                </li>
              </ul>
            </div>
            
            {/* Column 4 - Legal */}
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => handleLegalClick("terms")} className="text-white/70 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLegalClick("privacy")} className="text-white/70 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLegalClick("cookies")} className="text-white/70 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLegalClick("gdpr")} className="text-white/70 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">
                    GDPR
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm">
              © {currentYear} NegotAI. All rights reserved.
            </p>
            
          </div>
        </div>
      </footer>
      
      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>;
};
export default Footer;