
import { Menu, X } from "lucide-react";

interface MobileMenuToggleProps {
  isOpen: boolean;
  toggle: () => void;
}

const MobileMenuToggle = ({ isOpen, toggle }: MobileMenuToggleProps) => {
  return (
    <button className="md:hidden text-white" onClick={toggle}>
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};

export default MobileMenuToggle;
