
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface MobileNavMenuProps {
  isOpen: boolean;
  scrollToSection: (sectionId: string) => void;
  onClose: () => void;
  onSignIn: () => void;
  onSignOut: () => Promise<void>;
  openContactModal: () => void;
}

const MobileNavMenu = ({
  isOpen, 
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
