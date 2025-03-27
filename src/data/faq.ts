
import { ReactNode } from "react";

export type FAQCategory = "negotiation" | "product" | "security" | "support";

export interface FAQItem {
  question: string;
  answer: ReactNode;
  category: FAQCategory;
}

const faqItems: FAQItem[] = [
  // Salary Negotiation Questions
  {
    question: "When is the best time to negotiate salary?",
    answer: (
      <div>
        <p>
          The best time to negotiate your salary is typically after you've received a formal job offer but before you accept it. At this point, the employer has decided they want you, giving you maximum leverage.
        </p>
        <p className="mt-2">
          For existing roles, the ideal times are during annual reviews, after completing significant projects, or when taking on new responsibilities.
        </p>
      </div>
    ),
    category: "negotiation",
  },
  {
    question: "Should I ever accept the first salary offer?",
    answer: (
      <div>
        <p>
          In most cases, you should negotiate rather than accepting the first offer. Studies show that employers typically build in room for negotiation, expecting candidates to counter.
        </p>
        <p className="mt-2">
          However, there are exceptions. If you've researched extensively and the offer significantly exceeds market rates and your expectations, it might be reasonable to accept.
        </p>
      </div>
    ),
    category: "negotiation",
  },
  {
    question: "How do I research salary ranges for my position?",
    answer: (
      <div>
        <p>
          To research appropriate salary ranges:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Check salary comparison websites like Glassdoor, PayScale, and LinkedIn Salary</li>
          <li>Consult industry-specific salary reports</li>
          <li>Network with professionals in similar roles</li>
          <li>Speak with recruiters who specialize in your field</li>
        </ul>
      </div>
    ),
    category: "negotiation",
  },
  {
    question: "What if the employer says the salary isn't negotiable?",
    answer: (
      <div>
        <p>
          If an employer states the salary is non-negotiable, consider exploring other components of the compensation package, such as:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Performance bonus structures</li>
          <li>Additional vacation time</li>
          <li>Flexible work arrangements</li>
          <li>Professional development budgets</li>
          <li>Earlier performance review timeline</li>
          <li>Sign-on bonuses</li>
        </ul>
        <p className="mt-2">
          Sometimes, the base salary truly isn't flexible due to standardized pay bands, but there's often flexibility in other areas.
        </p>
      </div>
    ),
    category: "negotiation",
  },
  
  // How NegotAI Works
  {
    question: "How does NegotAI generate salary recommendations?",
    answer: (
      <div>
        <p>
          NegotAI generates personalized salary recommendations using a combination of:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Comprehensive market salary data across industries and locations</li>
          <li>Proprietary algorithms that factor in your experience, skills, and education</li>
          <li>Real-time adjustment based on current market conditions and trends</li>
          <li>Data from thousands of successful salary negotiations</li>
        </ul>
        <p className="mt-2">
          Our system continuously improves as more data becomes available, ensuring you always receive the most accurate and up-to-date recommendations.
        </p>
      </div>
    ),
    category: "product",
  },
  {
    question: "When will the AI Negotiation Chat feature be available?",
    answer: (
      <div>
        <p>
          Our AI Negotiation Chat feature is currently in final development stages and will be launching in Q3 2023. This feature will provide:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Interactive, real-time negotiation practice with our AI</li>
          <li>Personalized feedback on your negotiation approach</li>
          <li>Custom negotiation scripts tailored to your specific situation</li>
          <li>Response suggestions for common employer objections</li>
        </ul>
        <p className="mt-2">
          Join our waiting list to be notified when this feature launches and get early access.
        </p>
      </div>
    ),
    category: "product",
  },
  
  // Security & Privacy Questions
  {
    question: "Is my personal information secure with NegotAI?",
    answer: (
      <div>
        <p>
          Yes, protecting your data is our top priority. NegotAI employs industry-leading security measures:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>End-to-end encryption for all personal data</li>
          <li>Strict anonymization of salary and negotiation information</li>
          <li>Regular security audits and penetration testing</li>
          <li>Compliance with global data protection regulations including GDPR</li>
        </ul>
        <p className="mt-2">
          We never sell your personal information to third parties. For more details, please review our Privacy Policy.
        </p>
      </div>
    ),
    category: "security",
  },
  {
    question: "How is my salary data used by NegotAI?",
    answer: (
      <div>
        <p>
          Your salary data is:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Used to generate personalized recommendations and insights</li>
          <li>Anonymized and aggregated for market analysis</li>
          <li>Protected with industry-standard encryption</li>
          <li>Never shared with employers or third parties without explicit consent</li>
        </ul>
        <p className="mt-2">
          We maintain strict data separation practices to ensure your personal information cannot be linked to your salary data by unauthorized parties.
        </p>
      </div>
    ),
    category: "security",
  },
  
  // Support & Contact
  {
    question: "How can I get support if I have questions or issues?",
    answer: (
      <div>
        <p>
          You can get support through our various channels:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Submit a request through our Contact page</li>
          <li>Email our support team at support@negotiai.com</li>
          <li>Use the live chat feature on our website (available during business hours)</li>
        </ul>
        <p className="mt-2">
          Our support team typically responds within 24 hours on business days.
        </p>
      </div>
    ),
    category: "support",
  },
  {
    question: "Can I request custom features or integrations?",
    answer: (
      <div>
        <p>
          Yes, we welcome feature requests and integration suggestions. These can be submitted through:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Your account dashboard under "Feature Requests"</li>
          <li>Our public roadmap voting system</li>
          <li>Direct contact with our product team for Enterprise customers</li>
        </ul>
        <p className="mt-2">
          We prioritize development based on customer demand and technical feasibility. Many of our most popular features originated from user suggestions!
        </p>
      </div>
    ),
    category: "support",
  },
];

export default faqItems;
