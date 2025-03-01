
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";

const Pricing = () => {
  useEffect(() => {
    // Update page title
    document.title = "Pricing - NegotAI";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="section-heading text-center mb-6">Pricing Plans</h1>
          <p className="section-subheading text-center mb-16">
            Choose the plan that fits your needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="glass-card p-8 rounded-xl flex flex-col h-full border border-white/10 hover:border-cyan/30 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                <p className="text-white/70">Get started with basic analysis</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-white/70 ml-2">/month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white/80 ml-3">Basic salary comparison</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white/80 ml-3">Limited industry insights</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white/80 ml-3">1 salary analysis per month</span>
                </li>
              </ul>
              
              <button className="w-full py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-all duration-300">
                Sign Up Free
              </button>
            </div>
            
            {/* Pro Plan */}
            <div className="glass-card p-8 rounded-xl flex flex-col h-full relative border border-cyan/30 hover:border-cyan/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-cyan text-navy-dark px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <p className="text-white/70">Advanced salary negotiation</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">$19</span>
                  <span className="text-white/70 ml-2">/month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white/80 ml-3">Full AI-powered salary analysis</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white/80 ml-3">Personalized negotiation scripts</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white/80 ml-3">Unlimited analyses</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white/80 ml-3">Full industry comparison</span>
                </li>
              </ul>
              
              <button className="w-full py-3 rounded-lg bg-[#008CFF] text-white hover:shadow-[0_0_15px_rgba(0,140,255,0.5)] transition-all duration-300">
                Get Started
              </button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="glass-card p-8 rounded-xl flex flex-col h-full border border-white/10 hover:border-cyan/30 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <p className="text-white/70">For teams and organizations</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">$99</span>
                  <span className="text-white/70 ml-2">/month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white/80 ml-3">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white/80 ml-3">Team management dashboard</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white/80 ml-3">Custom integrations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white/80 ml-3">Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white/80 ml-3">Priority support</span>
                </li>
              </ul>
              
              <button className="w-full py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-white/70 max-w-2xl mx-auto">
              All plans include access to our basic features. Pro and Enterprise plans offer advanced AI capabilities and personalized support.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
