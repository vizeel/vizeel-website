import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Video, Zap, Crown, HelpCircle, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { agents, getActiveAgents, getComingSoonAgents } from "@/config/agents";

const Pricing = () => {
  const activeAgents = getActiveAgents();
  const comingSoonAgents = getComingSoonAgents();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Vizeel AI Agent Platform",
    "description": "AI-powered agents for content creation and business automation",
    "provider": {
      "@type": "Organization",
      "name": "Vizeel"
    }
  };

  return (
    <>
      <SEO
        title="AI Agent Pricing - Choose Your AI Solution"
        description="Explore pricing for all Vizeel AI agents including Social Media Marketing and Video Stitching agents. Find the perfect AI solution for your business needs."
        keywords="ai agent pricing, social media agent, video stitching api, ai automation pricing, business ai solutions"
        url="https://vizeel.com/pricing"
        image="https://vizeel.com/og/agents-pricing.png"
        structuredData={structuredData}
      />
      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Crown className="mx-auto h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Choose Your Perfect
                <span className="text-primary"> AI Agent</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Powerful AI agents designed to automate and enhance your business operations
              </p>
            </div>
          </div>
        </section>

        {/* Active Agents */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Available AI Agents</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {activeAgents.map((agent) => (
                  <Card key={agent.id} className="group hover:shadow-lg transition-all duration-300 border-border bg-card">
                    <CardHeader className="text-center pb-6">
                      <agent.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <CardTitle className="text-2xl font-bold text-foreground mb-2">
                        {agent.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {agent.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Button 
                        variant="default" 
                        className="bg-red-600 hover:bg-red-700 group-hover:scale-105 transition-transform"
                        asChild
                      >
                        <Link to={agent.href} className="flex items-center gap-2">
                          View Pricing
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Agents (if any) */}
        {comingSoonAgents.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Coming Soon</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {comingSoonAgents.map((agent) => (
                    <Card key={agent.id} className="relative opacity-75 border-border bg-card">
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Coming Soon
                        </Badge>
                      </div>
                      <CardHeader className="text-center pb-6">
                        <agent.icon className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                        <CardTitle className="text-lg font-bold text-foreground mb-2">
                          {agent.shortName}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground text-sm">
                          {agent.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <Button variant="outline" disabled className="w-full">
                          Notify Me
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* General Information */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Choose Vizeel AI Agents?</h2>
              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Enterprise-Grade
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Reliable 99.9% uptime</li>
                        <li>• Scalable infrastructure</li>
                        <li>• SOC 2 compliant security</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-500" />
                        Developer-Friendly
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• RESTful APIs with documentation</li>
                        <li>• SDKs for popular languages</li>
                        <li>• Comprehensive webhook support</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Pricing;