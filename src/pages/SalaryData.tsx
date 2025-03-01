import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalaryData {
  jobTitle: string;
  location: string;
  experienceLevel: string;
  averageSalary: number;
  salaryRange: [number, number];
  jobOpenings: number;
  skills: string[];
}

const SalaryData = () => {
  // Update page title
  React.useEffect(() => {
    document.title = "Salary Data | NegotAI";
  }, []);

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
    const [comparisonData, setComparisonData] = useState<SalaryData[]>([]);
    const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    if (salaryData) {
      setChartData({
        labels: ['Average Salary', 'Salary Range (Low)', 'Salary Range (High)'],
        datasets: [
          {
            label: 'Salary Information',
            data: [salaryData.averageSalary, salaryData.salaryRange[0], salaryData.salaryRange[1]],
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [salaryData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate fetching salary data from an API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockSalaryData: SalaryData = {
        jobTitle: jobTitle,
        location: location,
        experienceLevel: experienceLevel,
        averageSalary: Math.floor(Math.random() * (150000 - 80000 + 1)) + 80000,
        salaryRange: [
          Math.floor(Math.random() * (80000 - 60000 + 1)) + 60000,
          Math.floor(Math.random() * (200000 - 150000 + 1)) + 150000,
        ],
        jobOpenings: Math.floor(Math.random() * 50) + 10,
        skills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
      };

            setSalaryData(mockSalaryData);
            setShowComparison(false); // Reset comparison view when new data is fetched
    } catch (err) {
      setError("Failed to fetch salary data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

    const handleCompare = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate fetching comparison data from an API
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const mockComparisonData: SalaryData[] = [
                {
                    jobTitle: jobTitle,
                    location: "New York, NY",
                    experienceLevel: experienceLevel,
                    averageSalary: Math.floor(Math.random() * (160000 - 90000 + 1)) + 90000,
                    salaryRange: [
                        Math.floor(Math.random() * (90000 - 70000 + 1)) + 70000,
                        Math.floor(Math.random() * (220000 - 160000 + 1)) + 160000,
                    ],
                    jobOpenings: Math.floor(Math.random() * 60) + 15,
                    skills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
                },
                {
                    jobTitle: jobTitle,
                    location: "Seattle, WA",
                    experienceLevel: experienceLevel,
                    averageSalary: Math.floor(Math.random() * (140000 - 70000 + 1)) + 70000,
                    salaryRange: [
                        Math.floor(Math.random() * (70000 - 50000 + 1)) + 50000,
                        Math.floor(Math.random() * (180000 - 130000 + 1)) + 130000,
                    ],
                    jobOpenings: Math.floor(Math.random() * 40) + 5,
                    skills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
                },
            ];

            setComparisonData(mockComparisonData);
            setShowComparison(true);

            // Prepare chart data for comparison
            const comparisonLabels = mockComparisonData.map(item => item.location);
            const comparisonDatasets = [
                {
                    label: 'Average Salary',
                    data: mockComparisonData.map(item => item.averageSalary),
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderWidth: 1,
                },
            ];

            setChartData({
                labels: comparisonLabels,
                datasets: comparisonDatasets,
            });


        } catch (err) {
            setError("Failed to fetch comparison data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Salary Data
          </h1>
          <p className="text-white/70 text-lg mb-12">
            Explore salary ranges and job market insights for your desired role
            and location.
          </p>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all"
                  placeholder="e.g., Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all"
                  placeholder="e.g., San Francisco, CA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="experienceLevel"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Experience Level
                </label>
                <select
                  id="experienceLevel"
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-all"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  required
                >
                  <option value="">Select Experience Level</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan to-blue-500 text-white font-semibold hover:opacity-90 transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Get Salary Data"}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          {salaryData && !showComparison && (
            <div className="glass-card p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Salary Insights for {salaryData.jobTitle} in {salaryData.location}
              </h2>
              <p className="text-white/70 mb-2">
                Experience Level: {salaryData.experienceLevel}
              </p>
              <p className="text-white/70 mb-2">
                Average Salary: ${salaryData.averageSalary.toLocaleString()}
              </p>
              <p className="text-white/70 mb-4">
                Salary Range: $
                {salaryData.salaryRange[0].toLocaleString()} - $
                {salaryData.salaryRange[1].toLocaleString()}
              </p>
              <p className="text-white/70 mb-4">
                Estimated Job Openings: {salaryData.jobOpenings}
              </p>
              <p className="text-white/70">
                Required Skills: {salaryData.skills.join(", ")}
              </p>
                <button
                    onClick={handleCompare}
                    className="mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan to-blue-500 text-white font-semibold hover:opacity-90 transition-all"
                    disabled={isLoading}
                >
                    Compare to Other Locations
                </button>
            </div>
          )}

            {showComparison && (
                <div className="glass-card p-6 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Salary Comparison for {jobTitle} ({experienceLevel})
                    </h2>
                    {comparisonData.map((data, index) => (
                        <div key={index} className="mb-4 p-4 border border-white/10 rounded-md">
                            <h3 className="text-xl font-semibold text-white">{data.location}</h3>
                            <p className="text-white/70 mb-2">
                                Average Salary: ${data.averageSalary.toLocaleString()}
                            </p>
                            <p className="text-white/70 mb-2">
                                Salary Range: ${data.salaryRange[0].toLocaleString()} - ${data.salaryRange[1].toLocaleString()}
                            </p>
                            <p className="text-white/70">
                                Estimated Job Openings: {data.jobOpenings}
                            </p>
                        </div>
                    ))}
                </div>
            )}

          {chartData.labels.length > 0 && (
            <div className="glass-card p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">
                Salary Chart
              </h2>
              <Bar data={chartData} />
                {showComparison && (
                    <div className="mt-4">
                        <p className="text-white/70">
                            The chart compares the average salaries for the specified job title and experience level across different locations.
                        </p>
                        <ul className="list-disc pl-5 mt-2 text-white/70">
                            {comparisonData.map((data, index) => (
                                <li key={index}>
                                    <strong>{data.location}:</strong> Average Salary - ${typeof data.averageSalary === 'number' ? data.averageSalary.toFixed(0) : data.averageSalary}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
          )}

          <div className="mt-16 bg-gradient-to-r from-cyan/20 to-blue-500/20 border border-white/10 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Negotiate Your Salary?
            </h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Get personalized negotiation strategies and insights to maximize
              your earning potential.
            </p>
            <Link
              to="/#analyze"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gradient-to-r from-cyan to-blue-500 text-white hover:opacity-90 transition-opacity"
            >
              Analyze Your Offer
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SalaryData;
