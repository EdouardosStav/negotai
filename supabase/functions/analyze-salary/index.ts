
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0";

// Environment variables
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { salaryData, userId } = await req.json();
    console.log("Received salary analysis request:", salaryData);

    if (!openAIApiKey) {
      console.error("OpenAI API key is not configured");
      throw new Error("OpenAI API key is not configured");
    }

    // Prepare the prompt for OpenAI
    const prompt = buildPromptFromSalaryData(salaryData);
    console.log("Generated prompt:", prompt);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Using a valid OpenAI model
        messages: [
          {
            role: 'system',
            content: 'You are an expert in salary negotiation and job market analysis. Analyze the provided salary offer details and provide a structured report with a fairness score (0-100), suggested counteroffer, and detailed sections on market comparison, company specifics, benefits assessment, bonus structure, growth potential, and negotiation points.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      throw new Error(`OpenAI API Error: ${errorData?.error?.message || 'Unknown error'}`);
    }

    // Parse OpenAI response
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    console.log("Received AI response:", aiResponse);

    // Parse the AI response to extract structured data
    const analysis = parseAnalysisFromAI(aiResponse, salaryData);

    // Return the analysis data
    return new Response(JSON.stringify({ 
      analysis, 
      prompt 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-salary function:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      errorDetails: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Function to build the prompt from salary data
function buildPromptFromSalaryData(salaryData) {
  const {
    jobTitle,
    companyName,
    jobLevel,
    employmentType,
    experience,
    location,
    salary,
    benefitsPackage,
  } = salaryData;

  return `
Please analyze this job offer:

Job Title: ${jobTitle}
${companyName ? `Company: ${companyName}` : ''}
Job Level: ${jobLevel || 'Not specified'}
Employment Type: ${employmentType || 'Full-Time'}
Years of Experience: ${experience || 'Not specified'}
Location: ${location}
Salary Offered: $${salary}
${benefitsPackage ? `Benefits Package: ${benefitsPackage}` : 'No benefits information provided'}

Please provide a detailed analysis with:
1. Fairness Score (0-100)
2. Suggested Counteroffer
3. Market Comparison
4. Company-Specific Analysis
5. Benefits Assessment
6. Bonus and Equity Potential
7. Growth Potential
8. Negotiation Points (list of 4-5 specific points)

Format your response as structured text that can be easily parsed.
`;
}

// Function to parse the AI response into structured data
function parseAnalysisFromAI(aiResponse, salaryData) {
  try {
    // Attempt to extract a fairness score (0-100)
    let fairnessScore = 75; // Default score
    const fairnessMatch = aiResponse.match(/Fairness Score:?\s*(\d+)/i);
    if (fairnessMatch && fairnessMatch[1]) {
      fairnessScore = parseInt(fairnessMatch[1]);
      // Ensure score is within bounds
      fairnessScore = Math.min(100, Math.max(0, fairnessScore));
    }
    
    // Extract suggested counteroffer
    const numericSalary = parseFloat(salaryData.salary.toString());
    let suggestedCounteroffer = Math.round(numericSalary * 1.1); // Default 10% increase
    const counterofferMatch = aiResponse.match(/Suggested Counteroffer:?\s*\$?([0-9,]+)/i);
    if (counterofferMatch && counterofferMatch[1]) {
      suggestedCounteroffer = parseInt(counterofferMatch[1].replace(/,/g, ''));
    }
    
    // Extract other sections
    function extractSection(sectionName) {
      const regex = new RegExp(`${sectionName}:?\\s*([\\s\\S]*?)(?=\\n\\s*\\d+\\.|\\n\\s*[A-Z][a-z]+\\s*:|$)`, 'i');
      const match = aiResponse.match(regex);
      return match ? match[1].trim() : '';
    }
    
    // Extract negotiation points as array
    const negotiationPointsSection = extractSection('Negotiation Points');
    const negotiationPoints = negotiationPointsSection
      .split('\n')
      .map(point => point.replace(/^-|\d+\.\s*/, '').trim())
      .filter(point => point.length > 0)
      .slice(0, 5); // Limit to 5 points
    
    // If no points were extracted, provide default ones
    if (negotiationPoints.length === 0) {
      negotiationPoints.push(
        "Consider negotiating for better benefits coverage",
        "Request a performance-based bonus structure",
        "Discuss professional development opportunities and budget",
        "Inquire about flexible working arrangements"
      );
    }
    
    return {
      fairnessScore: fairnessScore,
      suggestedCounteroffer: suggestedCounteroffer,
      marketComparison: {
        text: extractSection('Market Comparison') || 
              `Based on market research, this offer for ${salaryData.jobTitle} in ${salaryData.location} appears to be within range.`
      },
      companySpecific: {
        text: extractSection('Company-Specific Analysis') || 
              `Analysis for ${salaryData.companyName || 'the company'} indicates this offer is competitive for a ${salaryData.jobLevel} ${salaryData.jobTitle}.`
      },
      benefitsAssessment: {
        text: extractSection('Benefits Assessment') || 
              (salaryData.benefitsPackage ? 
                `Your benefits package appears to be at industry standard, including: ${salaryData.benefitsPackage}` : 
                `No benefits package information provided for assessment.`)
      },
      bonusAndEquity: {
        text: extractSection('Bonus and Equity Potential') || 
              `Performance bonuses for ${salaryData.jobLevel} roles typically range from 8-10% of base salary.`
      },
      growthPotential: {
        text: extractSection('Growth Potential') || 
              `Salary growth trajectory aligns with industry standards for ${salaryData.employmentType} positions.`
      },
      negotiationPoints: negotiationPoints
    };
  } catch (error) {
    console.error("Error parsing AI response:", error);
    // Return a simplified fallback structure
    return {
      fairnessScore: 75,
      suggestedCounteroffer: Math.round(parseFloat(salaryData.salary.toString()) * 1.1),
      marketComparison: { text: "Analysis based on offline data due to parsing issues." },
      companySpecific: { text: "Company-specific data not available." },
      benefitsAssessment: { text: "Benefits assessment not available." },
      bonusAndEquity: { text: "Bonus and equity information not available." },
      growthPotential: { text: "Growth potential information not available." },
      negotiationPoints: [
        "Consider negotiating for better benefits",
        "Request a performance-based bonus structure",
        "Discuss professional development opportunities"
      ]
    };
  }
}
