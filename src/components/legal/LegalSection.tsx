
import { ReactNode } from "react";

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

const LegalSection = ({ title, children }: LegalSectionProps) => {
  return (
    <>
      <h3 className="text-xl font-semibold text-white mt-6">{title}</h3>
      <p className="text-white/80">
        {children}
      </p>
    </>
  );
};

export default LegalSection;
