
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Key, User, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signIn, signUp, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("signin");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    await signIn(email, password);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    await signUp(email, password);
  };

  return (
    <div className="min-h-screen bg-navy relative flex flex-col">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-gradient-radial from-cyan/10 to-transparent blur-3xl"></div>
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-gradient-radial from-purple-500/10 to-transparent blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-10 flex flex-1 items-center justify-center">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center text-white mb-8 hover:text-cyan transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="glass-card p-8 rounded-xl shadow-lg">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">Welcome to NegotAI</h1>
              <p className="text-white/70">Sign in to access your personalized salary insights</p>
            </div>
            
            <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/80">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="text-sm font-medium text-white/80">
                        Password
                      </label>
                      <Link to="/forgot-password" className="text-xs text-cyan hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full relative overflow-hidden px-4 py-2 rounded-lg font-semibold text-white shadow-lg
                      transform transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98]
                      bg-[#008CFF] hover:shadow-[0_0_25px_rgba(0,140,255,0.6)]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="text-sm font-medium text-white/80">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="signup-password" className="text-sm font-medium text-white/80">
                      Password
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium text-white/80">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full relative overflow-hidden px-4 py-2 rounded-lg font-semibold text-white shadow-lg
                      transform transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98]
                      bg-[#008CFF] hover:shadow-[0_0_25px_rgba(0,140,255,0.6)]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-center text-white/60 text-sm">
                <p>Future Sign In Options</p>
                <div className="flex justify-center mt-4 space-x-4">
                  <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" disabled>
                    <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" disabled>
                    <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H6.5v-7H9v7zM7.8 9c-.8 0-1.3-.5-1.3-1.2 0-.7.5-1.2 1.3-1.2.7 0 1.2.5 1.2 1.2 0 .7-.5 1.2-1.2 1.2zM18 17h-2.5v-4c0-1-.4-1.5-1.2-1.5-.7 0-1.2.5-1.2 1.3v4.3h-2.5v-7h2.5v1c.5-.7 1.3-1.2 2.3-1.2 1.6 0 2.7 1 2.7 3v4z"/>
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-xs">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
