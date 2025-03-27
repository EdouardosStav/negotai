
import { useState, useRef, useEffect } from "react";
import { LogOut, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NavbarUserMenuProps {
  onSignOut: () => Promise<void>;
  onSignIn: () => void;
}

const NavbarUserMenu = ({ onSignIn, onSignOut }: NavbarUserMenuProps) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Handle sign out with error prevention
  const handleSignOut = async () => {
    try {
      setIsUserDropdownOpen(false);
      await onSignOut();
    } catch (error) {
      console.error("Error during sign out:", error);
      // The dropdown is already closed, so we don't need to do anything else here
    }
  };

  if (isAuthenticated) {
    return (
      <div className="relative" ref={userDropdownRef}>
        <button 
          onClick={toggleUserDropdown}
          className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan/30 hover:from-purple-500/50 hover:to-cyan/50 transition-all border border-white/10"
        >
          <UserIcon size={16} className="text-white" />
        </button>
        
        {isUserDropdownOpen && (
          <div className="absolute top-full right-0 mt-1 py-2 w-48 bg-navy-dark/95 backdrop-blur-lg border border-purple-500/20 rounded-lg shadow-lg shadow-purple-500/10 z-50 animate-fade-in">
            <div className="px-4 py-2 border-b border-white/10">
              <p className="text-sm font-medium text-white truncate">
                {user?.email}
              </p>
            </div>
            <Link 
              to="/dashboard" 
              className="block px-4 py-2 text-white hover:bg-purple-500/20 transition-colors"
              onClick={() => setIsUserDropdownOpen(false)}
            >
              Dashboard
            </Link>
            <button 
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-white hover:bg-purple-500/20 transition-colors"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button onClick={onSignIn} className="text-white hover:text-cyan transition-colors duration-300">
          Sign In
        </button>
      </TooltipTrigger>
      <TooltipContent className="bg-navy-dark border border-white/10 text-white">
        <p>Sign in to access your account</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default NavbarUserMenu;
