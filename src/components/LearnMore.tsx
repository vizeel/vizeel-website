import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LearnMore = () => {
  const links = [
    {
      title: "Product",
      href: "/product",
      description: "Explore features and capabilities"
    },
    {
      title: "Pricing",
      href: "/pricing",
      description: "Find the right plan for you"
    },
    {
      title: "Contact",
      href: "/contact",
      description: "Get in touch with our team"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            Learn More
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Learn{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              more
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {links.map((link, index) => (
            <Card key={index} className="hover:shadow-vibrant transition-all duration-300 border-0 bg-card group">
              <CardContent className="p-8">
                <Link to={link.href} className="block">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {link.title}
                    </h3>
                    <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <p className="text-muted-foreground">{link.description}</p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearnMore;