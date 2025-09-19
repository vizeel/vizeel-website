import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import SvgIcon from "./SvgIcon";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Product", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "Affiliates", href: "/affiliates" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav 
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
          aria-label="Vizeel home page"
        >
        <SvgIcon 
          src="/logo.svg" 
          alt="Vizeel logo" 
          width={80} 
          height={80}
          className="object-contain logo-fill"
          backgroundColor="transparent"
        />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8" role="list">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1",
                isActiveRoute(item.href)
                  ? "text-primary font-semibold"
                  : "text-foreground"
              )}
              aria-current={isActiveRoute(item.href) ? "page" : undefined}
              role="listitem"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          {/* <Button variant="outline" size="sm" asChild>
            <a href="https://app.vizeel.com" target="_blank" rel="noopener noreferrer">
              Login
            </a>
          </Button> */}
          <Button className="btn-primary" size="sm" asChild>
            <Link to="/contact">Join waitlist</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-accent rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                Vizeel
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
                    isActiveRoute(item.href)
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://app.vizeel.com" target="_blank" rel="noopener noreferrer">
                    Login
                  </a>
                </Button>
                <Button size="sm" className="w-full btn-primary" asChild>
                  <Link to="/contact" onClick={() => setIsOpen(false)}>Join waitlist</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;