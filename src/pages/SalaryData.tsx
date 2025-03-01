
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const SalaryData = () => {
  // Update page title
  React.useEffect(() => {
    document.title = "Salary Data | NegotAI";
  }, []);

  // Sample data for industry salary ranges
  const industrySalaryData = [
    { industry: "Technology", entry: 65000, mid: 105000, senior: 150000 },
    { industry: "Finance", entry: 60000, mid: 95000, senior: 140000 },
    { industry: "Healthcare", entry: 55000, mid: 85000, senior: 125000 },
    { industry: "Marketing", entry: 50000, mid: 80000, senior: 120000 },
    { industry: "Education", entry: 45000, mid: 65000, senior: 95000 }
  ];

  // Sample data for location-based salary insights
  const locationSalaryData = [
    { location: "San Francisco", salary: 135000 },
    { location: "New York", salary: 125000 },
    { location: "Seattle", salary: 120000 },
    { location: "Boston", salary: 115000 },
    { location: "Chicago", salary: 105000 },
    { location: "Austin", salary: 100000 },
    { location: "Denver", salary: 95000 }
  ];

  // Sample data for market trends
  const marketTrendsData = [
    { year: "2018", rate: 1.0 },
    { year: "2019", rate: 1.03 },
    { year: "2020", rate: 1.05 },
    { year: "2021", rate: 1.10 },
    { year: "2022", rate: 1.16 },
    { year: "2023", rate: 1.21 },
  ];

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Salary Data Insights
          </h1>
          <p className="text-white/70 text-lg mb-12 max-w-3xl">
            Access comprehensive salary data across industries, locations, and experience levels to benchmark your compensation and make informed career decisions.
          </p>
          
          {/* Industry Salary Section */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-6">
              Industry-Specific Salary Ranges
            </h2>
            <p className="text-white/70 mb-8 max-w-3xl">
              Compensation varies significantly across industries. Below are average annual salary ranges for common industries, categorized by career stage.
            </p>
            
            <div className="bg-navy-light/30 border border-white/10 rounded-lg p-6 mb-8">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={industrySalaryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="industry" stroke="#ffffff80" />
                    <YAxis stroke="#ffffff80" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1A1F2C", 
                        borderColor: "#ffffff20",
                        color: "#fff" 
                      }} 
                    />
                    <Bar dataKey="entry" name="Entry Level" fill="#0EA5E9" />
                    <Bar dataKey="mid" name="Mid Level" fill="#22D3EE" />
                    <Bar dataKey="senior" name="Senior Level" fill="#06B6D4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="w-4 h-4 bg-[#0EA5E9] rounded inline-block mr-2"></div>
                  <span className="text-white/70 text-sm">Entry Level</span>
                </div>
                <div>
                  <div className="w-4 h-4 bg-[#22D3EE] rounded inline-block mr-2"></div>
                  <span className="text-white/70 text-sm">Mid Level</span>
                </div>
                <div>
                  <div className="w-4 h-4 bg-[#06B6D4] rounded inline-block mr-2"></div>
                  <span className="text-white/70 text-sm">Senior Level</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-navy-light/30 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-3">Entry-Level Insights</h3>
                <p className="text-white/70 mb-4">
                  Entry-level positions in technology offer the highest starting salaries, with an average of $65,000 annually.
                </p>
                <p className="text-white/70">
                  When negotiating your first job offer, focus on growth potential and training opportunities if salary flexibility is limited.
                </p>
              </div>
              
              <div className="bg-navy-light/30 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-3">Mid-Career Analysis</h3>
                <p className="text-white/70 mb-4">
                  The largest salary growth typically occurs in the transition from entry to mid-level positions, with an average increase of 54%.
                </p>
                <p className="text-white/70">
                  Mid-career professionals should negotiate based on their specialized skills and demonstrated impact.
                </p>
              </div>
              
              <div className="bg-navy-light/30 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-3">Senior Compensation</h3>
                <p className="text-white/70 mb-4">
                  Technology and Finance offer the highest senior-level compensation packages, often supplemented with equity and performance bonuses.
                </p>
                <p className="text-white/70">
                  At senior levels, total compensation often includes significant non-salary components.
                </p>
              </div>
            </div>
          </section>
          
          {/* Location-Based Salary Section */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-6">
              Location-Based Salary Insights
            </h2>
            <p className="text-white/70 mb-8 max-w-3xl">
              Geographic location significantly impacts salary levels, with major tech hubs and cities with high costs of living offering higher compensation.
            </p>
            
            <div className="bg-navy-light/30 border border-white/10 rounded-lg p-6 mb-8">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={locationSalaryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis type="number" stroke="#ffffff80" />
                    <YAxis dataKey="location" type="category" stroke="#ffffff80" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1A1F2C", 
                        borderColor: "#ffffff20",
                        color: "#fff" 
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Average Salary']}
                    />
                    <Bar dataKey="salary" fill="#06B6D4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-cyan/20 to-blue-500/20 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-3">Remote Work Impact</h3>
                <p className="text-white/70 mb-4">
                  With the rise of remote work, some companies are adopting location-based pay scales, while others offer standardized compensation regardless of location.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Location-based pay: Adjusted based on local cost of living</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>National average pay: Same regardless of location</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Hybrid models: Base pay plus location adjustment</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-cyan/20 to-blue-500/20 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-3">Relocation Considerations</h3>
                <p className="text-white/70 mb-4">
                  When evaluating job opportunities in different locations, consider these factors beyond the base salary:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Cost of living differences (housing, taxes, transportation)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Quality of life factors (commute times, amenities)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Career growth potential in the local market</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan mr-2">•</span>
                    <span>Relocation assistance and benefits</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* Job Title Salary Comparisons */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-6">
              Job Title Salary Comparisons
            </h2>
            <p className="text-white/70 mb-8 max-w-3xl">
              Your job title significantly impacts your earning potential. Below we compare similar roles across different companies and industries.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-navy-light/50">
                    <th className="border-b border-white/10 py-4 px-6 text-left text-white">Job Title</th>
                    <th className="border-b border-white/10 py-4 px-6 text-left text-white">Entry Level</th>
                    <th className="border-b border-white/10 py-4 px-6 text-left text-white">Mid Level</th>
                    <th className="border-b border-white/10 py-4 px-6 text-left text-white">Senior Level</th>
                    <th className="border-b border-white/10 py-4 px-6 text-left text-white">Key Skills</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-white/5">
                    <td className="border-b border-white/10 py-4 px-6 text-white">Software Engineer</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$70,000 - $95,000</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$95,000 - $135,000</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$135,000 - $180,000+</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">JavaScript, Python, Cloud Services</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border-b border-white/10 py-4 px-6 text-white">UX/UI Designer</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$60,000 - $85,000</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$85,000 - $120,000</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$120,000 - $160,000+</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">Figma, User Research, Prototyping</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border-b border-white/10 py-4 px-6 text-white">Data Scientist</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$75,000 - $100,000</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$100,000 - $140,000</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$140,000 - $190,000+</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">Python, ML Algorithms, Big Data</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border-b border-white/10 py-4 px-6 text-white">Product Manager</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$70,000 - $95,000</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$95,000 - $140,000</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$140,000 - $200,000+</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">Roadmapping, Market Analysis, Agile</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="border-b border-white/10 py-4 px-6 text-white">Marketing Manager</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$55,000 - $80,000</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$80,000 - $120,000</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">$120,000 - $160,000+</td>
                    <td className="border-b border-white/10 py-4 px-6 text-white/70">Digital Marketing, Analytics, SEO</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          {/* Real-time Market Trends */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Real-time Market Trends
            </h2>
            <p className="text-white/70 mb-8 max-w-3xl">
              Tracking salary growth over time helps contextualize offers and provides insights for future negotiations. The chart below shows salary growth rates indexed to 2018 baseline (1.0).
            </p>
            
            <div className="bg-navy-light/30 border border-white/10 rounded-lg p-6 mb-8">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={marketTrendsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="year" stroke="#ffffff80" />
                    <YAxis stroke="#ffffff80" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1A1F2C", 
                        borderColor: "#ffffff20",
                        color: "#fff" 
                      }}
                      formatter={(value) => [`${value.toFixed(2)}x`, 'Growth Rate']}
                    />
                    <Line type="monotone" dataKey="rate" stroke="#06B6D4" strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-cyan/10 border border-cyan/30 rounded-lg p-6">
              <h3 className="text-xl font-medium text-white mb-4">Key Trends to Watch</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Growing Demand</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start">
                      <span className="text-cyan mr-2">•</span>
                      <span>AI and Machine Learning roles (18% YoY growth)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan mr-2">•</span>
                      <span>Cybersecurity specialists (15% YoY growth)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan mr-2">•</span>
                      <span>Cloud architects (14% YoY growth)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Emerging Benefits</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start">
                      <span className="text-cyan mr-2">•</span>
                      <span>Four-day workweeks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan mr-2">•</span>
                      <span>Enhanced mental health coverage</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan mr-2">•</span>
                      <span>Professional development stipends</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SalaryData;
