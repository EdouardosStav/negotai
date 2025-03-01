
import { Link } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface MobileNavMenuProps {
  isOpen: boolean;
  isFeatureDropdownOpen: boolean;
  toggleFeatureDropdown: () => void;
  scrollToSection: (sectionId: string) => void;
  onClose: () => void;
  onSignIn: () => void;
  onSignOut: () => Promise<void>;
  openContactModal: () => void;
}

const MobileNavMenu = ({
  isOpen, 
  isFeatureDropdownOpen,
  toggleFeatureDropdown,
  scrollToSection,
  onClose,
  onSignIn,
  onSignOut,
  openContactModal
}: MobileNavMenuProps) => {
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  return (
    <nav className="md:hidden flex flex-col items-center space-y-4 pt-6 pb-6 animate-fade-in">
      <Link to="/" className="text-white hover:text-cyan transition-colors" onClick={e => {
        if (window.location.pathname === '/') {
          e.preventDefault();
          scrollToSection("home");
        }
        onClose();
      }}>
        Home
      </Link>
      
      <div className="w-full text-center">
        <button className="text-white hover:text-cyan transition-colors flex items-center justify-center w-full" onClick={toggleFeatureDropdown}>
          Features <ChevronDown size={16} className="ml-1" />
        </button>
        
        {isFeatureDropdownOpen && (
          <div className="mt-2 py-2 bg-purple-500/20 rounded-lg animate-fade-in">
            <a href="#analyze" className="block py-2 text-white hover:text-cyan transition-colors" onClick={e => {
              e.preventDefault();
              scrollToSection("analyze");
            }}>
              Salary Analysis
            </a>
            <div className="flex items-center justify-center py-2 text-white/70">
              <span>AI Negotiation Chat</span>
              <span className="ml-2 text-xs text-cyan/60 font-medium">Coming Soon!</span>
            </div>
          </div>
        )}
      </div>
      
      <Link to="/pricing" className="text-white hover:text-cyan transition-colors" onClick={onClose}>
        Pricing
      </Link>
      
      <Link to="/about" className="text-white hover:text-cyan transition-colors" onClick={onClose}>
        About
      </Link>
      
      <button className="text-white hover:text-cyan transition-colors" data-target="contact" onClick={openContactModal}>
        Contact
      </button>
      
      {isAuthenticated && (
        <Link 
          to="/dashboard" 
          className="text-white hover:text-cyan transition-colors" 
          onClick={onClose}
        >
          Dashboard
        </Link>
      )}
      
      {isAuthenticated ? (
        <button 
          onClick={onSignOut}
          className="flex items-center text-white hover:text-cyan transition-colors"
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </button>
      ) : (
        <button onClick={onSignIn} className="text-white hover:text-cyan transition-colors">
          Sign In
        </button>
      )}
    </nav>
  );
};

export default MobileNavMenu;
