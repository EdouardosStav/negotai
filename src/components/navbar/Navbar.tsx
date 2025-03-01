
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ContactModal from "../ContactModal";
import DesktopNavMenu from "./DesktopNavMenu";
import MobileNavMenu from "./MobileNavMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
      setIsFeatureDropdownOpen(false);
    }
  };

  const toggleFeatureDropdown = () => {
    setIsFeatureDropdownOpen(!isFeatureDropdownOpen);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3 bg-navy-dark/80 backdrop-blur-lg shadow-lg" : "py-5 bg-transparent"}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-white hover:text-cyan transition-colors duration-300">
                NegotAI
              </Link>
            </div>

            <DesktopNavMenu 
              scrollToSection={scrollToSection}
              openContactModal={openContactModal}
              onSignIn={handleSignIn}
              onSignOut={handleSignOut}
            />

            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <MobileNavMenu 
            isOpen={isMobileMenuOpen}
            isFeatureDropdownOpen={isFeatureDropdownOpen}
            toggleFeatureDropdown={toggleFeatureDropdown}
            scrollToSection={scrollToSection}
            onClose={() => setIsMobileMenuOpen(false)}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
            openContactModal={openContactModal}
          />
        </div>
      </header>
      
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
};

export default Navbar;
