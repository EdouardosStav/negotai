
import LegalTabContent from "./LegalTabContent";

const GDPRContent = () => {
  return (
    <LegalTabContent title="GDPR Compliance">
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
    </LegalTabContent>
  );
};

export default GDPRContent;
