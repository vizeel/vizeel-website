import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Smartphone, RotateCcw, Mail } from "lucide-react";

const WhatYouGet = () => {
  const benefits = [
    {
      icon: Video,
      title: "Done-for-you short videos",
      description: "from your reviews, site, and services"
    },
    {
      icon: Smartphone,
      title: "Vertical-first clips",
      description: "(8s, 15s, 30s) tuned for social"
    },
    {
      icon: RotateCcw,
      title: "Consistent outputs",
      description: "set once, we handle the rest"
    },
    {
      icon: Mail,
      title: "Simple email support",
      description: "included"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            What You Get
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            What you{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              get
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-vibrant transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary text-white flex-shrink-0">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;