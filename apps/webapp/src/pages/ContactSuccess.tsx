import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { CheckCircle, ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ContactSuccess = () => {
  return (
    <>
      <Navigation />
      <Helmet>
        <title>Thank You – Vizeel</title>
        <meta 
          name="description" 
          content="Thank you for contacting Vizeel. We'll get in touch with you soon." 
        />
        <link rel="canonical" href="https://vizeel.com/contact/success" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-border bg-card">
              <CardHeader className="pb-6">
                <div className="mx-auto mb-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
                  Thanks for signing up!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We will get in touch with you soon. Our team typically responds within 1 business day.
                </p>
                
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">vizeel.ai@gmail.com</span>
                </div>

                <div className="pt-4 space-y-3">
                  <Button asChild className="w-full">
                    <Link to="/">
                      Return to Home
                    </Link>
                  </Button>
                  
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/contact" className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back to Contact
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactSuccess;