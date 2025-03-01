
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  category: string;
}

const FAQ = () => {
  // Update page title
  React.useEffect(() => {
    document.title = "FAQ | NegotAI";
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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
            <li>Review our <Link to="/salary-data" className="text-cyan hover:underline">Salary Data</Link> page for industry-specific insights</li>
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
            We never sell your personal information to third parties. For more details, please review our <Link to="/legal#privacy" className="text-cyan hover:underline">Privacy Policy</Link>.
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
    
    // Pricing & Features
    {
      question: "What features are included in the free plan?",
      answer: (
        <div>
          <p>
            Our free plan includes:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Basic salary analysis for your position and location</li>
            <li>Access to general negotiation guides and resources</li>
            <li>Limited access to industry salary data</li>
            <li>One custom salary report per month</li>
          </ul>
          <p className="mt-2">
            For more comprehensive features, including personalized negotiation strategies and unlimited reports, consider upgrading to our Premium or Enterprise plans. Visit our <Link to="/pricing" className="text-cyan hover:underline">Pricing</Link> page for details.
          </p>
        </div>
      ),
      category: "pricing",
    },
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer: (
        <div>
          <p>
            Yes, you can upgrade or downgrade your NegotAI plan at any time through your account dashboard.
          </p>
          <p className="mt-2">
            When upgrading, you'll immediately gain access to additional features, and your billing will be prorated for the remainder of your current billing cycle.
          </p>
          <p className="mt-2">
            When downgrading, your current plan will remain active until the end of your billing period, then switch to the new plan for the next cycle.
          </p>
        </div>
      ),
      category: "pricing",
    },
    {
      question: "Do you offer discounts for students or educational institutions?",
      answer: (
        <div>
          <p>
            Yes, we offer special pricing for:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Students: 50% discount on Premium plans with valid student ID</li>
            <li>Educational institutions: Custom pricing based on user volume</li>
            <li>Career centers: Special packages including group workshops</li>
          </ul>
          <p className="mt-2">
            Contact our team at <a href="mailto:education@negotiai.com" className="text-cyan hover:underline">education@negotiai.com</a> for details and verification procedures.
          </p>
        </div>
      ),
      category: "pricing",
    },
    
    // Support & Contact
    {
      question: "How can I get support if I have questions or issues?",
      answer: (
        <div>
          <p>
            We offer multiple support channels:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Email support: <a href="mailto:support@negotiai.com" className="text-cyan hover:underline">support@negotiai.com</a> (24-48 hour response time)</li>
            <li>Live chat: Available Monday-Friday, 9am-5pm EST</li>
            <li>Help Center: Extensive documentation and troubleshooting guides</li>
            <li>Community forums: Connect with other users and our support team</li>
          </ul>
          <p className="mt-2">
            Premium and Enterprise plan members receive priority support with faster response times.
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

  const filteredFAQs = activeCategory === "all"
    ? faqItems
    : faqItems.filter(item => item.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-white/70 text-lg mb-12">
            Find answers to common questions about salary negotiation, NegotAI features, pricing, and support.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-cyan to-blue-500 text-white"
                  : "bg-navy-light/30 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              All Questions
            </button>
            <button
              onClick={() => setActiveCategory("negotiation")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "negotiation"
                  ? "bg-gradient-to-r from-cyan to-blue-500 text-white"
                  : "bg-navy-light/30 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Salary Negotiation
            </button>
            <button
              onClick={() => setActiveCategory("product")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "product"
                  ? "bg-gradient-to-r from-cyan to-blue-500 text-white"
                  : "bg-navy-light/30 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              How NegotAI Works
            </button>
            <button
              onClick={() => setActiveCategory("pricing")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "pricing"
                  ? "bg-gradient-to-r from-cyan to-blue-500 text-white"
                  : "bg-navy-light/30 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Pricing & Features
            </button>
            <button
              onClick={() => setActiveCategory("support")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "support"
                  ? "bg-gradient-to-r from-cyan to-blue-500 text-white"
                  : "bg-navy-light/30 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Support & Contact
            </button>
          </div>
          
          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div 
                key={index} 
                className={`border border-white/10 rounded-lg transition-all ${
                  openFAQ === index ? "bg-navy-light/30" : "bg-navy-dark/30 hover:bg-navy-light/20"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full p-5 text-left"
                >
                  <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-white/70 transform transition-transform ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="p-5 pt-0 text-white/70 border-t border-white/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-cyan/20 to-blue-500/20 border border-white/10 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              We're here to help. Reach out to our support team for personalized assistance with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@negotiai.com"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <Mail size={18} className="mr-2" />
                Email Support
              </a>
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('button.nav-link')?.click();
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gradient-to-r from-cyan to-blue-500 text-white hover:opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
