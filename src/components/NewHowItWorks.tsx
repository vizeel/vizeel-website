import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Link, Palette, Calendar, CheckCircle } from "lucide-react";

const NewHowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign up at app.vizeel.com",
      description: "connect your brands' social accounts to kick off the research and planning process"
    },
    {
      icon: Palette,
      title: "Add your Brand Kit once",
      description: "Set your brand style and optional intro/outro cards for use in each video"
    },
    {
      icon: Calendar,
      title: "We generate your first Media Plan",
      description: "for free , including a Research summary and analysis of your brand"
    },
    {
      icon: CheckCircle,
      title: "Review the content calendar",
      description: "enable auto-posting or preview summaries of scripts that will be used in upcoming videos"
    },
    {
      icon: Link,
      title: "Short-form videos are auto generated",
      description: "on/after scheduled posting days,  auto-post brands have videos with captions posted on their social accounts"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            Solution Overview
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            How it{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              works
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="how-card hover:shadow-vibrant transition-all duration-300 border-0 bg-card relative">
              <CardContent className="p-6 text-center">
                <div className="icon">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                
                {/* Step Number */}
                <div className="step-badge absolute top-3 right-3 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="how-progress" aria-hidden="true"></div>
      </div>
    </section>
  );
};

export default NewHowItWorks;