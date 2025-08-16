import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Video, Settings, Palette } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "AI-generated media plan",
      description: "customized to your business, with a built-in content calendar"
    },
    {
      icon: Video,
      title: "Ready-to-post videos",
      description: "using branded templates for titles, captions, and lower-thirds"
    },
    {
      icon: Settings,
      title: "Multi-format outputs",
      description: "in one pass (vertical shorts, square posts, transcripts/notes)"
    },
    {
      icon: Palette,
      title: "Workspace presets",
      description: "saved for your brand, with the option to add new media"
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
            Powerful{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Features
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-vibrant transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary text-white flex-shrink-0">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
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

export default Features;