
import LegalTabContent from "./LegalTabContent";
import LegalSection from "./LegalSection";

const CookiesContent = () => {
  return (
    <LegalTabContent title="Cookie Policy">
      <LegalSection title="1. What Are Cookies">
        Cookies are small text files that are placed on your device when you visit a website. They help the website remember your preferences and improve your browsing experience.
      </LegalSection>
      
      <LegalSection title="2. Types of Cookies We Use">
        We use essential cookies for website functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings.
      </LegalSection>
      
      <LegalSection title="3. Managing Cookies">
        Most web browsers allow you to control cookies through their settings. You can delete existing cookies, allow or block all cookies, or set preferences for certain websites.
      </LegalSection>
      
      <LegalSection title="4. Third-Party Cookies">
        Some third-party services we use may place cookies on your device. These cookies are subject to the respective privacy policies of these third parties.
      </LegalSection>
    </LegalTabContent>
  );
};

export default CookiesContent;
