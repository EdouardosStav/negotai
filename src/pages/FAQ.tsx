
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQTabs from "../components/faq/FAQTabs";

const FAQ = () => {
  // Update page title
  React.useEffect(() => {
    document.title = "FAQ | NegotAI";
  }, []);

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-white/70 text-lg mb-12">
            Find answers to common questions about salary negotiation, NegotAI features, security, and support.
          </p>
          
          <FAQTabs />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
