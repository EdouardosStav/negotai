
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

type LegalTabContentProps = {
  title: string;
  children: ReactNode;
};

const LegalTabContent = ({ title, children }: LegalTabContentProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <ScrollArea className="h-[600px] px-8 pt-8 pb-12">
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      <div className="prose prose-invert max-w-none">
        <p className="text-white/80">
          Last updated: {currentDate}
        </p>
        {children}
      </div>
    </ScrollArea>
  );
};

export default LegalTabContent;
