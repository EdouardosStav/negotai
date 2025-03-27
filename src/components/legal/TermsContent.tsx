
import LegalTabContent from "./LegalTabContent";
import LegalSection from "./LegalSection";

const TermsContent = () => {
  return (
    <LegalTabContent title="Terms of Service">
      <LegalSection title="1. Acceptance of Terms">
        By accessing or using NegotAI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
      </LegalSection>
      
      <LegalSection title="2. Description of Service">
        NegotAI provides AI-powered salary insights and negotiation strategies tailored to users' skills and experience. Our service includes salary analysis, negotiation preparation, and related tools.
      </LegalSection>
      
      <LegalSection title="3. User Accounts">
        Some features of NegotAI may require user registration. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      </LegalSection>
      
      <LegalSection title="4. Limitation of Liability">
        NegotAI provides information and guidance but does not guarantee specific outcomes in salary negotiations. We are not liable for any decisions made based on our service.
      </LegalSection>
      
      <LegalSection title="5. Changes to Terms">
        We reserve the right to modify these terms at any time. Continued use of NegotAI after changes constitutes acceptance of the updated terms.
      </LegalSection>
    </LegalTabContent>
  );
};

export default TermsContent;
