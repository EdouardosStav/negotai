
import LegalTabContent from "./LegalTabContent";
import LegalSection from "./LegalSection";

const PrivacyContent = () => {
  return (
    <LegalTabContent title="Privacy Policy">
      <LegalSection title="1. Information We Collect">
        We collect information you provide directly, including your name, email, job history, skills, and salary information. We also collect certain information automatically when you use our service.
      </LegalSection>
      
      <LegalSection title="2. How We Use Your Information">
        We use your information to provide and improve our service, personalize your experience, communicate with you, and develop aggregated salary insights.
      </LegalSection>
      
      <LegalSection title="3. Information Sharing">
        We do not sell your personal information. We may share anonymized, aggregated data for research or market analysis purposes.
      </LegalSection>
      
      <LegalSection title="4. Data Security">
        We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.
      </LegalSection>
      
      <LegalSection title="5. Your Rights">
        You have the right to access, correct, or delete your personal information. Contact us at privacy@negotiai.com to exercise these rights.
      </LegalSection>
    </LegalTabContent>
  );
};

export default PrivacyContent;
