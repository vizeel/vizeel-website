import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar, 
  Handshake, 
  Star,
  CheckCircle,
  Clock,
  Target,
  Award,
  Zap
} from "lucide-react";

const Affiliates = () => {
  const commissionTiers = [
    {
      period: "Year 1",
      rate: "20%",
      description: "For all new customers you refer during their first year",
      icon: Star,
      highlight: true
    },
    {
      period: "Year 2+",
      rate: "10%", 
      description: "Ongoing commission for customers who continue with Vizeel",
      icon: TrendingUp,
      highlight: false
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Recurring Monthly Payments",
      description: "Get paid every month as long as your referred customers stay with us"
    },
    {
      icon: Users,
      title: "Build Your Customer Base",
      description: "Focus on referring quality customers who will benefit from Vizeel"
    },
    {
      icon: Handshake,
      title: "Partnership Approach",
      description: "We work together to ensure your referrals are successful"
    },
    {
      icon: Target,
      title: "No Limits",
      description: "No cap on the number of customers you can refer or commissions you can earn"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Join Our Program",
      description: "Apply to become a Vizeel affiliate partner"
    },
    {
      step: "2", 
      title: "Refer Customers",
      description: "Share Vizeel with businesses that need AI video marketing"
    },
    {
      step: "3",
      title: "Customer Onboards",
      description: "We help your referrals get set up and successful with Vizeel"
    },
    {
      step: "4",
      title: "Earn Monthly",
      description: "Receive your commission payment every month they stay active"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Vizeel Affiliate Program",
    "description": "Join Vizeel's affiliate program and earn 20% commission in year 1, 10% thereafter for referring customers to our AI video marketing platform.",
    "url": "https://vizeel.com/affiliates"
  };

  return (
    <>
      <Navigation />
      <Helmet>
        <title>Affiliate Program – Vizeel</title>
        <meta 
          name="description" 
          content="Join Vizeel's affiliate program and earn recurring monthly commissions. 20% in year 1, 10% thereafter for every customer you refer to our AI video platform." 
        />
        <meta 
          name="keywords" 
          content="affiliate program, partnership, commission, referral, AI video marketing, recurring income" 
        />
        <link rel="canonical" href="https://vizeel.com/affiliates" />
        <meta name="robots" content="index,follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Affiliate Program – Vizeel" />
        <meta property="og:description" content="Join Vizeel's affiliate program and earn recurring monthly commissions. 20% in year 1, 10% thereafter for every customer you refer." />
        <meta property="og:url" content="https://vizeel.com/affiliates" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Affiliate Program – Vizeel" />
        <meta name="twitter:description" content="Join Vizeel's affiliate program and earn recurring monthly commissions. 20% in year 1, 10% thereafter for every customer you refer." />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-2 md:py-2">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Handshake className="mx-auto h-12 w-12 text-primary mb-4" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Partner with Vizeel
                <span className="text-primary"> & Earn Monthly</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join our affiliate program and earn recurring monthly commissions by referring 
                businesses to Vizeel's AI-powered video marketing platform.
              </p>
            </div>
          </div>
        </section>

        {/* Commission Structure */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4">Commission Structure</Badge>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Generous & Recurring Commissions</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our commission structure rewards you for bringing in quality customers who stay with us long-term.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {commissionTiers.map((tier, index) => (
                  <Card key={index} className={`border-border bg-card hover:shadow-lg transition-shadow duration-300 ${tier.highlight ? 'ring-2 ring-primary/20' : ''}`}>
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full ${tier.highlight ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                        <tier.icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-foreground">
                        {tier.rate}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-primary">
                        {tier.period}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground leading-relaxed">
                        {tier.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <div className="bg-primary/10 rounded-lg p-6 max-w-2xl mx-auto">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Monthly Payouts</h3>
                  <p className="text-muted-foreground">
                    Receive your commission payment every month as long as your referred customers continue using Vizeel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-foreground">Why Partner with Vizeel?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We've designed our affiliate program to be mutually beneficial - your success is our success.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-foreground">How It Works</h2>
                <p className="text-muted-foreground">
                  Simple steps to start earning recurring commissions with Vizeel.
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8">
                {howItWorks.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary text-white rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
                <Award className="h-12 w-12 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Ready to Start 
                  <span className="text-primary"> Earning?</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join our affiliate program today and start building a recurring income stream 
                  by helping businesses grow with AI-powered video marketing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <a href="/contact">Apply to Become an Affiliate</a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="/product">Learn About Vizeel</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Affiliates;