import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Video, Zap, Crown, HelpCircle, CheckCircle, AlertCircle, Plus, Minus, Calculator } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SocialMediaMarketingAgent = () => {
  const [selectedAddOns, setSelectedAddOns] = useState<{[key: string]: number}>({});
  const [selectedPlan, setSelectedPlan] = useState<string>("Pro");
  const navigate = useNavigate();
  
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

  const addOnServices = [
    {
      id: "VZ-A001-WEB",
      name: "Website Setup",
      description: "Setup a customized website, includes product or service menu along with a contact page and privacy policy page.",
      price: 600,
      type: "One-Time",
      unit: "3-page website",
      priority: "Top",
      category: "Website & Setup"
    },
    {
      id: "VZ-A001-BLOG",
      name: "Blog Setup with SEO-friendly Posts",
      description: "Setup a blogging system and publish 3 blog posts per week, all centered around target SEO keywords and categories.",
      price: 400,
      type: "Recurring",
      unit: "per month",
      priority: "High",
      category: "Content & SEO"
    },
    {
      id: "VZ-A002-SET",
      name: "Campaign Build (Adv+ / PMax)",
      description: "Channel and conversion setup, pixel/conversions, audiences, creatives upload, naming conventions, QA.",
      price: 750,
      type: "One-Time",
      unit: "per channel",
      priority: "Top",
      category: "Advertising Setup"
    },
    {
      id: "VZ-A003-AUD",
      name: "Offer & Landing Audit + Prioritized Fix List",
      description: "Audit of pages (speed, errors, copy gaps), analytics checks, and a prioritized fixes list. Pairs with Fix Implementation.",
      price: 500,
      type: "One-Time",
      unit: "per site/flow",
      priority: "Medium",
      category: "Optimization"
    },
    {
      id: "VZ-A003-FIX",
      name: "Fix Implementation",
      description: "Implements items from prioritized list of website fixes (copy, layout, tracking, image compression, etc.).",
      price: 150,
      type: "One-Time",
      unit: "per fix (typical 3–8 fixes)",
      priority: "Low",
      category: "Optimization"
    },
    {
      id: "VZ-A003-AB",
      name: "A/B Test Plan",
      description: "Structured A/B plan for offers/CTAs/sections with hypotheses, variants, and sample-size targets.",
      price: 300,
      type: "One-Time",
      unit: "per plan",
      priority: "Low",
      category: "Testing"
    },
    {
      id: "VZ-A004-GMB",
      name: "Setup and Manage Google My Business Profile",
      description: "Configure the Google My Business profile to contain all business info with business description that is SEO-friendly.",
      price: 200,
      type: "One-Time",
      unit: "per brand",
      priority: "Low",
      category: "Local SEO"
    },
    {
      id: "VZ-A004-SM",
      name: "Setup Social Media Accounts",
      description: "Establish brand presence on selected social media channels (FB, IG, YouTube, TikTok), includes setting up profile with an intro to business post.",
      price: 400,
      type: "One-Time",
      unit: "per brand",
      priority: "Medium",
      category: "Social Media"
    },
    {
      id: "VZ-A005",
      name: "Lead-Gen Concierge",
      description: "Agent handles site/chat/DM/email, qualifies, books 10-min consults, logs notes. KPIs: speed-to-lead, booked rate, show rate.",
      price: 500,
      type: "Recurring",
      unit: "per month",
      priority: "Medium",
      category: "Lead Generation"
    },
    {
      id: "VZ-A005-CB",
      name: "Lead-Gen Concierge for Messenger and WhatsApp",
      description: "Agent that handles incoming business inquiries from Facebook Messenger and WhatsApp; includes at least 20 pre-set responses and lead routing.",
      price: 500,
      type: "One-Time",
      unit: "initial build",
      priority: "Medium",
      category: "Lead Generation"
    },
    {
      id: "VZ-A006",
      name: "TikTok Shop Setup",
      description: "End-to-end setup: compliance, catalog connection, policies, storefront branding, test order.",
      price: 800,
      type: "One-Time",
      unit: "per shop",
      priority: "Medium",
      category: "E-commerce"
    },
    {
      id: "VZ-A007-INIT",
      name: "Product Feed Optimization (Initial)",
      description: "Clean titles/attributes, GTIN/brand mapping, image checks, diagnostics, rule-based enrichments for Meta/Google/TikTok.",
      price: 650,
      type: "One-Time",
      unit: "initial setup",
      priority: "Top",
      category: "E-commerce"
    },
    {
      id: "VZ-A007-MON",
      name: "Product Feed Monitoring",
      description: "Ongoing diagnostics, error cleanup, and enrichment rules maintenance across channels.",
      price: 175,
      type: "Recurring",
      unit: "per month",
      priority: "Top",
      category: "E-commerce"
    }
  ];

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1
    }));
  };

  const removeAddOn = (id: string) => {
    setSelectedAddOns(prev => {
      const updated = { ...prev };
      if (updated[id] > 1) {
        updated[id] -= 1;
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  const calculateTotal = () => {
    const basePlan = plans.find(p => p.name === selectedPlan);
    const baseCost = basePlan ? basePlan.price : 0;
    
    let monthlyAddOns = 0;
    let oneTimeAddOns = 0;
    
    Object.entries(selectedAddOns).forEach(([id, quantity]) => {
      const addOn = addOnServices.find(service => service.id === id);
      if (addOn) {
        const cost = addOn.price * quantity;
        if (addOn.type === 'Recurring') {
          monthlyAddOns += cost;
        } else {
          oneTimeAddOns += cost;
        }
      }
    });
    
    return {
      monthly: baseCost + monthlyAddOns,
      oneTime: oneTimeAddOns,
      total: baseCost + monthlyAddOns + oneTimeAddOns
    };
  };

  const handleGetStarted = () => {
    // Create package selection data
    const selectedAddOnsList = Object.entries(selectedAddOns).map(([id, quantity]) => {
      const service = addOnServices.find(s => s.id === id);
      return service ? {
        id,
        name: service.name,
        price: service.price,
        quantity,
        type: service.type
      } : null;
    }).filter(Boolean);

    const packageData = {
      agent: 'Social Media Marketing Agent',
      plan: selectedPlan,
      planPrice: plans.find(p => p.name === selectedPlan)?.price || 0,
      addOns: selectedAddOnsList,
      totals: calculateTotal()
    };

    // Navigate to contact with package data
    navigate('/contact', { 
      state: { 
        packageSelection: packageData,
        source: 'social_media_agent_pricing' 
      } 
    });
  };

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
    },
    {
      question: "How do add-on services work?",
      answer: "Add-on services are optional enhancements to boost your social media success. One-time services are charged upfront, while recurring services are billed monthly alongside your plan."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Vizeel Social Media Marketing Agent",
        "description": "AI-powered social media content creation agent",
        "provider": {
          "@type": "Organization",
          "name": "Vizeel"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Social Media Marketing Agent Plans",
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
        title="Social Media Marketing Agent - AI Content Creation"
        description="AI-powered social media content creation agent. Entry, Pro, and Enterprise plans starting at $75/month. Automated video content for social media platforms."
        keywords="social media agent, ai content creation, social media automation, video marketing agent, social media management, automated content"
        url="https://vizeel.com/agents/social-media-marketing"
        image="https://vizeel.com/og/social-media-agent.png"
        structuredData={structuredData}
      />
      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Plan Comparison */}
        <section className="py-2 md:py-2">
          <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
              <Video className="mx-auto h-12 w-12 text-primary mb-4" />
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Social Media Marketing Agent
                <span className="text-primary"> Plans</span>
              </h1>
              {/* <p className="text-muted-foreground">AI-powered content creation for your social media success</p> */}
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
                    <div className="flex gap-2">
                      <Button 
                        variant={selectedPlan === plan.name ? "default" : "outline"} 
                        className={`flex-1 ${
                          selectedPlan === plan.name 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : plan.color === 'green' 
                              ? 'border-green-300 text-green-700 hover:bg-green-50'
                              : plan.color === 'blue'
                                ? 'border-blue-300 text-blue-700 hover:bg-blue-50'
                                : ''
                        }`}
                        onClick={() => setSelectedPlan(plan.name)}
                      >
                        {selectedPlan === plan.name ? 'Selected' : 'Select Plan'}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleGetStarted}>
                        Get Started
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

        {/* Plan Details */}
        {/* <section className="py-16">
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
        </section> */}

        {/* Add-On Services */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-foreground">Supercharge Your Success</h2>
                <p className="text-muted-foreground">Optional add-on services to maximize your social media impact</p>
              </div>

              <div className="grid lg:grid-cols-4 gap-8">
                {/* Add-on services - left side */}
                <div className="lg:col-span-3">
                  {/* Group services by category */}
                  {['Website & Setup', 'Content & SEO', 'Advertising Setup', 'Social Media', 'Lead Generation', 'E-commerce', 'Optimization', 'Testing', 'Local SEO'].map(category => {
                    const categoryServices = addOnServices.filter(service => service.category === category);
                    if (categoryServices.length === 0) return null;
                    
                    return (
                      <div key={category} className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-foreground">{category}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {categoryServices.map(service => (
                            <Card key={service.id} className="relative border-border bg-card hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-foreground mb-1 text-sm">{service.name}</h4>
                                    <Badge variant="outline" className={`text-xs mb-2 ${
                                      service.priority === 'Top' ? 'border-red-200 text-red-700' :
                                      service.priority === 'High' ? 'border-orange-200 text-orange-700' :
                                      service.priority === 'Medium' ? 'border-blue-200 text-blue-700' :
                                      'border-gray-200 text-gray-700'
                                    }`}>
                                      {service.priority}
                                    </Badge>
                                  </div>
                                  {selectedAddOns[service.id] && (
                                    <Badge variant="default" className="bg-red-600 text-white">
                                      {selectedAddOns[service.id]}x
                                    </Badge>
                                  )}
                                </div>
                                
                                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{service.description}</p>
                                
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-bold text-foreground text-sm">${service.price}</div>
                                    <div className="text-xs text-muted-foreground">{service.unit}</div>
                                    <Badge variant="secondary" className="text-xs mt-1">
                                      {service.type}
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex items-center gap-1">
                                    {selectedAddOns[service.id] > 0 && (
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => removeAddOn(service.id)}
                                        className="h-8 w-8 p-0"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </Button>
                                    )}
                                    <Button 
                                      variant={selectedAddOns[service.id] ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => toggleAddOn(service.id)}
                                      className={`h-8 w-8 p-0 ${selectedAddOns[service.id] ? "bg-red-600 hover:bg-red-700" : ""}`}
                                    >
                                      <Plus className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Pricing Calculator - right side sticky */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-4">
                    <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Calculator className="w-5 h-5 text-red-600" />
                          <h3 className="font-semibold text-foreground">Your Total</h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">{selectedPlan} Plan</span>
                            <span className="font-medium">${plans.find(p => p.name === selectedPlan)?.price}/mo</span>
                          </div>
                          
                          {Object.entries(selectedAddOns).map(([id, quantity]) => {
                            const service = addOnServices.find(s => s.id === id);
                            if (!service) return null;
                            return (
                              <div key={id} className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground truncate mr-2">
                                  {service.name.length > 15 ? service.name.substring(0, 15) + '...' : service.name} {quantity > 1 ? `(${quantity}x)` : ''}
                                </span>
                                <span className="font-medium whitespace-nowrap">
                                  ${service.price * quantity}{service.type === 'Recurring' ? '/mo' : ''}
                                </span>
                              </div>
                            );
                          })}
                          
                          <hr className="my-3" />
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center font-semibold">
                              <span>Monthly Total</span>
                              <span>${calculateTotal().monthly}</span>
                            </div>
                            {calculateTotal().oneTime > 0 && (
                              <div className="flex justify-between items-center font-semibold text-orange-600">
                                <span>One-time Setup</span>
                                <span>${calculateTotal().oneTime}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <Button className="w-full mt-4 bg-red-600 hover:bg-red-700" onClick={handleGetStarted}>
                          Get Started
                        </Button>
                        
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                          {Object.values(selectedAddOns).reduce((a, b) => a + b, 0)} add-on{Object.values(selectedAddOns).reduce((a, b) => a + b, 0) !== 1 ? 's' : ''} selected
                        </p>
                      </CardContent>
                    </Card>
                    
                    {/* Quick actions */}
                    <Card className="border-border bg-card">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-3 text-sm">Quick Actions</h4>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start text-xs"
                            onClick={() => setSelectedAddOns({})}
                          >
                            Clear All Add-ons
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start text-xs"
                            onClick={() => {
                              // Add popular combo
                              const popular = ['VZ-A001-WEB', 'VZ-A004-SM', 'VZ-A002-SET'];
                              const newSelection: {[key: string]: number} = {};
                              popular.forEach(id => newSelection[id] = 1);
                              setSelectedAddOns(newSelection);
                            }}
                          >
                            Add Popular Combo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
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

export default SocialMediaMarketingAgent;