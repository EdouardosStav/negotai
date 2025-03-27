
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TermsContent from "./TermsContent";
import PrivacyContent from "./PrivacyContent";
import CookiesContent from "./CookiesContent";
import GDPRContent from "./GDPRContent";

type LegalTabsContainerProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const LegalTabsContainer = ({ activeTab, setActiveTab }: LegalTabsContainerProps) => {
  return (
    <Tabs
      defaultValue="terms"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className="sticky top-20 z-10 bg-navy/80 backdrop-blur-md py-4 rounded-lg">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
          <TabsTrigger value="gdpr">GDPR</TabsTrigger>
        </TabsList>
      </div>
      
      <div className="max-w-4xl mx-auto mt-8">
        <TabsContent value="terms" className="bg-white/5 rounded-xl overflow-hidden">
          <TermsContent />
        </TabsContent>
        
        <TabsContent value="privacy" className="bg-white/5 rounded-xl overflow-hidden">
          <PrivacyContent />
        </TabsContent>
        
        <TabsContent value="cookies" className="bg-white/5 rounded-xl overflow-hidden">
          <CookiesContent />
        </TabsContent>
        
        <TabsContent value="gdpr" className="bg-white/5 rounded-xl overflow-hidden">
          <GDPRContent />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default LegalTabsContainer;
