
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, User, DollarSign, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Jessica T.",
    role: "Product Manager",
    content: "NegotAI helped me land a $25K higher salary than initially offered. The AI-generated talking points gave me the confidence to negotiate effectively.",
    increase: 25000,
    rating: 5,
    industry: "Tech"
  },
  {
    id: 2,
    name: "Michael R.",
    role: "Software Engineer",
    content: "I was about to accept the first offer until NegotAI showed me I was being underpaid by 15%. Used their strategy and got a significant bump plus better benefits.",
    increase: 18500,
    rating: 5,
    industry: "Software"
  },
  {
    id: 3,
    name: "Sarah K.",
    role: "Marketing Director",
    content: "The salary insights were spot-on for my industry and location. NegotAI's negotiation script helped me secure not just more pay, but also additional stock options.",
    increase: 32000,
    rating: 5,
    industry: "Marketing"
  },
  {
    id: 4,
    name: "David L.",
    role: "Financial Analyst",
    content: "As someone who hates negotiating, this tool was a lifesaver. The personalized counter-offer strategy worked perfectly and I got $15K more than the initial offer.",
    increase: 15000,
    rating: 4,
    industry: "Finance"
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const testimonialsEl = testimonialsRef.current;
    if (testimonialsEl) {
      observer.observe(testimonialsEl);
    }
    
    return () => {
      if (testimonialsEl) {
        observer.unobserve(testimonialsEl);
      }
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const calculateTotalIncrease = () => {
    return testimonials.reduce((sum, testimonial) => sum + testimonial.increase, 0);
  };

  return (
    <section id="testimonials" className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl"></div>
      
      <div 
        ref={testimonialsRef}
        className="container mx-auto px-4 relative z-10 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <h2 className="section-heading text-center">Success Stories</h2>
        <p className="section-subheading text-center">
          See how professionals like you have improved their compensation with NegotAI
        </p>
        
        <div className="max-w-4xl mx-auto mt-12">
          {/* Success Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-gradient mb-2">5,200+</div>
              <p className="text-white/70 text-sm">Successful Negotiations</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-gradient mb-2">${(calculateTotalIncrease() / 1000000).toFixed(1)}M+</div>
              <p className="text-white/70 text-sm">Total Salary Increases</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-gradient mb-2">98%</div>
              <p className="text-white/70 text-sm">Client Satisfaction</p>
            </div>
          </div>
          
          {/* Testimonial Slider */}
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="glass-card p-8 md:p-10 rounded-xl relative">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10">
                          <User className="text-white/70" size={24} />
                        </div>
                        <div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={i < testimonial.rating ? "text-premium fill-premium" : "text-white/20"} 
                              />
                            ))}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">{testimonial.name}</h3>
                          <div className="text-white/60 text-sm mb-4">{testimonial.role} | {testimonial.industry}</div>
                          <p className="text-white/80 mb-6">"{testimonial.content}"</p>
                          <div className="flex items-center px-4 py-3 bg-primary/10 rounded-lg border border-primary/20 w-fit">
                            <DollarSign className="text-success mr-2" size={18} />
                            <span className="text-white font-medium">Salary Increase: </span>
                            <span className="text-success font-bold ml-2">${testimonial.increase.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <div className="flex items-center gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex ? "bg-cyan" : "bg-white/20"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} className="text-white" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
