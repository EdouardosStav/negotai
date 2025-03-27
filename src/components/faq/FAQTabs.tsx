
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import faqItems, { FAQItem as FAQItemType } from "@/data/faq";
import FAQItem from "./FAQItem";
import ContactSection from "./ContactSection";

const FAQTabs: React.FC = () => {
  // Filter for different categories
  const negotiationFAQs = faqItems.filter(item => item.category === "negotiation");
  const productFAQs = faqItems.filter(item => item.category === "product");
  const securityFAQs = faqItems.filter(item => item.category === "security");
  const supportFAQs = faqItems.filter(item => item.category === "support");

  return (
    <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6 bg-navy-light/30 p-1 rounded-full">
        <TabsTrigger 
          value="all" 
          className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan data-[state=active]:to-blue-500 data-[state=active]:text-white"
        >
          All Questions
        </TabsTrigger>
        <TabsTrigger 
          value="negotiation" 
          className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan data-[state=active]:to-blue-500 data-[state=active]:text-white"
        >
          Salary Negotiation
        </TabsTrigger>
        <TabsTrigger 
          value="product" 
          className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan data-[state=active]:to-blue-500 data-[state=active]:text-white"
        >
          How NegotAI Works
        </TabsTrigger>
        <TabsTrigger 
          value="security" 
          className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan data-[state=active]:to-blue-500 data-[state=active]:text-white"
        >
          Security & Privacy
        </TabsTrigger>
        <TabsTrigger 
          value="support" 
          className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan data-[state=active]:to-blue-500 data-[state=active]:text-white"
        >
          Support & Contact
        </TabsTrigger>
      </TabsList>

      {/* All Questions Tab */}
      <TabsContent value="all" className="focus-visible:outline-none focus-visible:ring-0">
        <ScrollArea className="min-h-[400px] max-h-[600px] rounded-md">
          <div className="p-4">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <FAQItem key={index} item={item} index={index} />
              ))}
            </Accordion>
          </div>
        </ScrollArea>
        <ContactSection />
      </TabsContent>

      {/* Negotiation Tab */}
      <TabsContent value="negotiation" className="focus-visible:outline-none focus-visible:ring-0">
        <ScrollArea className="min-h-[400px] max-h-[600px] rounded-md">
          <div className="p-4">
            <Accordion type="single" collapsible className="w-full">
              {negotiationFAQs.map((item, index) => (
                <FAQItem key={index} item={item} index={index} />
              ))}
            </Accordion>
          </div>
        </ScrollArea>
        <ContactSection />
      </TabsContent>

      {/* Product Tab */}
      <TabsContent value="product" className="focus-visible:outline-none focus-visible:ring-0">
        <ScrollArea className="min-h-[400px] max-h-[600px] rounded-md">
          <div className="p-4">
            <Accordion type="single" collapsible className="w-full">
              {productFAQs.map((item, index) => (
                <FAQItem key={index} item={item} index={index} />
              ))}
            </Accordion>
          </div>
        </ScrollArea>
        <ContactSection />
      </TabsContent>

      {/* Security Tab */}
      <TabsContent value="security" className="focus-visible:outline-none focus-visible:ring-0">
        <ScrollArea className="min-h-[400px] max-h-[600px] rounded-md">
          <div className="p-4">
            <Accordion type="single" collapsible className="w-full">
              {securityFAQs.map((item, index) => (
                <FAQItem key={index} item={item} index={index} />
              ))}
            </Accordion>
          </div>
        </ScrollArea>
        <ContactSection />
      </TabsContent>

      {/* Support Tab */}
      <TabsContent value="support" className="focus-visible:outline-none focus-visible:ring-0">
        <ScrollArea className="min-h-[400px] max-h-[600px] rounded-md">
          <div className="p-4">
            <Accordion type="single" collapsible className="w-full">
              {supportFAQs.map((item, index) => (
                <FAQItem key={index} item={item} index={index} />
              ))}
            </Accordion>
          </div>
        </ScrollArea>
        <ContactSection />
      </TabsContent>
    </Tabs>
  );
};

export default FAQTabs;
