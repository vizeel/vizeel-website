import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import VideoGallery from "@/components/VideoGallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <VideoGallery />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
