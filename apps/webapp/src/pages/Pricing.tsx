import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Video, Zap, Crown, HelpCircle, CheckCircle, AlertCircle } from "lucide-react";

const Pricing = () => {
  // Plan constants matching the Billing.tsx structure
  const PLAN_PRICES = {
    Entry: { monthly: 75 },
    Pro: { monthly: 149 },
    Enterprise: { monthly: 299 }
  };

  const PlanType = {
    Entry: "Entry",
    Pro: "Pro", 
    Enterprise: "Enterprise"
  } as const;

  const plans = [
    {
      name: PlanType.Entry,
      price: PLAN_PRICES.Entry.monthly,
      description: "Perfect for new brands",
      icon: Video,
      features: [
        "4 reels per Month",
        "Basic analytics and insights",
        "Email support"
      ],
      popular: false,
      color: "green"
    },
    {
      name: PlanType.Pro,
      price: PLAN_PRICES.Pro.monthly,
      description: "Perfect for most brands",
      icon: Zap,
      features: [
        "8 reels per Month",
        "Standard processing priority",
        "Basic analytics and insights",
        "Email support"
      ],
      popular: true,
      color: "orange"
    },
    {
      name: PlanType.Enterprise,
      price: PLAN_PRICES.Enterprise.monthly,
      description: "Advanced features for power users",
      icon: Crown,
      features: [
        "16 reels per Month",
        "Priority processing & faster renders",
        "Advanced analytics dashboard",
        "Priority support & custom integrations"
      ],
      popular: false,
      color: "blue"
    }
  ];

  const planDetails = [
    "Research-driven monthly content calendar",
    "AI-generated short videos",
    "Brand style preferences and cards",
    "Optional auto-posting once accounts are connected"
  ];

  const faqs = [
    {
      question: "Can I provide my own images?",
      answer: "Yes. We recommend at least 1 image per 5 seconds of video (2 per 5 seconds works best)."
    },
    {
      question: "Can I change plans later?",
      answer: "Yes, upgrade or downgrade anytime. Changes take effect in the next billing cycle."
    },
    {
      question: "How does the content publishing work?",
      answer: "Connect your social accounts once. We then generate and post content on your behalf, following your content calendar. You can turn off auto-posting and specify blackout dates for content."
    },
    {
      question: "Can I use my own branding and assets?",
      answer: "Yes. Add your Brand Kit (logos, colors, fonts) plus intro/outro cards once. We'll apply those presets so every video stays on brand."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Vizeel AI Video Creation",
        "description": "AI-powered short video creation platform",
        "provider": {
          "@type": "Organization",
          "name": "Vizeel"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Vizeel Pricing Plans",
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
      case 'green': return 'border-green-200';
      case 'orange': return 'border-red-600';
      case 'blue': return 'border-blue-200';
      default: return 'border-border';
    }
  };

  const getPlanTextColor = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-700';
      case 'orange': return 'text-red-600';
      case 'blue': return 'text-blue-700';
      default: return 'text-foreground';
    }
  };

  return (
    <>
      <SEO
        title="Pricing Plans - AI Video Creation Software"
        description="Simple monthly plans for AI-powered short videos that create themselves. Entry, Pro, and Enterprise plans starting at $75/month. Get automated video content for social media."
        keywords="pricing plans, ai video software cost, video creation subscription, social media content pricing, automated video plans, vizeel pricing"
        url="https://vizeel.com/pricing"
        image="https://vizeel.com/og/vizeel-pricing.png"
        structuredData={structuredData}
      />
      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Plan Comparison */}
        <section className="py-2 md:py-2">
          <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
              <Crown className="mx-auto h-12 w-12 text-primary mb-4" />
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Choose the right plan, 
                <span className="text-primary"> for your brand</span>
              </h1>
              <p className="text-muted-foreground">Each brand gets its own separate subscription</p>
            </div>
   
          </div>
        </section>

                 
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative flex flex-col ${getPlanBorderColor(plan.color)} bg-card ${
                    plan.popular ? 'shadow-lg scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge variant="default" className="bg-red-600 text-white">
                        Recommended
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-6">
                    <div className="w-4 h-1 bg-accent/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    </div>
                    <CardTitle className={`text-xl font-bold ${getPlanTextColor(plan.color)}`}>
                      {plan.name} - ${plan.price}/month
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
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
                          : plan.color === 'green' 
                            ? 'border-green-300 text-green-700 hover:bg-green-50'
                            : plan.color === 'blue'
                              ? 'border-blue-300 text-blue-700 hover:bg-blue-50'
                              : ''
                      }`}
                      asChild
                    >
                      <a href="/contact">Join waitlist</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

        {/* Plan Details */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Plan details</h2>
              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <p className="text-foreground mb-6">
                    All plans include:
                  </p>
                  <ul className="space-y-3 mb-6">
                    {planDetails.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                        <span className="text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-4 text-muted-foreground">
                    <p>• Bring-your-own assets (images/video) supported.</p>
                    <p>• Upgrade/downgrade anytime; changes apply next billing cycle.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Snippet */}
        <section className="py-16 bg-muted/30">
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
                  Questions? <a href="/faq" className="text-pimary  hover:underline">See all FAQs →</a>
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

export default Pricing;