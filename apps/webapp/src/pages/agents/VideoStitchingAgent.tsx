import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Scissors, Zap, Crown, Sparkles, HelpCircle, Shield, Mail, Headphones } from "lucide-react";

const VideoStitchingAgent = () => {
  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Try the service",
      icon: Sparkles,
      credits: "500 credits (8m 20s)",
      features: [
        "500 credits per month (8m 20s)",
        "Watermark on videos",
        "Limited rendering queue",
        "Basic support (community/forum/FAQ only)"
      ],
      popular: false,
      color: "gray",
      billing: "/month"
    },
    {
      name: "Starter", 
      price: 9.99,
      description: "Ideal for hobbyists & small businesses",
      icon: Scissors,
      credits: "3,600 credits (60m)",
      features: [
        "3,600 credits per month (60m)",
        "Watermark removal",
        "Standard rendering queue",
        "Community support"
      ],
      popular: false,
      color: "green",
      billing: "/month"
    },
    {
      name: "Growth",
      price: 29.99,
      description: "Best value for growing businesses",
      icon: Zap,
      credits: "12,000 credits (3h 20m)",
      features: [
        "12,000 credits per month (3h 20m)",
        "API access included",
        "Priority rendering queue", 
        "Email support within 24h"
      ],
      popular: true,
      color: "orange",
      billing: "/month"
    },
    // {
    //   name: "Pro",
    //   price: 49.99,
    //   description: "Premium features for serious creators",
    //   icon: Crown,
    //   credits: "24,000 credits (6h 40m)",
    //   features: [
    //     "24,000 credits per month (6h 40m)",
    //     "Full API + advanced features (batch jobs)",
    //     "Premium support (same-day response)",
    //     "Access to premium voices/styles/music library",
    //     "Custom brand kit setup",
    //     "Extra storage included"
    //   ],
    //   popular: false,
    //   color: "purple",
    //   billing: "/month"
    // }
  ];
    

  const apiFeatures = [
    "RESTful API for seamless integration",
    "Batch processing for multiple videos",
    // "Webhook notifications for job completion",
    "Custom rendering settings and presets",
    "Priority processing queue for faster results"
  ];

  const faqs = [
    {
      question: "What are credits and how do they work?",
      answer: "Credits are used to process video content. Approximately 1 credit = 1 second of video output. The exact usage depends on complexity, resolution, and effects applied."
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle."
    },
    {
      question: "What's included in the API access?",
      answer: "API access includes RESTful endpoints for video processing, batch operations, webhook notifications, and priority processing queue for faster rendering."
    },
    {
      question: "Do credits roll over to the next month?",
      answer: "No, credits reset each billing cycle. We recommend choosing a plan that matches your monthly usage to get the best value."
    },
    {
      question: "What video formats are supported?",
      answer: "We support all major video formats including MP4, MOV, AVI, and more. Output is delivered in high-quality MP4 format optimized for web and social media."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Vizeel Video Stitching Agent API",
        "description": "AI-powered video stitching and editing API service",
        "provider": {
          "@type": "Organization",
          "name": "Vizeel"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Video Stitching Agent Plans",
          "itemListElement": plans.map(plan => ({
            "@type": "Offer",
            "name": plan.name,
            "description": plan.description,
            "price": plan.price,
            "priceCurrency": "USD",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": plan.price,
              "priceCurrency": "USD",
              "billingIncrement": "P1M"
            }
          }))
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  const getPlanBorderColor = (color: string) => {
    switch (color) {
      case 'gray': return 'border-gray-200';
      case 'green': return 'border-green-200';
      case 'orange': return 'border-red-600';
      case 'purple': return 'border-purple-200';
      default: return 'border-border';
    }
  };

  const getPlanTextColor = (color: string) => {
    switch (color) {
      case 'gray': return 'text-gray-700';
      case 'green': return 'text-green-700';
      case 'orange': return 'text-red-600';
      case 'purple': return 'text-purple-700';
      default: return 'text-foreground';
    }
  };

  const getPlanIcon = (color: string) => {
    switch (color) {
      case 'gray': return 'text-gray-500';
      case 'green': return 'text-green-500';
      case 'orange': return 'text-red-500';
      case 'purple': return 'text-purple-500';
      default: return 'text-primary';
    }
  };

  return (
    <>
      <SEO
        title="Video Stitching Agent API - AI Video Processing"
        description="Powerful AI-driven video stitching and editing API. Free tier available. Plans from $9.99/month with API access, batch processing, and premium features."
        keywords="video stitching api, video editing api, ai video processing, video automation, batch video processing, video api service"
        url="https://vizeel.com/agents/video-stitching"
        image="https://vizeel.com/og/video-stitching-agent.png"
        structuredData={structuredData}
      />
      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Scissors className="mx-auto h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Video Stitching Agent
                <span className="text-primary"> API</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Powerful AI-driven video processing and stitching service with flexible API access
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative flex flex-col ${getPlanBorderColor(plan.color)} bg-card ${
                    plan.popular ? 'shadow-lg scale-105 ring-2 ring-red-500/20' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge variant="default" className="bg-red-600 text-white">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-6">
                    <plan.icon className={`w-8 h-8 mx-auto mb-4 ${getPlanIcon(plan.color)}`} />
                    <CardTitle className={`text-xl font-bold ${getPlanTextColor(plan.color)}`}>
                      {plan.name}
                    </CardTitle>
                    <div className="text-3xl font-bold text-foreground">
                      {plan.price === 0 ? 'Free' : `$${plan.price}`}
                      <span className="text-base font-normal text-muted-foreground">{plan.billing}</span>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="text-sm font-medium text-center mb-4 p-2 bg-muted rounded-lg">
                      {plan.credits}
                    </div>
                    <ul className="text-sm space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant={plan.popular ? "default" : "outline"} 
                      className={`w-full mt-auto ${
                        plan.popular 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : plan.color === 'gray'
                            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            : plan.color === 'green' 
                              ? 'border-green-300 text-green-700 hover:bg-green-50'
                              : plan.color === 'purple'
                                ? 'border-purple-300 text-purple-700 hover:bg-purple-50'
                                : ''
                      }`}
                      asChild
                    >
                      <a href="/contact">{plan.price === 0 ? 'Start Free' : 'Get Started'}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* API Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">API Features</h2>
              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Enterprise-Ready API
                      </h3>
                      <ul className="space-y-3">
                        {apiFeatures.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-primary" />
                        Support Levels
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-3 h-3 bg-gray-400 rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium">Community (Free)</div>
                            <div className="text-sm text-muted-foreground">FAQ access</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium">Standard (Starter)</div>
                            <div className="text-sm text-muted-foreground">Community support</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-3 h-3 bg-orange-400 rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium">Priority (Growth)</div>
                            <div className="text-sm text-muted-foreground">Email within 24h</div>
                          </div>
                        </div>
                        {/* <div className="flex items-start gap-3">
                          <div className="w-3 h-3 bg-purple-400 rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium">Premium (Pro)</div>
                            <div className="text-sm text-muted-foreground">Same-day response</div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-border bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-muted-foreground">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <p className="">
                  Questions? <a href="/faq" className="text-primary hover:underline">See all FAQs →</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default VideoStitchingAgent;