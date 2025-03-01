
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

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
    // Extract the request body
    const { salaryData, userId } = await req.json();

    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key is not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Construct the prompt for OpenAI
    const prompt = constructPrompt(salaryData);
    
    console.log('Sending prompt to OpenAI:', prompt);

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an AI salary analysis expert. Your task is to analyze job offers and provide insights about their fairness and negotiation advice.
            
            Your response MUST be in the following JSON format:
            {
              "companySpecific": {
                "text": "Your analysis of how this offer compares with similar positions at this company",
                "percentage": "How much above/below average for this company (e.g., 75% above average)"
              },
              "marketComparison": {
                "text": "Your analysis of how this salary compares to the industry benchmark",
                "percentage": "How much above/below market average (e.g., 10% below average)"
              },
              "benefitsAssessment": {
                "text": "Your assessment of the benefits package",
                "rating": "One of: Below Average, At Industry Standard, Above Average"
              },
              "bonusAndEquity": {
                "text": "Your analysis of bonus structure and equity compared to industry norms"
              },
              "growthPotential": {
                "text": "Your assessment of potential for growth and future salary increases"
              },
              "fairnessScore": "A numerical score from 0-100 indicating how fair the offer is",
              "suggestedCounteroffer": "A numerical value suggesting what the user should counter with",
              "negotiationPoints": [
                "List of 3-4 specific negotiation recommendations"
              ]
            }
            
            Your response should be data-backed and specific to the job details provided. Use your knowledge of salary ranges for different roles, locations, and experience levels. Your goal is to help job seekers understand if their offers are competitive and how to negotiate better terms.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });

    const openAIData = await openAIResponse.json();
    
    if (!openAIData.choices || openAIData.choices.length === 0) {
      console.error('Unexpected OpenAI response:', openAIData);
      return new Response(
        JSON.stringify({ error: 'Failed to get a valid response from OpenAI API' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Extract and parse the OpenAI response
    const aiResponseText = openAIData.choices[0].message.content.trim();
    console.log('Raw OpenAI response:', aiResponseText);
    
    let aiAnalysis;
    try {
      // Try to parse the JSON response
      aiAnalysis = JSON.parse(aiResponseText);
      
      // Calculate the suggested counteroffer if it's not a number
      if (typeof aiAnalysis.suggestedCounteroffer === 'string') {
        const numericValue = parseFloat(aiAnalysis.suggestedCounteroffer.replace(/[^0-9.]/g, ''));
        if (!isNaN(numericValue)) {
          aiAnalysis.suggestedCounteroffer = numericValue;
        } else {
          // Fallback: calculate 10% increase if we can't parse the number
          const offeredSalary = parseFloat(salaryData.salary);
          aiAnalysis.suggestedCounteroffer = Math.round(offeredSalary * 1.1);
        }
      }
      
      // Make sure fairnessScore is a number
      if (typeof aiAnalysis.fairnessScore === 'string') {
        const scoreValue = parseInt(aiAnalysis.fairnessScore.replace(/[^0-9]/g, ''));
        if (!isNaN(scoreValue)) {
          aiAnalysis.fairnessScore = scoreValue;
        } else {
          aiAnalysis.fairnessScore = 70; // Default value
        }
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
      // If parsing fails, create a default structure
      aiAnalysis = {
        companySpecific: {
          text: "We couldn't analyze this company specifically due to limited data.",
          percentage: "Unknown"
        },
        marketComparison: {
          text: "Based on industry standards, your offer appears competitive for your role and location.",
          percentage: "Competitive"
        },
        benefitsAssessment: {
          text: "Your benefits package appears to align with industry standards.",
          rating: "At Industry Standard"
        },
        bonusAndEquity: {
          text: "Your bonus structure is in line with similar positions in your field."
        },
        growthPotential: {
          text: "This role has a typical growth trajectory for your industry and level."
        },
        fairnessScore: 75,
        suggestedCounteroffer: Math.round(parseFloat(salaryData.salary) * 1.1),
        negotiationPoints: [
          "Request additional PTO days",
          "Negotiate for a performance review after 6 months",
          "Ask about professional development budget",
          "Inquire about flexible work arrangements"
        ]
      };
    }

    return new Response(
      JSON.stringify({ 
        analysis: aiAnalysis,
        prompt: prompt
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error in analyze-salary function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

// Function to construct the prompt for OpenAI based on the salary data
function constructPrompt(data) {
  const {
    jobTitle,
    companyName,
    jobLevel,
    employmentType,
    experience,
    location,
    salary,
    benefitsPackage
  } = data;

  const formattedSalary = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(parseFloat(salary));

  let prompt = `I need an analysis of a job offer with the following details:

Job Information:
- Job Title: ${jobTitle}
- Employment Type: ${employmentType}
- Experience Level: ${experience}
- Location: ${location}`;

  if (companyName) {
    prompt += `\n- Company Name: ${companyName}`;
  }
  
  if (jobLevel) {
    prompt += `\n- Job Level: ${jobLevel}`;
  }

  prompt += `\n\nCompensation Details:
- Offered Salary: ${formattedSalary} USD`;

  if (benefitsPackage) {
    prompt += `\n- Benefits Package: ${benefitsPackage}`;
  }

  prompt += `\n\nPlease analyze this offer and provide insights on:
1. How this offer compares to similar positions at this company (if known)
2. How the salary compares to the industry benchmark for this role, experience level, and location
3. Assessment of the benefits package compared to industry standards
4. Analysis of the bonus structure and equity (if applicable)
5. Evaluation of growth potential and future salary increase opportunities
6. A fairness score (0-100) for this offer
7. A suggested counteroffer amount in USD
8. 3-4 specific negotiation points

Enhance your analysis with data from sources like LinkedIn Salary Insights, Glassdoor, and Payscale to provide accurate market comparisons.`;

  return prompt;
}
