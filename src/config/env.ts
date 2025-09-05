// Environment variables validation
interface EnvironmentConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  openaiApiKey?: string;
  appEnv: string;
  appUrl: string;
  enableAnalytics: boolean;
  googleAnalyticsId?: string;
}

// Validate required environment variables
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
];

// Check for missing required variables
const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(', ')}. ` +
    'Please check your .env.local file and ensure all required variables are set.'
  );
}

// Export validated environment configuration
export const env: EnvironmentConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
  appUrl: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
};

// Log environment status in development
if (env.appEnv === 'development') {
  console.log('�� Environment loaded:', {
    appEnv: env.appEnv,
    hasSupabaseUrl: !!env.supabaseUrl,
    hasSupabaseKey: !!env.supabaseAnonKey,
    hasOpenAiKey: !!env.openaiApiKey,
    enableAnalytics: env.enableAnalytics,
  });
}
