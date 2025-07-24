import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, Upload, Share2, Check, Crown, Zap } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Content",
      description: "Share your product images, brand info, or just describe your idea. Our AI understands what you need.",
      color: "text-primary"
    },
    {
      icon: Wand2,
      title: "AI Creates Your Video",
      description: "Our advanced AI generates a professional, engaging video tailored to your platform and audience.",
      color: "text-secondary"
    },
    {
      icon: Share2,
      title: "1-Click Publishing",
      description: "Publish directly to Instagram, TikTok, YouTube Shorts, Facebook, and Twitter with just one click.",
      color: "text-accent"
    }
  ];

  const pricingTiers = [
    {
      name: "Basic",
      price: "$150",
      description: "Perfect for small businesses and creators",
      features: [
        "4 AI-generated videos",
        "Standard templates",
        "HD quality export",
        "Basic editing options",
        "Email support"
      ],
      popular: false,
      icon: Zap
    },
    {
      name: "Pro",
      price: "$200", 
      description: "Advanced features for growing brands",
      features: [
        "4 premium videos",
        "Advanced templates & effects",
        "4K quality export",
        "Priority generation (faster delivery)",
        "Custom branding options",
        "Priority support"
      ],
      popular: true,
      icon: Crown
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* How It Works */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Create Videos in{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered platform makes video creation effortless, so you can focus on growing your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-vibrant transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="text-center pb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  {step.description}
                </CardDescription>
              </CardContent>
              
              {/* Step Number */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
            </Card>
          ))}
        </div>

        {/* 1-Click Publishing Feature */}
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white text-center mb-20">
          <Share2 className="w-16 h-16 mx-auto mb-6 animate-bounce-gentle" />
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            1-Click Publishing to All Platforms
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Skip the manual uploading. Our platform connects directly to your social accounts 
            and publishes your videos instantly across all platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {["Instagram Reels", "TikTok", "YouTube Shorts", "Facebook", "Twitter"].map((platform) => (
              <Badge key={platform} variant="secondary" className="bg-white/20 text-white border-white/30">
                {platform}
              </Badge>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            Simple Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Choose Your{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No subscriptions, no hidden fees. Pay only for what you need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card key={index} className={`relative overflow-hidden ${tier.popular ? 'border-primary shadow-vibrant scale-105' : 'hover:shadow-lg'} transition-all duration-300`}>
              {tier.popular && (
                <div className="absolute top-0 inset-x-0 bg-gradient-primary text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`text-center ${tier.popular ? 'pt-12' : 'pt-6'}`}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary text-white mb-4 mx-auto">
                  <tier.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <div className="text-4xl font-bold text-primary mb-2">{tier.price}</div>
                <CardDescription className="text-base">{tier.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={tier.popular ? "hero" : "outline"} 
                  className="w-full mt-6"
                  size="lg"
                >
                  Get Started with {tier.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;