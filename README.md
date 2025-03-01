# NegotAI - AI-Powered Salary Negotiation Platform

## 📌 Overview

NegotAI is an AI-driven platform designed to help professionals analyze and negotiate their job offers with confidence. Leveraging OpenAI's API, real-time market data from LinkedIn, Glassdoor, and Payscale, and Supabase for authentication and data storage, NegotAI provides users with personalized salary insights and strategic negotiation recommendations.

## 🚀 Features

- **Salary Analysis**: Enter job details to receive AI-generated insights on your offer.
- **Fairness Score**: Evaluate how competitive your salary offer is compared to industry standards.
- **Suggested Counter-Offer**: AI-driven recommendations for an optimized salary request.
- **Benefits Assessment**: Analyze non-monetary compensations such as bonuses, equity, and PTO.
- **User Dashboard**: Save and track salary negotiations.
- **Authentication**: Secure login using Supabase Auth.
- **Modern UI**: Built with React, TailwindCSS, and ShadCN for a sleek, user-friendly experience.

## 🏗️ Tech Stack

### Frontend

- **React.js** - Component-based UI library
- **TypeScript** - Ensuring type safety
- **Vite** - Fast and optimized build tool
- **ShadCN/UI** - Modern component library
- **TailwindCSS** - Responsive styling

### Backend & Database

- **Supabase** - Authentication, database, and edge functions
- **OpenAI API** - AI-powered salary analysis and negotiation insights
- **Edge Functions** - Serverless execution for real-time processing

### DevOps & Deployment

- **GitHub Actions** - Automated CI/CD workflows
- **Vercel** - Frontend hosting for fast performance
- **Docker** (Optional) - Containerized local development

## 📂 Project Structure

```
📦 negotai
├── 📂 public                 # Static assets (favicons, images)
├── 📂 src                    # Main application source code
│   ├── 📂 components         # Reusable UI components
│   ├── 📂 context            # React contexts for global state
│   ├── 📂 hooks              # Custom hooks
│   ├── 📂 integrations       # API integrations
│   ├── 📂 lib                # Utility functions
│   ├── 📂 pages              # Page components (e.g., Dashboard, Salary Analysis)
│   ├── 📂 services           # API and data-fetching logic
│   ├── 📂 utils              # Helper functions
├── 📂 supabase               # Supabase edge functions & config
├── 📜 index.html             # HTML entry point
├── 📜 package.json           # Dependencies and scripts
├── 📜 README.md              # Project documentation
├── 📜 vite.config.ts         # Vite configuration
└── 📜 tailwind.config.ts     # TailwindCSS configuration
```

## 🔧 Setup & Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v16+)
- npm or yarn
- Supabase account and project setup
- OpenAI API Key

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/negotai.git
   cd negotai
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables: Create a `.env` file in the root directory and add:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Deploying to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Login to Vercel:
   ```bash
   vercel login
   ```
3. Deploy the project:
   ```bash
   vercel
   ```

## 🤖 API Usage

### Salary Analysis Request

Endpoint: `POST /api/analyze-offer`

#### Request Payload

```json
{
  "jobTitle": "Software Engineer",
  "companyName": "TechCorp Inc.",
  "jobLevel": "Senior",
  "employmentType": "Full-Time",
  "experienceYears": "3-5 years",
  "location": "San Francisco, CA",
  "offeredSalary": 120000,
  "benefits": "Health Insurance, 2% Equity, 8% Bonus, Hybrid Work, 15 PTO Days"
}
```

#### Response

```json
{
  "fairnessScore": 75,
  "suggestedCounterOffer": 134400,
  "marketComparison": "Your offer is in the 70% range compared to industry standards.",
  "benefitsAnalysis": "Your equity (2%) is competitive, but PTO (15 days) is below the industry average (20 days).",
  "negotiationTips": [
    "Request 20 PTO days",
    "Negotiate for a 10% performance bonus",
    "Ask about professional development budget"
  ]
}
```

## 📜 License

This project is licensed under the MIT License.

## ✨ Contributors

- **Edouardos Stavrakis** - Creator & Developer

## 📬 Contact

For inquiries, reach out via [info@negotai.site](mailto\:info@negotai.site)

---

Feel free to modify and add more details as necessary!

