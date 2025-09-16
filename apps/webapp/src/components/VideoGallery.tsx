import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Instagram, Music, Youtube, Facebook } from "lucide-react";
import fashionImage from "@/assets/sample-fashion.jpg";
import foodImage from "@/assets/sample-food.jpg";
import fitnessImage from "@/assets/sample-fitness.jpg";
import businessImage from "@/assets/sample-business.jpg";

const VideoGallery = () => {
  const videoSamples = [
    {
      title: "Fashion Showcase",
      platform: "Instagram Reels",
      icon: Instagram,
      image: fashionImage,
      category: "Fashion",
      description: "Trendy outfit reveals and styling tips",
      color: "bg-gradient-to-br from-pink-500 to-purple-600"
    },
    {
      title: "Food Recipe",
      platform: "TikTok",
      icon: Music,
      image: foodImage,
      category: "Food & Cooking",
      description: "Quick recipe tutorials and food prep",
      color: "bg-gradient-to-br from-red-500 to-orange-500"
    },
    {
      title: "Fitness Motivation",
      platform: "YouTube Shorts",
      icon: Youtube,
      image: fitnessImage,
      category: "Fitness",
      description: "Workout routines and fitness tips",
      color: "bg-gradient-to-br from-green-500 to-teal-500"
    },
    {
      title: "Local Business",
      platform: "Facebook",
      icon: Facebook,
      image: businessImage,
      category: "Business",
      description: "Showcase your products and services",
      color: "bg-gradient-to-br from-blue-500 to-indigo-600"
    }
  ];

  const useCases = [
    "Product Launches",
    "Brand Awareness", 
    "Customer Testimonials",
    "Behind the Scenes",
    "Educational Content",
    "Event Promotion",
    "Seasonal Campaigns",
    "User-Generated Content"
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            Sample Gallery
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            See AdWink in{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From fashion to food, fitness to business - see how our AI creates stunning videos 
            for every industry and platform.
          </p>
        </div>

        {/* Video Samples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {videoSamples.map((sample, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-vibrant transition-all duration-300 border-0 bg-card">
              <div className="relative aspect-[9/16] overflow-hidden">
                <img 
                  src={sample.image} 
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="w-6 h-6 text-primary ml-1" />
                  </div>
                </div>

                {/* Platform Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={`${sample.color} text-white border-0`}>
                    <sample.icon className="w-3 h-3 mr-1" />
                    {sample.platform}
                  </Badge>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-black">
                    {sample.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{sample.title}</h3>
                <p className="text-muted-foreground text-sm">{sample.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Support */}
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Optimized for Every Platform
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our AI automatically adjusts video dimensions, pacing, and style for each social media platform.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Instagram Reels", icon: Instagram, aspect: "9:16" },
              { name: "TikTok", icon: Music, aspect: "9:16" },
              { name: "YouTube Shorts", icon: Youtube, aspect: "9:16" },
              { name: "Facebook", icon: Facebook, aspect: "1:1" },
              { name: "Twitter", icon: Music, aspect: "16:9" }
            ].map((platform, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-300">
                <platform.icon className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm font-semibold">{platform.name}</div>
                <div className="text-xs text-white/70">{platform.aspect}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
            Perfect for Any Use Case
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {useCases.map((useCase, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-default"
              >
                {useCase}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;