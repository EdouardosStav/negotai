
import LegalTabContent from "./LegalTabContent";
import LegalSection from "./LegalSection";

const GDPRContent = () => {
  return (
    <LegalTabContent title="GDPR Compliance">
      <LegalSection title="1. Data Controller">
        NegotAI acts as a data controller for personal information collected through our service. We determine the purposes and means of processing this data.
      </LegalSection>
      
      <LegalSection title="2. Legal Basis for Processing">
        We process your data based on your consent, contractual necessity, legitimate interests, or legal obligations, depending on the specific processing activity.
      </LegalSection>
      
      <LegalSection title="3. Data Subject Rights">
        Under GDPR, you have rights including access, rectification, erasure, restriction of processing, data portability, and objection to processing.
      </LegalSection>
      
      <LegalSection title="4. International Data Transfers">
        If we transfer your data outside the EEA, we ensure appropriate safeguards are in place to protect your information.
      </LegalSection>
      
      <LegalSection title="5. Data Protection Officer">
        If you have questions about our GDPR compliance, please contact our Data Protection Officer at dpo@negotiai.com.
      </LegalSection>
    </LegalTabContent>
  );
};

export default GDPRContent;
