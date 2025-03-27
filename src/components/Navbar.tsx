
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ContactModal from "./ContactModal";
import DesktopNavMenu from "./navbar/DesktopNavMenu";
import MobileNavMenu from "./navbar/MobileNavMenu";
import Logo from "./navbar/Logo";
import MobileMenuToggle from "./navbar/MobileMenuToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effects
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
    }
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3 bg-navy-dark/80 backdrop-blur-lg shadow-lg" : "py-5 bg-transparent"}`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Logo location={location} scrollToSection={scrollToSection} />

            <DesktopNavMenu 
              scrollToSection={scrollToSection}
              openContactModal={openContactModal}
              onSignIn={handleSignIn}
              onSignOut={handleSignOut}
            />

            <MobileMenuToggle 
              isOpen={isMobileMenuOpen} 
              toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            />
          </div>

          <MobileNavMenu 
            isOpen={isMobileMenuOpen}
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
