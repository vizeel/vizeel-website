import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Sparkles } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleGetStarted = () => {
    if (email && phone) {
      console.log("Lead captured:", { email, phone });
      // Here you would typically send this to your backend
      alert("Thanks for your interest! We'll be in touch soon.");
      setEmail("");
      setPhone("");
    } else {
      alert("Please fill in both email and phone number.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-accent/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered Video Creation</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground">
            Turn Ideas into{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Scroll-Stopping Videos
            </span>{" "}
            in Seconds
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Create stunning promotional videos for Instagram, TikTok, YouTube Shorts, and LinkedIn 
            with our AI-powered platform. No editing skills required.
          </p>

          {/* Lead Capture Form */}
          <div className="max-w-md mx-auto mb-8 space-y-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12"
            />
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="accent" 
              size="lg" 
              onClick={handleGetStarted}
              className="text-lg px-8 py-6 h-auto"
            >
              <Play className="w-5 h-5 mr-2" />
              Submit
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
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
              <span>1-Click Publishing</span>
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