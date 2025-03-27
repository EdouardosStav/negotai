
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const Legal = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("terms");
  
  useEffect(() => {
    // Set page title
    document.title = "Legal Information - NegotAI";

    // Handle direct navigation to sections
    if (location.state && location.state.section) {
      setActiveTab(location.state.section);
    } else if (location.hash) {
      // Handle URL hash without state (e.g., /legal#privacy)
      const section = location.hash.substring(1);
      if (["terms", "privacy", "cookies", "gdpr"].includes(section)) {
        setActiveTab(section);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-12 text-center py-[7px]">Legal Information</h1>
        
        {/* Section Navigation - Using ShadCN Tabs */}
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
          
          {/* Legal Content Sections */}
          <div className="max-w-4xl mx-auto mt-8">
            <TabsContent value="terms" className="bg-white/5 rounded-xl overflow-hidden">
              <ScrollArea className="h-[600px] px-8 pt-8 pb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Terms of Service</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80">
                    Last updated: {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">1. Acceptance of Terms</h3>
                  <p className="text-white/80">
                    By accessing or using NegotAI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">2. Description of Service</h3>
                  <p className="text-white/80">
                    NegotAI provides AI-powered salary insights and negotiation strategies tailored to users' skills and experience. Our service includes salary analysis, negotiation preparation, and related tools.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">3. User Accounts</h3>
                  <p className="text-white/80">
                    Some features of NegotAI may require user registration. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">4. Limitation of Liability</h3>
                  <p className="text-white/80">
                    NegotAI provides information and guidance but does not guarantee specific outcomes in salary negotiations. We are not liable for any decisions made based on our service.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">5. Changes to Terms</h3>
                  <p className="text-white/80">
                    We reserve the right to modify these terms at any time. Continued use of NegotAI after changes constitutes acceptance of the updated terms.
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="privacy" className="bg-white/5 rounded-xl overflow-hidden">
              <ScrollArea className="h-[600px] px-8 pt-8 pb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Privacy Policy</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80">
                    Last updated: {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">1. Information We Collect</h3>
                  <p className="text-white/80">
                    We collect information you provide directly, including your name, email, job history, skills, and salary information. We also collect certain information automatically when you use our service.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">2. How We Use Your Information</h3>
                  <p className="text-white/80">
                    We use your information to provide and improve our service, personalize your experience, communicate with you, and develop aggregated salary insights.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">3. Information Sharing</h3>
                  <p className="text-white/80">
                    We do not sell your personal information. We may share anonymized, aggregated data for research or market analysis purposes.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">4. Data Security</h3>
                  <p className="text-white/80">
                    We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">5. Your Rights</h3>
                  <p className="text-white/80">
                    You have the right to access, correct, or delete your personal information. Contact us at privacy@negotiai.com to exercise these rights.
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="cookies" className="bg-white/5 rounded-xl overflow-hidden">
              <ScrollArea className="h-[600px] px-8 pt-8 pb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Cookie Policy</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80">
                    Last updated: {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">1. What Are Cookies</h3>
                  <p className="text-white/80">
                    Cookies are small text files that are placed on your device when you visit a website. They help the website remember your preferences and improve your browsing experience.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">2. Types of Cookies We Use</h3>
                  <p className="text-white/80">
                    We use essential cookies for website functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">3. Managing Cookies</h3>
                  <p className="text-white/80">
                    Most web browsers allow you to control cookies through their settings. You can delete existing cookies, allow or block all cookies, or set preferences for certain websites.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">4. Third-Party Cookies</h3>
                  <p className="text-white/80">
                    Some third-party services we use may place cookies on your device. These cookies are subject to the respective privacy policies of these third parties.
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="gdpr" className="bg-white/5 rounded-xl overflow-hidden">
              <ScrollArea className="h-[600px] px-8 pt-8 pb-12">
                <h2 className="text-3xl font-bold text-white mb-6">GDPR Compliance</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80">
                    Last updated: {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">1. Data Controller</h3>
                  <p className="text-white/80">
                    NegotAI acts as a data controller for personal information collected through our service. We determine the purposes and means of processing this data.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">2. Legal Basis for Processing</h3>
                  <p className="text-white/80">
                    We process your data based on your consent, contractual necessity, legitimate interests, or legal obligations, depending on the specific processing activity.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">3. Data Subject Rights</h3>
                  <p className="text-white/80">
                    Under GDPR, you have rights including access, rectification, erasure, restriction of processing, data portability, and objection to processing.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">4. International Data Transfers</h3>
                  <p className="text-white/80">
                    If we transfer your data outside the EEA, we ensure appropriate safeguards are in place to protect your information.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mt-6">5. Data Protection Officer</h3>
                  <p className="text-white/80">
                    If you have questions about our GDPR compliance, please contact our Data Protection Officer at dpo@negotiai.com.
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Legal;
