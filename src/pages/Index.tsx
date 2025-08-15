import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyVizeel from "@/components/WhyVizeel";
import WhoItsFor from "@/components/WhoItsFor";
import Features from "@/components/Features";
import NewHowItWorks from "@/components/NewHowItWorks";
import WhatYouGet from "@/components/WhatYouGet";
import LearnMore from "@/components/LearnMore";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WhyVizeel />
      <WhoItsFor />
      <Features />
      <NewHowItWorks />
      <WhatYouGet />
      <LearnMore />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
