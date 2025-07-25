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
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" }
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
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  AdWink
                </span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                AI-powered platform that transforms your ideas into scroll-stopping videos 
                for all social media platforms in seconds.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href="mailto:hello@adwink.com" className="text-muted-foreground hover:text-foreground transition-colors">
                    hello@adwink.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href="tel:+1-555-0123" className="text-muted-foreground hover:text-foreground transition-colors">
                    +1 (555) 012-3456
                  </a>
                </div>
              </div>
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
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-foreground mb-6">Follow Us</h4>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Stay updated with the latest features and tips for creating amazing videos.
              </p>
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
              © {new Date().getFullYear()} AdWink. All rights reserved.
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