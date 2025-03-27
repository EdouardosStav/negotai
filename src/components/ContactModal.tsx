
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Close modal after 3 seconds on successful submission
    if (isSuccess) {
      const timer = setTimeout(() => {
        onClose();
        // Reset form state after closing
        setIsSuccess(false);
        setName("");
        setEmail("");
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Set name and email if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Set email from user data
      setEmail(user.email || "");
      
      // If user has metadata with name, use it
      const metadata = user.user_metadata;
      if (metadata && (metadata.name || metadata.full_name)) {
        setName(metadata.name || metadata.full_name || "");
      }
    }
  }, [isAuthenticated, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please provide a message",
        variant: "destructive",
      });
      return;
    }

    // Email validation only required for non-authenticated users
    if (!isAuthenticated) {
      if (!name.trim() || !email.trim()) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast({
          title: "Error",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would send data to Supabase
      console.log("Form submitted:", { name, email, message });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-navy-dark border border-white/10 rounded-lg shadow-xl p-6 animate-fade-in">
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
        
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan/20 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Thank you for reaching out!</h3>
            <p className="text-white/70">We will get back to you soon.</p>
            <p className="text-white/50 text-sm mt-4">Closing in a moment...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isAuthenticated && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-navy-light border border-white/10 rounded-md py-2 px-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-navy-light border border-white/10 rounded-md py-2 px-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50"
                    placeholder="Your email"
                  />
                </div>
              </>
            )}
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-navy-light border border-white/10 rounded-md py-2 px-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan/50 resize-none"
                placeholder="How can we help you?"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
