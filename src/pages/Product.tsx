import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import {
  Users,
  Video,
  Calendar,
  Settings,
  Monitor,
  FileText,
  Share2,
  Smartphone,
  Shield,
  CheckCircle,
} from "lucide-react";

const Product = () => {
  const features = [
    {
      icon: Video,
      title: "Branded templates for titles, captions, and lower-thirds",
      description: "Consistent branding across all your video content"
    },
    {
      icon: Monitor,
      title: "Multi-format outputs (vertical shorts, square posts, transcript/notes)",
      description: "Perfect sizing for every platform"
    },
    {
      icon: Calendar,
      title: "Calendar approvals and optional auto-posting",
      description: "Full control over your content schedule"
    },
    {
      icon: Settings,
      title: "Workspace with saved brand presets",
      description: "Streamlined workflow with your brand settings"
    }
  ];

  const howItWorksSteps = [
    "Sign up — Create your account at app.vizeel.com.",
    "Connect socials — Link Instagram, TikTok, YouTube, and/or LinkedIn.",
    "Add your Brand Kit (one-time) — Brand guidelines, style guide, intro/outro cards.",
    "We generate your first Media Plan — free — Review your calendar of suggested clips.",
    "Activate Media Plan — Turn on the plan you like.",
    "Pick a tier — Choose Entry, Sweet Spot (recommended), or Power User to fit your cadence.",
    "Add media (optional) — Drop images/video you want used in brand videos.",
    "Enable auto-posting (optional) — Approve the calendar and we'll post per schedule.",
    "Focus on your business — We amplify your brand content in the background.",
    "Monthly outputs — no prompts needed — Fresh clips arrive monthly; adding new media is optional."
  ];

  const outputs = [
    "Short clips in platform-ready sizes (9:16, 1:1)",
    "Transcript and show notes (downloadable)",
    "Title/caption variants for A/B testing",
    "Brand presets saved to your workspace"
  ];

  const userBenefits = [
    "Done-for-you short videos from your reviews, site, and services",
    "Vertical-first clips (8s/15s/30s) tuned for social",
    "Consistent monthly outputs—set once, we handle the rest",
    "Simple email support included"
  ];

  const integrations = [
    "Instagram",
    "TikTok", 
    "YouTube Shorts",
    "LinkedIn",
    "MP4 export for anywhere else"
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
        <title>Product / How it Works – Vizeel</title>
        <meta 
          name="description" 
          content="Sign up, connect socials, add your brand kit once, and Vizeel auto-generates a media plan and monthly short-form outputs—no prompts needed." 
        />
        <meta 
          name="keywords" 
          content="vizeel, product, how it works, ai video editor, reels, shorts, tiktok" 
        />
        <link rel="canonical" href="https://vizeel.com/product" />
        <meta name="robots" content="index,follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Product / How it Works – Vizeel" />
        <meta property="og:description" content="Sign up, connect socials, add your brand kit once, and Vizeel auto-generates a media plan and monthly short-form outputs—no prompts needed." />
        <meta property="og:url" content="https://vizeel.com/product" />
        <meta property="og:image" content="/og/vizeel-product.png" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Product / How it Works – Vizeel" />
        <meta name="twitter:description" content="Sign up, connect socials, add your brand kit once, and Vizeel auto-generates a media plan and monthly short-form outputs—no prompts needed." />
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
                Product / How it Works
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Turn long videos into publishable short clips—automatically. Vizeel drafts highlights, 
                titles, captions, and transcripts in your brand style. You approve on a calendar, and 
                we auto-post per schedule.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Features</h2>
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
              <div className="space-y-4">
                {howItWorksSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-foreground flex-1">{step}</p>
                  </div>
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
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Outputs (formats)</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
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
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {integrations.map((integration, index) => (
                  <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    {integration}
                  </Badge>
                ))}
              </div>
              <p className="text-center text-muted-foreground">
                Auto-posting requires connected accounts and your approval.
              </p>
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
              <h2 className="text-3xl font-bold mb-8 text-foreground">Ready to get started?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <a href="/contact">Join the waitlist</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://app.vizeel.com" target="_blank" rel="noopener noreferrer">
                    Create your account
                  </a>
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