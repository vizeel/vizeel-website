import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyVizeel from "@/components/WhyVizeel";
import WhoItsFor from "@/components/WhoItsFor";
import NewHowItWorks from "@/components/NewHowItWorks";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { organizationSchema, websiteSchema, softwareApplicationSchema } from "@/lib/structured-data";

const Index = () => {
  const combinedStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      softwareApplicationSchema
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Vizeel - AI-Powered Video Creation for Social Media"
        description="Turn long videos into publishable short clips—automatically. Vizeel drafts highlights, titles, captions, and transcripts in your brand style. Start your free trial today."
        keywords="AI video editing, social media content, video highlights, automated video creation, content creation tools, video marketing, short form videos, video clips, social media marketing"
        url="https://vizeel.com"
        structuredData={combinedStructuredData}
      />
      <Navigation />
      <HeroSection />
      <WhyVizeel />
      <WhoItsFor />
      <NewHowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
