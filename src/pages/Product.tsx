import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import {
  Video,
  Calendar,
  Settings,
  Monitor,
  FileText,
  Share2,
  Smartphone,
  Shield,
  CheckCircle,
  UserPlus,
  Link,
  Palette,
} from "lucide-react";

const Product = () => {
  const features = [
    {
      icon: Calendar,
      title: "AI-generated media plan, customized to your business, includes a content calendar",
      description: "Research-driven plan that aligns with your site, services, and audience."
    },
    {
      icon: Video,
      title: "'Ready to Post' videos that use branded templates for titles, captions, and lower-thirds",
      description: "On-brand clips, no editing required."
    },
    {
      icon: Monitor,
      title: "Multi-format outputs in one pass: vertical shorts, square posts, transcript/notes",
      description: "Platform-ready sizes and assets."
    },
    {
      icon: Settings,
      title: "Workspace with saved brand presets, option to add new media or update intro/outro cards",
      description: "Keep logos, colors, fonts, and cards in one place."
    }
  ];

  const howItWorksSteps = [
    "Create your workspace. Sign up and set your Brand Kit once for consistent styling.",
    "Connect accounts. Link social channels to enable publishing and scheduling.",
    "Get your free Media Plan. Review strategy and activate when you're ready.",
    "Pick a tier & add media (optional). Entry, Sweet Spot, or Power User; upload brand media anytime.",
    "Ongoing delivery. On-brand short videos generated monthly; opt into auto-posting."
  ];

  const outputs = [
    "Short clips in platform-ready sizes (9:16, 1:1).",
    "Strategic media plan with research analysis results and a content calendar",
    "Brand presets saved to your workspace."
  ];

  const userBenefits = [
    "Done-for-you short videos from your reviews, website, and brand media.",
    "Vertical-first clips tuned for social.",
    "Consistent outputs; set once, we handle the rest.",
    "Simple email support included."
  ];

  const integrations = [
    "Instagram Reels",
    "TikTok", 
    "YouTube Shorts",
    "MP4 export"
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Create AI-Generated Videos with Vizeel",
    "description": "Step-by-step guide to creating branded video content with Vizeel's AI platform",
    "step": howItWorksSteps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.split("—")[0].trim(),
      "text": step
    }))
  };

  return (
    <>
      <Navigation />
      <Helmet>
        <title>Product — Vizeel</title>
        <meta 
          name="description" 
          content="Vizeel researches, plans, and generates short-form brand videos from your site, services, and reviews. No prompts required." 
        />
        <meta 
          name="keywords" 
          content="vizeel, product, how it works, ai video editor, reels, shorts, tiktok" 
        />
        <link rel="canonical" href="https://vizeel.com/product" />
        <meta name="robots" content="index,follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Product — Vizeel" />
        <meta property="og:description" content="Vizeel researches, plans, and generates short-form brand videos from your site, services, and reviews. No prompts required." />
        <meta property="og:url" content="https://vizeel.com/product" />
        <meta property="og:image" content="/og/vizeel-product.png" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Product — Vizeel" />
        <meta name="twitter:description" content="Vizeel researches, plans, and generates short-form brand videos from your site, services, and reviews. No prompts required." />
        <meta name="twitter:image" content="/og/vizeel-product.png" />
        
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
                Product Tour
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                Vizeel researches, plans, and generates short videos for your brand. Using an AI-powered media plan and content planning process, Vizeel efficiently delivers a steady stream of content that fits with your brand and reaches new customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <a href="/signup">Join waitlist</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/pricing">See Pricing</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Overview</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-accent" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How it works</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {howItWorksSteps.map((step, index) => (
                  <Card key={index} className="border-border bg-card text-center">
                    <CardContent className="p-6">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">
                        {index + 1}
                      </div>
                      <p className="text-foreground text-sm">{step}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What Users Get Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">What users get</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {userBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Outputs Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Turnkey system</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-1 gap-6">
                {outputs.map((output, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-foreground">{output}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Integrations</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-center text-muted-foreground mb-6">
                Instagram, TikTok, YouTube Shorts; MP4 export for anywhere else. Auto-posting requires connected accounts and your approval.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {integrations.map((integration, index) => (
                  <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    {integration}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Privacy & data</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We store only what's needed to render outputs; you can delete source files any time.
                </p>
                <p>
                  Single-tenant storage per workspace; staff access limited to support.
                </p>
                <p>
                  See <a href="/privacy" className="text-accent hover:underline">/privacy</a> for details.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent/5">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-foreground">Join waitlist</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <a href="/signup">Sign up</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/contact">Contact</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Product;