import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How long does it take to generate a video?",
      answer: "Our AI typically generates videos in 2-5 minutes for Basic tier and 1-3 minutes for Pro tier. The exact time depends on video complexity and current server load. You'll receive real-time updates during the generation process."
    },
    {
      question: "What video formats are supported?",
      answer: "We support all major social media formats including 9:16 (vertical) for Instagram Reels, TikTok, and YouTube Shorts, 1:1 (square) for Instagram posts and Facebook, and 16:9 (horizontal) for YouTube and LinkedIn. Videos are exported in MP4 format with HD (1080p) or 4K quality depending on your plan."
    },
    {
      question: "Can I review the video before publishing?",
      answer: "Absolutely! You'll always see a preview of your video before it goes live. You can make minor adjustments, request regeneration, or approve for publishing. Our 1-click publishing feature only activates after you've approved the final video."
    },
    {
      question: "What if I want to edit something manually?",
      answer: "While our AI creates ready-to-publish videos, you can download the video file and make manual edits in your preferred video editing software. Pro tier users also get access to basic editing tools within our platform for quick adjustments like text overlays and music changes."
    },
    {
      question: "Is the content copyright-free?",
      answer: "Yes! All music, images, and video elements used by our AI are royalty-free and licensed for commercial use. You own the rights to your generated videos and can use them freely across all your marketing channels without any copyright concerns."
    },
    {
      question: "How does the 1-click publishing work?",
      answer: "Simply connect your social media accounts once (Instagram, TikTok, YouTube, Facebook, LinkedIn), and our platform will handle the rest. After you approve a video, choose your platforms and hit publish - we'll automatically format and post to each platform with optimal settings."
    },
    {
      question: "Can I use my own branding and assets?",
      answer: "Yes! Upload your logo, brand colors, fonts, and product images. Our AI will incorporate your branding elements into every video while maintaining professional design standards. Pro tier users get advanced branding options including custom templates."
    },
    {
      question: "What happens if I'm not satisfied with a video?",
      answer: "If you're not happy with a generated video, you can request a regeneration at no extra cost (up to 2 regenerations per video). Our AI learns from your feedback to create better videos that match your style and preferences."
    },
    {
      question: "Do you offer refunds?",
      answer: "We do not issue refunds for our video generation services. All sales are final. We recommend taking advantage of our free trial or basic tier to test our platform before upgrading to ensure our service meets your needs."
    },
    {
      question: "Is there a limit to how many videos I can generate?",
      answer: "Each plan includes a specific number of video generations (4 for Basic, 4 for Pro). Once you've used your allocation, you can purchase additional video packages or upgrade to a higher tier. There are no monthly limits - use your videos whenever you need them."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Frequently Asked{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Got questions? We've got answers. Here are the most common questions about AdWink.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-2">
                  <div className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still have questions CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 animate-bounce-gentle" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Our support team is here to help you succeed. Get in touch and we'll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@adwink.com"
                className="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-lg px-6 py-3 font-semibold transition-all duration-300"
              >
                Email Support
              </a>
              <a 
                href="tel:+1-555-0123"
                className="inline-flex items-center justify-center bg-white text-primary hover:bg-white/90 rounded-lg px-6 py-3 font-semibold transition-all duration-300"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;