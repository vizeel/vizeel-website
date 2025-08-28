import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section 
      id="home-hero" 
      className="hero relative min-h-screen flex items-center justify-center primary-bg overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/vizeel_hero_2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-accent/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered Video Creation</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            AI Videos made simple{" "}
            <span className="accent">
              for SMBs
            </span>{" "}
          </h1>

          {/* Subtitle */}
          <p className="subhead text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            We analyze, plan, and auto-generate on-brand reels —so you can focus on running your business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              className="btn-primary text-lg px-8 py-6 h-auto"
            >
              <Link to="/contact">
                <Play className="w-5 h-5 mr-2" />
                Join waitlist
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-white">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-bounce-gentle" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-bounce-gentle" />
              <span>No Editing Skills Needed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-bounce-gentle" />
              <span>Auto-formatted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-bounce-gentle" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-muted/30 rounded-full blur-xl animate-bounce-gentle" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-success/20 rounded-full blur-xl animate-bounce-gentle" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default HeroSection;