
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import NavbarUserMenu from "./NavbarUserMenu";

interface DesktopNavMenuProps {
  scrollToSection: (sectionId: string) => void;
  openContactModal: () => void;
  onSignIn: () => void;
  onSignOut: () => Promise<void>;
}

const DesktopNavMenu = ({
  scrollToSection,
  openContactModal,
  onSignIn,
  onSignOut
}: DesktopNavMenuProps) => {
  const {
    isAuthenticated
  } = useAuth();

  return <nav className="hidden md:flex items-center space-x-8">
      <Link to="/" className="nav-link" onClick={e => {
      if (window.location.pathname === '/') {
        e.preventDefault();
        scrollToSection("home");
      }
    }}>
        Home
      </Link>
      
      <Link to="/about" className="nav-link">About</Link>
      
      <button className="nav-link" data-target="contact" onClick={openContactModal}>
        Contact
      </button>
      
      {isAuthenticated && <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>}
      
      <NavbarUserMenu onSignIn={onSignIn} onSignOut={onSignOut} />
    </nav>;
};

export default DesktopNavMenu;
