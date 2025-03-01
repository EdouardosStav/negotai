
import { Mail, Github, Twitter, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="pt-16 pb-8 relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/99419d5b-f5a2-486a-b3a2-fb21fbd94693.png" 
                alt="NegotAI Logo" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-lg font-bold text-white">NegotAI</span>
            </div>
            <p className="text-white/70 text-sm mb-6">
              AI-powered salary insights and negotiation strategies tailored to your skills and experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all">
                <Twitter size={16} className="text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all">
                <Linkedin size={16} className="text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all">
                <Github size={16} className="text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all">
                <Mail size={16} className="text-white" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Company */}
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Press</a>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Resources */}
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Negotiation Guide</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Salary Data</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Success Stories</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Legal */}
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">GDPR</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © {currentYear} NegotAI. All rights reserved.
          </p>
          <p className="text-white/50 text-sm mt-4 md:mt-0 flex items-center">
            Crafted with <Heart size={14} className="text-primary mx-1" /> by the NegotAI Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
