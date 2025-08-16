import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyVizeel from "@/components/WhyVizeel";
import WhoItsFor from "@/components/WhoItsFor";
import NewHowItWorks from "@/components/NewHowItWorks";
import LearnMore from "@/components/LearnMore";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WhyVizeel />
      <WhoItsFor />
      <NewHowItWorks />
      <LearnMore />
      <Footer />
    </div>
  );
};

export default Index;
