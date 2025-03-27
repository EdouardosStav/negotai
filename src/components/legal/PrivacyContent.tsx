
import LegalTabContent from "./LegalTabContent";

const PrivacyContent = () => {
  return (
    <LegalTabContent title="Privacy Policy">
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
    </LegalTabContent>
  );
};

export default PrivacyContent;
