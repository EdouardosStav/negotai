
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FAQItem as FAQItemType } from "@/data/faq";

interface FAQItemProps {
  item: FAQItemType;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ item, index }) => {
  return (
    <AccordionItem value={`item-${index}`} className="border border-white/10 rounded-lg overflow-hidden mb-4 bg-navy-dark/30 hover:bg-navy-light/20">
      <AccordionTrigger className="p-5 text-lg font-medium text-white">
        {item.question}
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-5 text-white/70">
        <div dangerouslySetInnerHTML={{ __html: item.answer }} />
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
