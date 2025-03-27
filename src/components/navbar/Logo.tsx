
import { Link } from "react-router-dom";
import { Location } from "react-router-dom";

interface LogoProps {
  location: Location;
  scrollToSection: (sectionId: string) => void;
}

const Logo = ({ location, scrollToSection }: LogoProps) => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // If already on homepage, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Navigate to homepage
      window.location.href = '/';
    }
  };

  return (
    <div className="flex items-center">
      <a href="/" onClick={handleLogoClick} className="text-xl font-bold text-white hover:text-cyan transition-colors duration-300">
        NegotAI
      </a>
    </div>
  );
};

export default Logo;
