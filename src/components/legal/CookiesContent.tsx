
import LegalTabContent from "./LegalTabContent";

const CookiesContent = () => {
  return (
    <LegalTabContent title="Cookie Policy">
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
    </LegalTabContent>
  );
};

export default CookiesContent;
