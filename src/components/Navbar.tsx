
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import ContactModal from "./ContactModal";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Click outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFeatureDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSignIn = () => {
    console.log("User clicked Sign In - would open auth modal");
    // For a real implementation, this would open the auth modal
    // or redirect to a sign-in page
  };
  const scrollToSection = (sectionId: string) => {
    // Check if we're on the home page
    if (window.location.pathname !== '/') {
      // If not, navigate to home and then scroll after page loads
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
  return <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3 bg-navy-dark/80 backdrop-blur-lg shadow-lg" : "py-5 bg-transparent"}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-white hover:text-cyan transition-colors duration-300">
                NegotAI
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link" onClick={e => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                scrollToSection("home");
              }
            }}>
                Home
              </Link>
              
              {/* Features Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button className="nav-link flex items-center" onClick={toggleFeatureDropdown} onMouseEnter={() => setIsFeatureDropdownOpen(true)}>
                  Features <ChevronDown size={16} className="ml-1" />
                </button>
                
                {isFeatureDropdownOpen && <div className="absolute top-full left-0 mt-1 py-2 w-48 bg-navy-dark/95 backdrop-blur-lg border border-purple-500/20 rounded-lg shadow-lg shadow-purple-500/10 z-50 animate-fade-in" onMouseLeave={() => setIsFeatureDropdownOpen(false)}>
                    <a href="#analyze" className="block px-4 py-2 text-white hover:bg-purple-500/20 transition-colors" onClick={e => {
                  e.preventDefault();
                  scrollToSection("analyze");
                }}>
                      Salary Analysis
                    </a>
                    <div className="flex items-center px-4 py-2 text-white/70 hover:bg-purple-500/20 transition-colors">
                      <span className="px-0 mx-[5px]">AI Negotiation Chat</span>
                      <span className="ml-2 text-xs text-cyan/60 font-medium">Coming Soon!</span>
                    </div>
                  </div>}
              </div>
              
              <Link to="/pricing" className="nav-link">Pricing</Link>
              <Link to="/about" className="nav-link">About</Link>
              
              <button className="nav-link" data-target="contact" onClick={openContactModal}>
                Contact
              </button>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={handleSignIn} className="text-white hover:text-cyan transition-colors duration-300">
                      Sign In
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-navy-dark border border-white/10 text-white">
                    <p>Sign in to access your account</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && <nav className="md:hidden flex flex-col items-center space-y-4 pt-6 pb-6 animate-fade-in">
              <Link to="/" className="text-white hover:text-cyan transition-colors" onClick={e => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              scrollToSection("home");
            }
            setIsMobileMenuOpen(false);
          }}>
                Home
              </Link>
              
              {/* Mobile Features Dropdown */}
              <div className="w-full text-center">
                <button className="text-white hover:text-cyan transition-colors flex items-center justify-center w-full" onClick={toggleFeatureDropdown}>
                  Features <ChevronDown size={16} className="ml-1" />
                </button>
                
                {isFeatureDropdownOpen && <div className="mt-2 py-2 bg-purple-500/20 rounded-lg animate-fade-in">
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
                  </div>}
              </div>
              
              <Link to="/pricing" className="text-white hover:text-cyan transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Pricing
              </Link>
              
              <Link to="/about" className="text-white hover:text-cyan transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
              
              <button className="text-white hover:text-cyan transition-colors" data-target="contact" onClick={openContactModal}>
                Contact
              </button>
              
              <button onClick={handleSignIn} className="text-white hover:text-cyan transition-colors">
                Sign In
              </button>
            </nav>}
        </div>
      </header>
      
      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>;
};
export default Navbar;
