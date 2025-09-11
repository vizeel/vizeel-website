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
            Consistent posting is tough. Content planning, video editing, and captioning all eat up valuable time.
            </p>
            <p>
            Vizeel handles it for you—researching, planning, and creating short, on-brand videos so you get a steady flow of engaging, ready-to-post content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyVizeel;