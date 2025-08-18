import { Badge } from "@/components/ui/badge";

const WhyVizeel = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            The Problem
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Why{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Vizeel
            </span>
          </h2>
          <div className="text-xl text-muted-foreground max-w-3xl mx-auto space-y-4">
            <p>
              Posting consistently is hard and planning content, editing videos, and captioning brand posts take extra time.
            </p>
            <p>
              Vizeel researches, plans, and generates short videos for your brand; subscribers receive a steady pipeline of on-brand, engaging, 'ready to post' videos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyVizeel;