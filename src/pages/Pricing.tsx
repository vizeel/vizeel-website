import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Check, Video, Zap, Crown, HelpCircle } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Entry",
      price: 75,
      description: "Starter presence, 1–2 channels",
      icon: Video,
      features: [
        "4 × 8s videos / month",
        "Auto-posting",
        "Calendar & approvals"
      ],
      popular: false
    },
    {
      name: "Sweet Spot",
      price: 149,
      description: "Steady cadence across 2–3 channels",
      icon: Zap,
      features: [
        "Everything in Entry",
        "+ 4 × 15s videos / month",
        "Calendar & approvals"
      ],
      popular: true
    },
    {
      name: "Power User",
      price: 299,
      description: "Multi-location or higher volume",
      icon: Crown,
      features: [
        "4 × 8s + 6 × 15s + 1 × 30s videos / month",
        "Priority support"
      ],
      popular: false
    }
  ];

  const planDetails = [
    "Research-driven monthly content calendar",
    "AI-generated short videos",
    "Approval flow",
    "Optional auto-posting once accounts are connected"
  ];

  const faqs = [
    {
      question: "Can I provide my own images?",
      answer: "Yes. We recommend at least 1 image per 5 seconds of video (2 per 5 seconds works best)."
    },
    {
      question: "Can I change plans later?",
      answer: "Yes—upgrade or downgrade anytime. Changes take effect in the next billing cycle."
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

  return (
    <>
      <Navigation />
      <Helmet>
        <title>Pricing – Vizeel</title>
        <meta 
          name="description" 
          content="Simple monthly plans for AI short videos that post themselves." 
        />
        <meta 
          name="keywords" 
          content="pricing, plans, ai video, short-form content" 
        />
        <link rel="canonical" href="https://vizeel.com/pricing" />
        <meta name="robots" content="index,follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Pricing – Vizeel" />
        <meta property="og:description" content="Simple monthly plans for AI short videos that post themselves." />
        <meta property="og:url" content="https://vizeel.com/pricing" />
        <meta property="og:image" content="/og/vizeel-pricing.png" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing – Vizeel" />
        <meta name="twitter:description" content="Simple monthly plans for AI short videos that post themselves." />
        <meta name="twitter:image" content="/og/vizeel-pricing.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Pricing
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Simple monthly plans for AI short videos that post themselves.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative border-border bg-card ${
                    plan.popular ? 'border-accent shadow-lg scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge variant="default" className="bg-accent text-white">
                        Recommended
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <plan.icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-foreground">
                      ${plan.price}
                      <span className="text-sm font-normal text-muted-foreground">/ month</span>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant={plan.popular ? "accent" : "outline"} 
                      className="w-full"
                      asChild
                    >
                      <a href="/contact">Get Started</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Plan Details */}
        <section className="py-16 bg-muted/30">
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
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">FAQ snippet</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-border bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">
                            Q: {faq.question}
                          </h3>
                          <p className="text-muted-foreground">
                            A: {faq.answer}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <p className="text-muted-foreground">
                  → <a href="/faq" className="text-accent hover:underline">View more FAQs</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent/5">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-foreground">Ready to start?</h2>
              <Button variant="accent" size="lg" asChild>
                <a href="/contact">Create your account</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Pricing;