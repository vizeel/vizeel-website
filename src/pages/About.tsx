import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { 
  Users, 
  Target, 
  Sparkles, 
  Linkedin, 
  Award, 
  Clock, 
  TrendingUp,
  Heart,
  Zap,
  Globe
} from "lucide-react";

const About = () => {
  const founders = [
    {
      name: "Megean Madden",
      role: "Co-Founder",
      bio: "Serial entrepreneur with 20+ years in digital marketing and AI. Previously built and scaled multiple SaaS companies serving SMBs.",
      linkedin: "https://www.linkedin.com/in/megean/",
      expertise: ["Product Strategy"]
    },
    {
      name: "Prem Randeria",
      role: "Co-Founder",
      bio: "Seasoned technology leader with deep expertise in enterprise applications, video processing, automation, and most recently Agentic AI. Led high-performing engineering teams at major tech companies before shifting focus to scalable solutions for SMBs.",
      linkedin: "https://www.linkedin.com/in/premranderia/",
      expertise: ["AI & Machine Learning"]
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "SMB-First",
      description: "We believe every small business deserves access to enterprise-level marketing tools."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly pushing the boundaries of AI to create better, faster, more effective solutions."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We succeed when our customers succeed. Your growth is our mission."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making powerful marketing tools accessible to businesses of all sizes and technical levels."
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Vizeel Launch",
      description: "Launched Vizeel to democratize AI video creation for SMBs"
    },
    {
      year: "2023",
      title: "11 Years Together",
      description: "Celebrated 11 years of successful collaboration and partnership"
    },
    {
      year: "2018",
      title: "First Joint Venture",
      description: "Started our first company together, serving thousands of SMBs"
    },
    {
      year: "2013",
      title: "Partnership Begins",
      description: "Met and began working together on digital transformation projects"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vizeel",
    "description": "AI-powered video creation platform helping SMBs grow their business",
    "url": "https://vizeel.com",
    "founder": founders.map(founder => ({
      "@type": "Person",
      "name": founder.name,
      "jobTitle": founder.role,
      "url": founder.linkedin
    })),
    "foundingDate": "2024",
    "mission": "To democratize AI video creation for small and medium businesses"
  };

  return (
    <>
      <Navigation />
      <Helmet>
        <title>About Us – Vizeel</title>
        <meta 
          name="description" 
          content="Meet the founders of Vizeel - two entrepreneurs with 11 years of partnership dedicated to helping SMBs grow with AI video marketing." 
        />
        <meta 
          name="keywords" 
          content="about us, founders, SMB, small business, AI video, entrepreneurship" 
        />
        <link rel="canonical" href="https://vizeel.com/about" />
        <meta name="robots" content="index,follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About Us – Vizeel" />
        <meta property="og:description" content="Meet the founders of Vizeel - two entrepreneurs with 11 years of partnership dedicated to helping SMBs grow with AI video marketing." />
        <meta property="og:url" content="https://vizeel.com/about" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us – Vizeel" />
        <meta name="twitter:description" content="Meet the founders of Vizeel - two entrepreneurs with 11 years of partnership dedicated to helping SMBs grow with AI video marketing." />
        
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
                <Users className="mx-auto h-12 w-12 text-primary mb-4" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Built by Entrepreneurs, 
                <span className="text-primary"> For Entrepreneurs</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                After 11 years of working together in the ad tech space, 
                we've joined forces to democratize AI video creation for SMBs who deserve 
                enterprise-level marketing tools.
              </p>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-foreground">Meet Our Founders</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Two entrepreneurs with a shared vision of making powerful marketing tools accessible to every business.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {founders.map((founder, index) => (
                  <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {founder.name}
                      </CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {founder.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {founder.bio}
                      </p>
                      <div className="space-y-3 mb-6">
                        {founder.expertise.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="mr-2 mb-2">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" asChild>
                        <a 
                          href={founder.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Linkedin className="w-4 h-4" />
                          Connect on LinkedIn
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Target className="h-8 w-8 text-primary" />
                <Badge variant="outline" className="text-sm">Our Mission</Badge>
              </div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Empowering SMBs with 
                <span className="text-primary"> AI-Powered Marketing</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe that every small business deserves access to the same powerful marketing tools 
                that big corporations use and that's why we've created Vizeel.
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                {values.map((value, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
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
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Ready to Transform Your 
                  <span className="text-primary"> Marketing?</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of SMBs who are already using Vizeel to create engaging, 
                  on-brand videos that drive real results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <a href="/contact">Join Waitlist</a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="/product">See How It Works</a>
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

export default About;
