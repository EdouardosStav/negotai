
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface NavbarFeatureMenuProps {
  scrollToSection: (sectionId: string) => void;
}

const NavbarFeatureMenu = ({ scrollToSection }: NavbarFeatureMenuProps) => {
  const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFeatureDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleFeatureDropdown = () => {
    setIsFeatureDropdownOpen(!isFeatureDropdownOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="nav-link flex items-center" 
        onClick={toggleFeatureDropdown} 
        onMouseEnter={() => setIsFeatureDropdownOpen(true)}
      >
        Features <ChevronDown size={16} className="ml-1" />
      </button>
      
      {isFeatureDropdownOpen && (
        <div 
          className="absolute top-full left-0 mt-1 py-2 w-48 bg-navy-dark/95 backdrop-blur-lg border border-purple-500/20 rounded-lg shadow-lg shadow-purple-500/10 z-50 animate-fade-in" 
          onMouseLeave={() => setIsFeatureDropdownOpen(false)}
        >
          <a 
            href="#analyze" 
            className="block px-4 py-2 text-white hover:bg-purple-500/20 transition-colors" 
            onClick={e => {
              e.preventDefault();
              scrollToSection("analyze");
            }}
          >
            Salary Analysis
          </a>
          <div className="flex items-center px-4 py-2 text-white/70 hover:bg-purple-500/20 transition-colors">
            <span className="px-0 mx-[5px]">AI Negotiation Chat</span>
            <span className="ml-2 text-xs text-cyan/60 font-medium">Coming Soon!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarFeatureMenu;
