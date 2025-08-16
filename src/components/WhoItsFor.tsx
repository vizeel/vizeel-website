import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Users } from "lucide-react";

const WhoItsFor = () => {
  const audiences = [
    {
      icon: Building2,
      title: "Local businesses",
      description: "that need steady, professional short-form content"
    },
    {
      icon: MapPin,
      title: "Franchise & multi-location teams",
      description: "that want consistent branding"
    },
    {
      icon: Users,
      title: "Agencies managing multiple clients",
      description: "(shared calendar & approvals)"
    }
  ];

  return (
    <section id="who-for" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            Who It's For
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Who it's for
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <Card key={index} className="hover:shadow-vibrant transition-all duration-300 border-0 bg-card">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary text-white flex-shrink-0">
                  <audience.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{audience.title}</h3>
                <p className="text-muted-foreground">{audience.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;