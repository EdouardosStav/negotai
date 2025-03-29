
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";

const Testimonials = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, {
      threshold: 0.1
    });
    
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
  
  const handleShareClick = () => {
    window.open("https://tally.so/r/wozOM5", "_blank");
    toast({
      title: "Thank you for your interest!",
      description: "We've opened a form for you to share your experience.",
      duration: 5000
    });
  };
  
  const handleJoinClick = () => {
    window.open("mailto:earlyaccess@negotiai.com", "_blank");
    toast({
      title: "Early access request sent!",
      description: "We'll be in touch soon about joining our early access program.",
      duration: 5000
    });
  };
  
  return (
    <section id="testimonials" className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl"></div>
      
      <div ref={testimonialsRef} className="container mx-auto px-4 relative z-10 opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <h2 className="section-heading text-center">Success Stories</h2>
        <p className="section-subheading text-center mb-8">
          See how professionals could benefit from NegotAI
        </p>
        
        <div className="max-w-4xl mx-auto mt-12">
          {/* Aspirational Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-xl font-bold text-gradient mb-2">Built to help thousands</div>
              <p className="text-white/70 text-sm">negotiate with confidence</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-xl font-bold text-gradient mb-2">AI tools designed</div>
              <p className="text-white/70 text-sm">to uncover your true value</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-xl font-bold text-gradient mb-2">Created with professionals</div>
              <p className="text-white/70 text-sm">for professionals</p>
            </div>
          </div>
          
          {/* Testimonial Carousel */}
          <div className="relative mb-12">
            <Carousel className="w-full">
              <CarouselContent>
                {/* Sample Story Card */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1">
                    <Card className="glass-card border border-white/10">
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                          <div className="bg-primary/10 text-primary/80 text-xs uppercase font-semibold px-2 py-1 rounded-md w-fit">
                            Sample Story
                          </div>
                          <h3 className="text-lg font-bold text-white">How NegotAI could help</h3>
                          <p className="text-white/80">
                            "The salary insights would be invaluable for my industry and location. 
                            Having AI-generated negotiation scripts would help me approach 
                            conversations with confidence and data to back up my requests."
                          </p>
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-white/60 text-sm">Software Engineer | Tech Industry</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                
                {/* Share Your Story Card */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1">
                    <Card className="glass-card border border-white/10">
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 h-full">
                          <h3 className="text-lg font-bold text-white">Share your story</h3>
                          <p className="text-white/80">
                            We're looking for professionals to join our early access program 
                            and share their salary negotiation experiences.
                          </p>
                          <p className="text-white/80 flex-grow">
                            Your feedback will help us build a better tool for everyone.
                          </p>
                          <div className="mt-4">
                            <Button variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10 hover:scale-[1.02] transition-transform" onClick={handleShareClick}>
                              <Mail className="mr-2 h-4 w-4" />
                              Share Your Experience
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 -translate-x-1/2" />
              <CarouselNext className="absolute right-0 translate-x-1/2" />
            </Carousel>
          </div>

          {/* CTA Section */}
          
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
