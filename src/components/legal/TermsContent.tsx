
import LegalTabContent from "./LegalTabContent";

const TermsContent = () => {
  return (
    <LegalTabContent title="Terms of Service">
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
    </LegalTabContent>
  );
};

export default TermsContent;
