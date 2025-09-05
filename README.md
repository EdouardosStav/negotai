# NegotAI - AI-Powered Salary Negotiation Platform

**Empowering professionals to negotiate competitive salaries with AI-driven insights**

**Live Demo:** [www.negotai.site](https://www.negotai.site)

---

## Overview

**NegotAI** is a cutting-edge platform that leverages artificial intelligence to analyze job offers and provide personalized salary negotiation strategies. Built with a modern tech stack, it offers professionals the insights and confidence needed to secure competitive compensation packages.

### Key Features

- **AI-Powered Analysis**: Advanced algorithms analyze your job offer against market standards
- **Fairness Score**: Objective evaluation of your offer's competitiveness (0-100 scale)
- **Smart Counter-Offers**: Data-driven salary suggestions based on role, experience, and location
- **Benefits Assessment**: Comprehensive evaluation of non-monetary compensation
- **User Dashboard**: Personal workspace to track and manage multiple negotiations
- **Secure Authentication**: Enterprise-grade security with Supabase Auth
- **Modern UI/UX**: Responsive design with smooth animations and intuitive navigation

---

## Architecture & Technology

### Frontend Stack
- **React 18** - Component-based UI with hooks and modern patterns
- **TypeScript** - Type-safe development with enhanced developer experience
- **Vite** - Next-generation frontend tooling for lightning-fast development
- **TailwindCSS** - Utility-first CSS framework for rapid UI development
- **ShadcN/UI** - High-quality, accessible component library
- **Recharts** - Powerful charting library for data visualizations
- **React Router** - Declarative routing with protected routes

### Backend & Infrastructure
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **Supabase Auth** - User authentication and authorization
- **OpenAI Integration** - AI-powered analysis (production version)
- **Vercel** - Optimized deployment with global CDN
- **TypeScript** - End-to-end type safety

### Development Tools
- **ESLint** - Code linting with TypeScript rules
- **Custom Hooks** - Reusable logic for state management
- **Component-Driven Architecture** - Modular and maintainable codebase
- **Responsive Design** - Mobile-first approach with modern CSS

---

## Project Structure

```
negotai/
├── public/                      # Static assets
│   ├── negotiai-favicon.ico     # Brand favicon
│   └── 404.html                 # GitHub Pages fallback
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── analysis/            # Salary analysis form & results
│   │   ├── dashboard/           # User dashboard components
│   │   ├── forms/               # Contact & modal forms
│   │   ├── legal/               # Privacy, Terms components
│   │   ├── navbar/              # Navigation components
│   │   └── ui/                  # ShadcN UI components
│   ├── context/                 # React Context providers
│   │   └── AuthContext.tsx      # Authentication state
│   ├── hooks/                   # Custom React hooks
│   │   ├── analysis/            # Analysis-specific hooks
│   │   ├── useProfileData.tsx   # User profile management
│   │   └── useSalaryAnalyses.tsx # Analysis data management
│   ├── integrations/            # External service integrations
│   │   └── supabase/            # Supabase client & types
│   ├── pages/                   # Route components
│   │   ├── Dashboard.tsx        # User dashboard
│   │   ├── Analysis.tsx         # Salary analysis page
│   │   └── Auth.tsx             # Authentication page
│   ├── services/                # API and business logic
│   │   ├── analysisService.ts   # Salary analysis operations
│   │   └── types/               # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   │   └── analysisUtils.ts     # Analysis calculations
│   └── data/                    # Static data and configurations
│       └── faq.ts               # FAQ content
├── package.json                 # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # TailwindCSS configuration
├── tsconfig.json               # TypeScript configuration
└── eslint.config.js            # ESLint configuration
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EdouardosStav/negotai.git
   cd negotai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create environment file
   cp .env.example .env.local
   
   # Add your configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

---

## Core Features Deep Dive

### Salary Analysis Engine

The platform's core functionality revolves around a sophisticated analysis system that evaluates job offers across multiple dimensions:

**Analysis Components:**
- **Market Benchmarking**: Compares offered salary against industry standards
- **Location Adjustment**: Factors in cost of living and regional salary variations
- **Experience Weighting**: Adjusts recommendations based on career level
- **Benefits Valuation**: Quantifies non-monetary compensation packages

**Fairness Score Calculation:**
```typescript
interface AnalysisInput {
  jobTitle: string;
  companyName: string;
  jobLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Principal';
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract';
  experience: string;
  location: string;
  salary: number;
  benefitsPackage: string;
}
```

### User Dashboard

Comprehensive workspace for managing salary negotiations:

- **Analysis History**: Track all previous salary evaluations
- **Negotiation Status**: Monitor progress of ongoing negotiations
- **Profile Management**: Update professional information and preferences
- **Export Functionality**: Download analysis reports for reference

### Authentication & Security

Built with enterprise-grade security practices:

- **Supabase Auth**: Secure user authentication with email/password
- **Protected Routes**: Client-side route protection
- **Data Encryption**: All sensitive data encrypted at rest
- **Privacy Controls**: User data deletion and export capabilities

---

## Development Architecture

### Component Design Patterns

**Custom Hooks Strategy:**
- `useAnalysisState` - Manages form state and analysis results
- `useProfileData` - Handles user profile information
- `useSalaryAnalyses` - Manages analysis history and operations

**State Management:**
- React Context for global authentication state
- Local component state for UI interactions
- Custom hooks for business logic encapsulation

**Type Safety:**
- Comprehensive TypeScript interfaces for all data structures
- Strict type checking enabled across the entire codebase
- Generated types from Supabase schema

---

## API Integration

### Supabase Integration

```typescript
// Database Schema (Key Tables)
interface SalaryAnalysis {
  id: string;
  user_id: string;
  job_title: string;
  company_name: string;
  offered_salary: number;
  fairness_score: number;
  suggested_counteroffer: number;
  negotiation_status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}
```

### Service Layer Architecture

```typescript
// Analysis Service Example
export const analyzeSalaryOffer = async (
  data: SalaryAnalysisInput
): Promise<AnalysisResult> => {
  // Implementation includes:
  // - Input validation
  // - Market data processing
  // - AI analysis integration
  // - Result calculation
};
```

---

## Deployment & Production

### Vercel Deployment

The application is optimized for Vercel deployment with:

- **Automatic deployments** from main branch
- **Preview deployments** for pull requests
- **Environment variable management**
- **Custom domain configuration**

### Performance Monitoring

- **Core Web Vitals tracking**
- **Error monitoring and reporting**
- **Analytics integration**
- **Performance budgets and alerts**

---

### Code Standards

- Follow TypeScript best practices
- Maintain component documentation
- Write meaningful commit messages
- Ensure all tests pass before submitting

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author & Contact

**Edouardos Stavrakis**  
*AI Engineer | Tech Consultant | Founder @ NegotAI*

- **LinkedIn**: [edouardosstavrakis](https://www.linkedin.com/in/edouardosstavrakis/)
- **GitHub**: [EdouardosStav](https://github.com/EdouardosStav)
- **Email**: [info@negotai.site](mailto:info@negotai.site)

---

## Acknowledgments

- **OpenAI** for powering the AI analysis capabilities
- **Supabase** for providing robust backend infrastructure
- **Vercel** for seamless deployment and hosting
- **The open-source community** for the amazing tools and libraries

---

*This project represents a portfolio showcase of modern web development practices, combining cutting-edge AI technology with exceptional user experience design.*