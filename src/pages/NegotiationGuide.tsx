
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NegotiationGuide = () => {
  // Update page title
  React.useEffect(() => {
    document.title = "Negotiation Guide | NegotAI";
  }, []);

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Salary Negotiation Guide
          </h1>
          <p className="text-white/70 text-lg mb-12">
            Master the art of negotiation with our comprehensive guide designed to help you secure the compensation you deserve.
          </p>
          
          {/* Introduction Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-4">
              Why Negotiation Is Important
            </h2>
            <div className="bg-navy-light/30 border border-white/10 rounded-lg p-6 mb-6">
              <p className="text-white/80 mb-4">
                Negotiating your salary isn't just about getting more money – it's about establishing your value and setting the tone for your career growth. Studies show that failing to negotiate your starting salary can cost you up to $500,000 in lifetime earnings.
              </p>
              <p className="text-white/80">
                Beyond the financial impact, successful negotiation demonstrates confidence, communication skills, and professional maturity – qualities that employers value in their team members.
              </p>
            </div>
            <div className="bg-cyan/10 border border-cyan/30 rounded-lg p-6">
              <h3 className="text-xl font-medium text-white mb-3">Did You Know?</h3>
              <p className="text-white/80">
                According to research, only 39% of professionals negotiate their salary. Those who do negotiate typically secure 7-15% more in compensation than those who don't.
              </p>
            </div>
          </section>
          
          {/* Step-by-Step Guide */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              Step-by-Step Negotiation Guide
            </h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan to-blue-500 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Research Market Rates</h3>
                  <p className="text-white/70 mb-4">
                    Before entering any negotiation, gather data on salary ranges for your role, industry, location, and experience level. Knowledge is power.
                  </p>
                  <div className="bg-navy-light/30 border border-white/10 rounded-lg p-4">
                    <p className="text-white/80 text-sm">
                      <strong>Pro Tip:</strong> Use platforms like Glassdoor, PayScale, and LinkedIn Salary Insights, along with your professional network for the most accurate data.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan to-blue-500 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Quantify Your Value</h3>
                  <p className="text-white/70 mb-4">
                    Document your achievements, skills, and the unique value you bring. Focus on how you've impacted revenue, efficiency, or other key metrics.
                  </p>
                  <div className="bg-navy-light/30 border border-white/10 rounded-lg p-4">
                    <p className="text-white/80 text-sm">
                      <strong>Pro Tip:</strong> Create a "value document" listing specific examples where you've exceeded expectations, solved problems, or contributed to company success.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan to-blue-500 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Practice Your Delivery</h3>
                  <p className="text-white/70 mb-4">
                    Rehearse your negotiation conversation, anticipate potential objections, and prepare responses. Your confidence matters.
                  </p>
                  <div className="bg-navy-light/30 border border-white/10 rounded-lg p-4">
                    <p className="text-white/80 text-sm">
                      <strong>Pro Tip:</strong> Role-play with a friend or mentor who can provide constructive feedback on your approach and delivery.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan to-blue-500 flex items-center justify-center text-white font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Consider the Full Package</h3>
                  <p className="text-white/70 mb-4">
                    Look beyond base salary to benefits, bonuses, equity, flexibility, professional development, and other perks.
                  </p>
                  <div className="bg-navy-light/30 border border-white/10 rounded-lg p-4">
                    <p className="text-white/80 text-sm">
                      <strong>Pro Tip:</strong> Prioritize what matters most to you and be prepared to make trade-offs if necessary.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan to-blue-500 flex items-center justify-center text-white font-bold">
                    5
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Know When to Walk Away</h3>
                  <p className="text-white/70 mb-4">
                    Set your minimum acceptable offer before negotiating and be prepared to decline if it's not met.
                  </p>
                  <div className="bg-navy-light/30 border border-white/10 rounded-lg p-4">
                    <p className="text-white/80 text-sm">
                      <strong>Pro Tip:</strong> Having alternative options strengthens your position. Continue job searching until you've signed an offer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Common Mistakes */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              Common Negotiation Mistakes to Avoid
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-navy-light/30 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-3">Accepting the First Offer</h3>
                <p className="text-white/70">
                  Most employers expect negotiation and leave room for it in their initial offers. By accepting immediately, you're likely leaving money on the table.
                </p>
              </div>
              
              <div className="bg-navy-light/30 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-3">Disclosing Your Salary History</h3>
                <p className="text-white/70">
                  Revealing previous compensation can anchor negotiations to potentially lower numbers. Focus instead on the value you'll provide and market rates.
                </p>
              </div>
              
              <div className="bg-navy-light/30 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-3">Negotiating via Email Only</h3>
                <p className="text-white/70">
                  Complex negotiations benefit from real-time conversation. Schedule a call or meeting for important salary discussions.
                </p>
              </div>
              
              <div className="bg-navy-light/30 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-3">Making It Personal</h3>
                <p className="text-white/70">
                  Focusing on personal financial needs rather than your professional value weakens your position. Keep the conversation centered on your skills and market value.
                </p>
              </div>
            </div>
          </section>
          
          {/* Expert Tips */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Expert Negotiation Tips for Different Scenarios
            </h2>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-cyan/20 to-blue-500/20 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-4">For First-Time Job Seekers</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Leverage internships, projects, and academic achievements to demonstrate value.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Research extensively to understand industry standards for entry-level positions.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Consider opportunities for mentorship and growth potential as negotiation points.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-cyan/20 to-blue-500/20 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-4">For Mid-Career Professionals</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Highlight specific achievements and their measurable impact on previous employers.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Negotiate for performance-based bonuses and advancement opportunities.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Consider requesting an earlier performance review to reassess compensation.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-cyan/20 to-blue-500/20 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-4">For Remote Positions</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Research location-adjusted salary ranges and cost-of-living differentials.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Negotiate for home office stipends, internet allowances, and equipment.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Discuss expectations for travel to headquarters or team gatherings.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NegotiationGuide;
