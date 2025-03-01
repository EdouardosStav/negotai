
import { Database } from "@/integrations/supabase/client";
import { SalaryAnalysisInput } from "@/services/types/analysisTypes";

type SalaryAnalysis = Database['public']['Tables']['salary_analyses']['Row'];

// Format currency for display
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

// Calculate a counteroffer range based on job level and offered salary
export function calculateCounterOfferRange(
  jobLevel: string, 
  fairnessScore: number, 
  offeredSalary: number
) {
  // Default ranges for different levels
  let minIncrease = 1.10; // 10% minimum increase
  let maxIncrease = 1.20; // 20% maximum increase
  
  // Adjust based on fairness score
  if (fairnessScore < 60) {
    // Very unfair offers get bigger suggested increases
    minIncrease = 1.25; // 25% minimum 
    maxIncrease = 1.40; // 40% maximum
  } else if (fairnessScore < 75) {
    // Somewhat unfair offers
    minIncrease = 1.15; // 15% minimum
    maxIncrease = 1.30; // 30% maximum
  } else if (fairnessScore >= 90) {
    // Very fair offers
    minIncrease = 1.03; // 3% minimum
    maxIncrease = 1.08; // 8% maximum
  }
  
  // Ensure the counter offer is meaningful (at least 10-15% higher for low salaries)
  const min = Math.round(offeredSalary * minIncrease);
  const max = Math.round(offeredSalary * maxIncrease);
  
  return { min, max };
}

// Calculate percentage increase from offered to suggested (middle of range)
export const formatPercentIncrease = (
  offeredSalary: number,
  counterofferMin: number,
  counterofferMax: number
) => {
  // Use middle of range for percentage calculation
  const midRange = (counterofferMin + counterofferMax) / 2;
  return Math.round((midRange / offeredSalary - 1) * 100);
};

// Get justification text for counteroffer
export const getCounterOfferJustification = (
  fairnessScore: number,
  jobLevel: string,
  jobTitle: string,
  location: string,
  aiAnalysis: any,
  percentIncrease: number
) => {
  if (aiAnalysis?.counterofferJustification?.text) {
    return aiAnalysis.counterofferJustification.text;
  }
  
  if (fairnessScore < 70) {
    return `${percentIncrease}% increase to align with market rates for ${jobLevel} ${jobTitle} roles in ${location}`;
  } else if (fairnessScore < 85) {
    return `This increase would bring your compensation in line with industry standards for your experience level`;
  } else {
    return `Your offer is competitive, but a small increase may still be negotiable`;
  }
};
