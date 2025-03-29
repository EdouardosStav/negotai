
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
      <a href="/" onClick={handleLogoClick} className="flex items-center hover:opacity-90 transition-opacity duration-300">
        <img 
          src="/lovable-uploads/df2c74f6-97d6-47a4-84d8-37c0bb9199e7.png" 
          alt="NegotAI Logo" 
          className="h-10 w-auto"
        />
      </a>
    </div>
  );
};

export default Logo;
