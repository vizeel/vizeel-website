import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import SubmitButton from "@/components/ui/SubmitButton";
import { 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Music, 
  MapPin, 
  MessageSquare
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 1 business day.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const socialLinks = [
    { icon: Instagram, label: "Instagram", handle: "@vizeel" },
    { icon: Music, label: "TikTok", handle: "@vizeel" },
    { icon: Facebook, label: "Facebook", handle: "vizeel" }
  ];

  return (
    <>
      <Navigation />
      <Helmet>
        <title>Contact – Vizeel</title>
        <meta 
          name="description" 
          content="Get in touch with the Vizeel team." 
        />
        <link rel="canonical" href="https://vizeel.com/contact" />
        <meta name="robots" content="index,follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact – Vizeel" />
        <meta property="og:description" content="Get in touch with the Vizeel team." />
        <meta property="og:url" content="https://vizeel.com/contact" />
        <meta property="og:image" content="/og/vizeel-contact.png" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact – Vizeel" />
        <meta name="twitter:description" content="Get in touch with the Vizeel team." />
        <meta name="twitter:image" content="/og/vizeel-contact.png" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                We'd love to hear, 
                <span className="text-primary">from you</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Use the form below or email <span className="text-primary">vizeel.ai@gmail.com</span>
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <section>
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact form</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => {
                          // Only allow numerical characters
                          const newPhone = e.target.value.replace(/\D/g, '');
                          setFormData(prev => ({
                            ...prev,
                            phone: newPhone
                          }));
                        }}
                        placeholder="Your phone number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company name (optional)"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project or ask any questions..."
                        rows={5}
                      />
                    </div>

                    <SubmitButton
                      formData={formData}
                      validationRules={{ email: true, phone: true }}
                      source="contact_form"
                      successMessage="Message sent! We'll get back to you within 1 business day."
                      onSuccess={(data) => {
                        // Reset form on success
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          message: ""
                        });
                      }}
                      className="w-full"
                    >
                      Send Message
                    </SubmitButton>
                  </form>
                </CardContent>
              </Card>
            </section>

            {/* Contact Info */}
            <section className="space-y-8">
              {/* Support Hours */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Support hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">
                    Mon–Fri, 9:00am–5:00pm (Central Time)
                  </p>
                </CardContent>
              </Card>


            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;