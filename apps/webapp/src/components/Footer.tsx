import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  FileText,
  Instagram,
  Linkedin,
  Music,
  Shield,
  Sparkles,
  Youtube
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/vizeel.ai/", label: "Instagram" },
    // { icon: Facebook, href: "https://facebook.com/adwink", label: "Facebook" },
    // { icon: Music, href: "https://tiktok.com/@adwink", label: "TikTok" },
    // { icon: Youtube, href: "https://youtube.com/@adwink", label: "YouTube" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/vizeel/", label: "LinkedIn" }
  ];



  const legalLinks = [
    { label: "Terms of Service", href: "/terms", icon: FileText },
    { label: "Privacy Policy", href: "/privacy", icon: Shield }
  ];

  const quickLinks = [
    { label: "How It Works", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "About", href: "/about" }
  ].concat(legalLinks);

  const trustBadges = [
    "SSL Secured",
    "Stripe Verified Payments", 
    "No Editing Skills Needed",
    "Copyright Free Content"
  ];

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                  Vizeel
                </span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Reach new customers with engaging, on-brand, videos generated with your brand images and reviews. Vizeel's AI enhanced videos, that reflect your brand style and target audience, are delivered ready to post.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      aria-label={`Navigate to ${link.label} page`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>


            {/* Trust Badges */}
            <div>
              <h4 className="font-semibold text-foreground mb-6">Trust & Security</h4>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {trustBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 hover:border-green-300 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-green-800">{badge}</span>
                  </div>
                ))}
              </div>
              
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-6">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label={`Follow us on ${link.label}`}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Vizeel. All rights reserved.
            </div>
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;