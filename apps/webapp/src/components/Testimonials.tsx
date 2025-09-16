import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Users, Heart } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      handle: "@sarahstyles",
      role: "Fashion Influencer",
      content: "AdWink transformed my content creation process! I went from spending hours editing to getting professional videos in minutes. My engagement rate increased by 40% in just 2 weeks!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      platform: "Instagram",
      followers: "125K followers",
      metric: "40% engagement boost"
    },
    {
      name: "Mike Rodriguez",
      handle: "@mikesfitness",
      role: "Fitness Coach",
      content: "The AI understands fitness content perfectly. My workout videos now look like they were made by a professional studio. Client inquiries doubled after I started using AdWink!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      platform: "TikTok",
      followers: "89K followers",
      metric: "2x client inquiries"
    },
    {
      name: "Emma Thompson", 
      handle: "@cookingemma",
      role: "Food Blogger",
      content: "From recipe prep to viral videos! AdWink's AI captured the essence of my cooking style perfectly. My YouTube Shorts gained 500K views last month alone.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      platform: "YouTube",
      followers: "67K subscribers", 
      metric: "500K monthly views"
    }
  ];

  const successStats = [
    {
      icon: TrendingUp,
      number: "300%",
      label: "Average engagement increase",
      color: "text-success"
    },
    {
      icon: Users,
      number: "10K+",
      label: "Videos created monthly",
      color: "text-primary"
    },
    {
      icon: Heart,
      number: "4.9/5",
      label: "Average customer rating",
      color: "text-accent"
    }
  ];

  const caseStudies = [
    {
      client: "Local Coffee Shop",
      challenge: "Needed to compete with big chains on social media",
      solution: "Created daily story content showcasing fresh coffee and cozy atmosphere",
      result: "Grew IG followers by 250% and increased foot traffic by 30%",
      timeframe: "3 months"
    },
    {
      client: "Boutique Fashion Brand",
      challenge: "Limited budget for professional video production",
      solution: "AI-generated product showcase videos for new arrivals",
      result: "Reduced content creation costs by 80% while tripling online sales",
      timeframe: "6 weeks"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Creators Love{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AdWink
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of creators and businesses who've transformed their social media presence with AdWink.
          </p>
        </div>

        {/* Success Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {successStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-vibrant transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-white mb-4`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-vibrant transition-all duration-300 border-0 bg-card">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-start gap-4">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-primary text-sm font-medium">{testimonial.handle}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {testimonial.platform}
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-success/10 text-success border-success/20">
                        {testimonial.metric}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Case Studies */}
        <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Real Business Impact
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how businesses like yours achieved remarkable results with AdWink.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="border-0 bg-card shadow-lg hover:shadow-vibrant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-foreground mb-2">{study.client}</h4>
                    <Badge variant="outline" className="text-xs">
                      {study.timeframe}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-destructive mb-1">Challenge:</div>
                      <div className="text-sm text-muted-foreground">{study.challenge}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-primary mb-1">Solution:</div>
                      <div className="text-sm text-muted-foreground">{study.solution}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-success mb-1">Result:</div>
                      <div className="text-sm font-medium text-foreground">{study.result}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;