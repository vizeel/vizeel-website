import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Linkedin, 
  Instagram, 
  Facebook, 
  Youtube, 
  Music, 
  Mail, 
  Phone,
  Shield,
  FileText,
  Sparkles
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/adwink", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/adwink", label: "Facebook" },
    { icon: Music, href: "https://tiktok.com/@adwink", label: "TikTok" },
    { icon: Youtube, href: "https://youtube.com/@adwink", label: "YouTube" },
    { icon: Linkedin, href: "https://linkedin.com/company/adwink", label: "LinkedIn" }
  ];

  const quickLinks = [
    { label: "How It Works", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" }
  ];

  const legalLinks = [
    { label: "Terms of Service", href: "/terms", icon: FileText },
    { label: "Privacy Policy", href: "/privacy", icon: Shield }
  ];

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
          <div className="grid lg:grid-cols-3 gap-12">
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
              <div className="space-y-3 mb-6">
                {trustBadges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="w-full justify-start">
                    <Shield className="w-3 h-3 mr-2" />
                    {badge}
                  </Badge>
                ))}
              </div>
              
              {/* Legal Links */}
              <div className="space-y-2">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    <link.icon className="w-3 h-3" />
                    {link.label}
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
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Made with ❤️ for creators</span>
              <Badge variant="outline" className="text-xs">
                Powered by AI
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;