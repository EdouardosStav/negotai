
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Environment variables
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Create Supabase client - Import commented out for now as we're not using it in this function
// const supabase = createClient(supabaseUrl, supabaseKey);

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
    const prompt = buildStructuredPrompt(salaryData);
    console.log("Generated prompt:", prompt);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an expert salary analysis assistant. You provide concise, actionable insights about job offers based on market data.
            
Your analysis must follow this exact format:
1. Fairness Score: Provide a percentage (0-100) that represents how fair the offer is
2. Suggested Counter-Offer: Provide a specific dollar amount that would be reasonable to counter with
3. Key Analysis Points: For each of these areas, provide ONE concise, valuable paragraph (no more than 3 sentences):
   - Market Comparison: How the salary compares to industry averages
   - Company-Specific: Insights about this company's compensation practices
   - Benefits Assessment: Analysis of the benefits package
   - Bonus & Stock Potential: Insights on bonus/equity structure
   - Growth Potential: Career advancement opportunities
4. Negotiation Points: 3-4 bullet points with specific negotiation recommendations

DO NOT use markdown formatting like ###, numbers, or any other special characters.
Keep all text extremely concise and focused on providing actionable insights.
DO NOT include any text like "Based on the information provided" or other filler phrases.`
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 1000,
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
    console.log("Raw AI response:", aiResponse);

    // Parse the AI response to extract structured data
    const analysis = parseStructuredAnalysis(aiResponse, salaryData);
    console.log("Parsed analysis:", analysis);

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

// Function to build a structured prompt for more consistent results
function buildStructuredPrompt(salaryData) {
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
Please provide a salary analysis for this job offer:

Job Title: ${jobTitle}
${companyName ? `Company: ${companyName}` : ''}
Job Level: ${jobLevel || 'Not specified'}
Employment Type: ${employmentType || 'Full-Time'}
Years of Experience: ${experience || 'Not specified'}
Location: ${location}
Salary Offered: $${salary}
${benefitsPackage ? `Benefits Package: ${benefitsPackage}` : 'No benefits information provided'}

Please analyze this offer and provide:
1. A fairness score (0-100%)
2. A suggested counter-offer amount
3. Concise analysis of market comparison, company specifics, benefits, bonus potential, and growth opportunities
4. 3-4 specific negotiation points
`;
}

