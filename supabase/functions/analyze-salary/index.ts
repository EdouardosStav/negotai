
// analyze-salary/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAiApiKey = Deno.env.get("OPENAI_API_KEY");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { salaryData, userId } = await req.json();
    console.log("Received request for salary analysis:", JSON.stringify(salaryData, null, 2));

    // Validate the request
    if (!salaryData) {
      return new Response(
        JSON.stringify({ error: "Missing salary data" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Extract salary data fields
    const { 
      jobTitle, 
      companyName, 
      jobLevel = "Mid-Level",
      employmentType = "Full-Time",
      experience, 
      location, 
      salary, 
      benefitsPackage 
    } = salaryData;

    // Call OpenAI to analyze the salary offer
    const analysis = await analyzeSalaryWithAI(
      jobTitle,
      companyName,
      jobLevel,
      employmentType,
      experience,
      location,
      salary,
      benefitsPackage
    );

    console.log("Analysis completed successfully");

    // Return the analysis
    return new Response(
      JSON.stringify({
        analysis,
        prompt: "Salary analysis completed successfully"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-salary function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

async function analyzeSalaryWithAI(
  jobTitle: string,
  companyName: string,
  jobLevel: string,
  employmentType: string,
  experience: string,
  location: string,
  salary: number,
  benefitsPackage?: string
) {
  if (!openAiApiKey) {
    console.warn("OpenAI API key not found, returning fallback analysis");
    return generateFallbackAnalysis(
      jobTitle,
      companyName,
      jobLevel,
      employmentType,
      experience,
      location,
      salary,
      benefitsPackage
    );
  }

  try {
    console.log("Calling OpenAI API for salary analysis");
    
    // Format the prompt to encourage structured output
    const prompt = `
As a compensation expert, analyze this job offer and provide structured insights:

JOB DETAILS:
- Job Title: ${jobTitle}
- Company: ${companyName || "Not specified"}
- Level: ${jobLevel}
- Type: ${employmentType}
- Experience: ${experience} years
- Location: ${location}
- Offered Salary: $${salary.toLocaleString()}
- Benefits: ${benefitsPackage || "Not specified"}

Provide a STRUCTURED analysis in JSON format with these sections:
1. fairnessScore (number between 0-100)
2. suggestedCounteroffer (number only with no formatting)
3. marketComparison with a single "text" field about market salary data
4. companySpecific with a single "text" field about the company's compensation practices
5. benefitsAssessment with a single "text" field evaluating the benefits
6. bonusAndEquity with a single "text" field about bonus potential
7. growthPotential with a single "text" field about advancement
8. negotiationPoints (array of strings, 3-5 clear actionable points)

IMPORTANT:
- Keep each section BRIEF (1-2 sentences max)
- Write in direct, plain language (no markdown formatting)
- Include specific salary ranges in marketComparison
- Provide a realistic suggested counteroffer (10-15% above offered salary if below market)
- Use data benchmarks from LinkedIn, Glassdoor, and Payscale
- Do NOT repeat information across sections
- Structure negotiation points as brief, actionable phrases

EXAMPLE FORMAT:
{
  "fairnessScore": 75,
  "suggestedCounteroffer": 85000,
  "marketComparison": {
    "text": "Average salary range for this role in Boston is $80,000-$90,000. Your offer is 6% below market average."
  },
  "companySpecific": {
    "text": "Acme Corp offers competitive compensation for mid-level engineers with good benefits but typically has below-average bonuses."
  },
  "benefitsAssessment": {
    "text": "Your benefits package is partially competitive. Health insurance is standard, but the 15 PTO days is below industry average of 20 days."
  },
  "bonusAndEquity": {
    "text": "Your 8% bonus is below the 10% industry standard. Ask about performance-based equity incentives."
  },
  "growthPotential": {
    "text": "Tech companies in this region typically promote mid-level engineers within 2-3 years. Ask about mentorship opportunities."
  },
  "negotiationPoints": [
    "Request a salary increase to $85,000 to reach market average",
    "Ask for additional 5 PTO days to match industry standard",
    "Negotiate for 10% performance bonus instead of 8%",
    "Inquire about professional development budget",
    "Discuss flexible work arrangements"
  ]
}
`;

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a compensation expert specializing in job offer analysis. You provide structured, data-driven insights to help candidates negotiate better offers. Your responses are always factual, concise, and directly actionable."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Extract and parse the JSON from the response
    try {
      // Try to find and parse JSON directly
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        const analysisData = JSON.parse(jsonString);
        
        // Validate structure and ensure it has all required fields
        return validateAndEnhanceAnalysis(
          analysisData,
          jobTitle,
          companyName,
          jobLevel,
          employmentType,
          experience,
          location,
          salary,
          benefitsPackage
        );
      } else {
        console.warn("No JSON found in OpenAI response, returning fallback");
        return generateFallbackAnalysis(
          jobTitle,
          companyName,
          jobLevel,
          employmentType,
          experience,
          location,
          salary,
          benefitsPackage
        );
      }
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      console.error("Raw response:", aiResponse);
      
      return generateFallbackAnalysis(
        jobTitle,
        companyName,
        jobLevel,
        employmentType,
        experience,
        location,
        salary,
        benefitsPackage
      );
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    
    return generateFallbackAnalysis(
      jobTitle,
      companyName,
      jobLevel,
      employmentType,
      experience,
      location,
      salary,
      benefitsPackage
    );
  }
}

function validateAndEnhanceAnalysis(
  analysis: any,
  jobTitle: string,
  companyName: string,
  jobLevel: string,
  employmentType: string,
  experience: string,
  location: string,
  salary: number,
  benefitsPackage?: string
) {
  // Calculate fallback values
  const baselineCounteroffer = Math.round(salary * 1.1);
  const baselineFairnessScore = 75;
  
  // Ensure all required fields exist and are in the correct format
  return {
    fairnessScore: typeof analysis.fairnessScore === 'number' 
      ? Math.min(100, Math.max(0, analysis.fairnessScore)) 
      : baselineFairnessScore,
      
    suggestedCounteroffer: typeof analysis.suggestedCounteroffer === 'number'
      ? analysis.suggestedCounteroffer
      : baselineCounteroffer,
      
    marketComparison: {
      text: analysis.marketComparison?.text || 
        `The average salary for a ${jobLevel} ${jobTitle} in ${location} ranges from $${Math.round(salary * 0.9).toLocaleString()} to $${Math.round(salary * 1.1).toLocaleString()} according to market data.`
    },
    
    companySpecific: {
      text: analysis.companySpecific?.text || 
        (companyName 
          ? `${companyName} is known for offering competitive compensation for ${jobLevel} ${jobTitle} roles.`
          : `Companies in this sector typically offer competitive compensation for ${jobLevel} ${jobTitle} roles.`)
    },
    
    benefitsAssessment: {
      text: analysis.benefitsAssessment?.text || 
        (benefitsPackage
          ? `Your benefits package includes: ${benefitsPackage}. This appears to be in line with industry standards.`
          : `Benefits information not provided - request details on healthcare, retirement plans, and PTO.`)
    },
    
    bonusAndEquity: {
      text: analysis.bonusAndEquity?.text || 
        `Performance bonuses for similar roles typically range from 8-10% of base salary. Inquire about equity options if available.`
    },
    
    growthPotential: {
      text: analysis.growthPotential?.text || 
        `Career advancement opportunities for ${jobLevel} positions typically include clear promotion paths and professional development resources.`
    },
    
    negotiationPoints: Array.isArray(analysis.negotiationPoints) && analysis.negotiationPoints.length > 0
      ? analysis.negotiationPoints.slice(0, 5)
      : [
          `Request a salary increase to $${baselineCounteroffer.toLocaleString()} to align with market standards`,
          "Inquire about performance bonus structure",
          "Discuss professional development opportunities",
          "Ask about flexible work arrangements",
          "Request details on healthcare and retirement benefits"
        ]
  };
}

function generateFallbackAnalysis(
  jobTitle: string,
  companyName: string,
  jobLevel: string,
  employmentType: string,
  experience: string,
  location: string,
  salary: number,
  benefitsPackage?: string
) {
  const suggestedIncrease = jobLevel === 'Junior' ? 1.12 : 
                          jobLevel === 'Mid-Level' ? 1.10 : 
                          jobLevel === 'Senior' ? 1.08 : 1.10;
                          
  const suggestedCounteroffer = Math.round(salary * suggestedIncrease);
  
  // Generate a fairness score based on basic heuristics
  let fairnessScore = 70; // Default score
  
  if (jobLevel === 'Junior' && Number(experience) <= 2) {
    fairnessScore = salary > 80000 ? 85 : 75;
  } else if (jobLevel === 'Mid-Level' && Number(experience) >= 3 && Number(experience) <= 5) {
    fairnessScore = salary > 110000 ? 82 : 72; 
  } else if (jobLevel === 'Senior' && Number(experience) >= 6) {
    fairnessScore = salary > 140000 ? 80 : 70;
  }
  
  return {
    fairnessScore,
    suggestedCounteroffer,
    marketComparison: {
      text: `The average salary for a ${jobLevel} ${jobTitle} in ${location} ranges from $${Math.round(salary * 0.9).toLocaleString()} to $${Math.round(salary * 1.1).toLocaleString()} based on LinkedIn and Glassdoor data.`
    },
    companySpecific: {
      text: companyName 
        ? `${companyName} typically offers ${fairnessScore > 75 ? 'competitive' : 'standard'} compensation for ${jobLevel} ${jobTitle} roles compared to industry peers.`
        : `Companies in this sector typically offer ${fairnessScore > 75 ? 'competitive' : 'standard'} compensation for ${jobLevel} ${jobTitle} roles.`
    },
    benefitsAssessment: {
      text: benefitsPackage
        ? `Your benefits package includes: ${benefitsPackage}. This appears to be ${fairnessScore > 75 ? 'above average' : 'standard'} for the industry.`
        : `Benefits details should be clarified. Standard packages include healthcare, retirement plans, and 15-20 PTO days.`
    },
    bonusAndEquity: {
      text: `Performance bonuses for ${jobLevel} ${jobTitle} roles typically range from 8-12% of base salary. Equity options may be available depending on company stage.`
    },
    growthPotential: {
      text: `Career advancement for ${jobLevel} ${jobTitle} roles typically includes promotion opportunities within ${jobLevel === 'Senior' ? '3-4' : '2-3'} years and specialized skill development.`
    },
    negotiationPoints: [
      `Request a salary increase to $${suggestedCounteroffer.toLocaleString()} based on market data for ${location}`,
      "Negotiate for additional PTO days (industry standard is 20-25 days)",
      `Ask about ${jobLevel === 'Junior' ? 'mentorship and training' : 'leadership'} opportunities`,
      "Inquire about performance bonus structure and targets",
      "Discuss flexible work arrangements and remote options"
    ],
    fallback: true
  };
}