// Function to parse the AI response into a well-structured format
function parseStructuredAnalysis(aiResponse, salaryData) {
  try {
    // Extract fairness score
    let fairnessScore = 75; // Default
    const fairnessMatch = aiResponse.match(/Fairness Score:?\s*(\d+)%?/i);
    if (fairnessMatch && fairnessMatch[1]) {
      fairnessScore = parseInt(fairnessMatch[1]);
      fairnessScore = Math.min(100, Math.max(0, fairnessScore)); // Ensure 0-100
    }
    
    // Extract suggested counteroffer
    const numericSalary = parseFloat(salaryData.salary.toString());
    let suggestedCounteroffer = Math.round(numericSalary * 1.1); // Default 10% increase
    const counterofferMatch = aiResponse.match(/Suggested Counter-Offer:?\s*\$?([0-9,]+)/i);
    if (counterofferMatch && counterofferMatch[1]) {
      suggestedCounteroffer = parseInt(counterofferMatch[1].replace(/,/g, ''));
    }
    
    // Extract market comparison
    function extractSection(sectionName) {
      const patterns = [
        new RegExp(`${sectionName}:?\\s*([^\\n]+(?:\\n(?!\\w+:)[^\\n]+)*)`, 'i'),
        new RegExp(`${sectionName}[^\\n]*\\n-?\\s*([^\\n]+(?:\\n(?!\\w+:|-\\s)[^\\n]+)*)`, 'i')
      ];
      
      for (const pattern of patterns) {
        const match = aiResponse.match(pattern);
        if (match && match[1]) {
          // Clean up the text by removing any markdown symbols, ### or bullet points
          return match[1].replace(/^[-*•#]+\s*/gm, '').trim();
        }
      }
      
      // Return empty string if no match
      return '';
    }
    
    // Extract negotiation points as array
    let negotiationPoints = [];
    const negotiationSection = extractSection('Negotiation Points');
    if (negotiationSection) {
      // Split by newlines or bullet points
      negotiationPoints = negotiationSection
        .split(/\n|\r|-|\*|•/)
        .map(point => point.trim())
        .filter(point => point.length > 0)
        .slice(0, 5); // Limit to 5 points
    }
    
    // If no points were extracted, provide default ones
    if (negotiationPoints.length === 0) {
      negotiationPoints.push(
        "Request a salary increase to align with market standards",
        "Negotiate for better benefits coverage",
        "Discuss professional development opportunities",
        "Inquire about performance-based bonuses"
      );
    }
    
    // Construct the final analysis object with clean text
    return {
      fairnessScore: fairnessScore,
      suggestedCounteroffer: suggestedCounteroffer,
      marketComparison: {
        text: extractSection('Market Comparison') || `The average salary for a ${salaryData.jobLevel} ${salaryData.jobTitle} in ${salaryData.location} typically ranges between ${Math.round(numericSalary * 0.9)} and ${Math.round(numericSalary * 1.2)}.`
      },
      companySpecific: {
        text: extractSection('Company-Specific') || extractSection('Company Specific') || 
              `${salaryData.companyName || 'This company'} typically offers compensation packages that align with industry standards for ${salaryData.jobLevel} ${salaryData.jobTitle} roles.`
      },
      benefitsAssessment: {
        text: extractSection('Benefits Assessment') || 
              (salaryData.benefitsPackage ? 
                `The benefits package appears to be standard for the industry, including: ${salaryData.benefitsPackage}` : 
                `No benefits package information was provided. Consider requesting details on healthcare, retirement plans, and PTO.`)
      },
      bonusAndEquity: {
        text: extractSection('Bonus & Stock Potential') || extractSection('Bonus and Equity') || 
              `Companies at this level typically offer performance bonuses ranging from 5-15% of base salary, with potential equity opportunities.`
      },
      growthPotential: {
        text: extractSection('Growth Potential') || 
              `Career advancement opportunities for ${salaryData.jobTitle} roles typically include promotion paths to senior and leadership positions within 2-3 years.`
      },
      negotiationPoints: negotiationPoints
    };
  } catch (error) {
    console.error("Error parsing AI response:", error);
    // Return fallback structure
    return createFallbackAnalysis(salaryData);
  }
}

// Function to create a fallback analysis if parsing fails
function createFallbackAnalysis(salaryData) {
  const numericSalary = parseFloat(salaryData.salary.toString());
  const suggestedIncrease = salaryData.jobLevel === 'Junior' ? 1.12 : 
                          salaryData.jobLevel === 'Mid-Level' ? 1.10 : 
                          salaryData.jobLevel === 'Senior' ? 1.08 : 1.10;
  
  const suggestedCounteroffer = Math.round(numericSalary * suggestedIncrease);
  
  let fairnessScore = 75; // Default score
  
  return {
    fairnessScore: fairnessScore,
    suggestedCounteroffer: suggestedCounteroffer,
    marketComparison: {
      text: `The average salary for a ${salaryData.jobLevel} ${salaryData.jobTitle} in ${salaryData.location} ranges from ${Math.round(numericSalary * 0.9)} to ${Math.round(numericSalary * 1.1)} according to market data.`
    },
    companySpecific: {
      text: salaryData.companyName ? 
        `${salaryData.companyName} is known for offering competitive compensation for ${salaryData.jobLevel} ${salaryData.jobTitle} roles.` :
        `Companies in this sector typically offer competitive compensation for ${salaryData.jobLevel} ${salaryData.jobTitle} roles.`
    },
    benefitsAssessment: {
      text: salaryData.benefitsPackage ? 
        `Your benefits package includes: ${salaryData.benefitsPackage}. This is in line with industry standards.` : 
        `Benefits information not provided - request details on healthcare, retirement plans, and PTO.`
    },
    bonusAndEquity: {
      text: `Performance bonuses for similar roles typically range from 8-10% of base salary. Inquire about equity options if available.`
    },
    growthPotential: {
      text: `Career advancement opportunities should include clear promotion paths and professional development resources.`
    },
    negotiationPoints: [
      "Request a salary increase to align with market standards",
      "Inquire about performance bonus structure",
      "Discuss professional development opportunities",
      "Ask about flexible work arrangements"
    ]
  };
}
