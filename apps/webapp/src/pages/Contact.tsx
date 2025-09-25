import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
import { useLocation, useNavigate } from "react-router-dom";

const Contact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get package selection from navigation state
  const packageSelection = location.state?.packageSelection;
  const source = location.state?.source || "contact_form";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: packageSelection ? `Hi! I'm interested in the ${packageSelection.agent} ${packageSelection.plan} plan${packageSelection.addOns.length > 0 ? ` with ${packageSelection.addOns.length} add-on service${packageSelection.addOns.length > 1 ? 's' : ''}` : ''}. Please get in touch to discuss next steps.` : ""
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
      <SEO
        title="Contact Us - Get in Touch with Vizeel"
        description="Get in touch with the Vizeel team. Contact us for support, partnerships, or questions about our AI-powered video creation platform. We're here to help you succeed."
        keywords="contact vizeel, customer support, video creation help, ai video support, get in touch"
        url="https://vizeel.com/contact"
        image="https://vizeel.com/og/vizeel-contact.png"
      />
      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-2 md:py-2">
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
                  {packageSelection && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2">Selected Package</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Agent:</span>
                          <span className="font-medium">{packageSelection.agent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Plan:</span>
                          <span className="font-medium">{packageSelection.plan} (${packageSelection.planPrice}/month)</span>
                        </div>
                        {packageSelection.addOns.length > 0 && (
                          <>
                            <div className="text-muted-foreground mt-2">Add-on Services:</div>
                            {packageSelection.addOns.map((addon: any, index: number) => (
                              <div key={index} className="flex justify-between ml-4">
                                <span className="text-muted-foreground">
                                  {addon.name} {addon.quantity > 1 ? `(${addon.quantity}x)` : ''}
                                </span>
                                <span className="font-medium">
                                  ${addon.price * addon.quantity}{addon.type === 'Recurring' ? '/mo' : ''}
                                </span>
                              </div>
                            ))}
                          </>
                        )}
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>Monthly Total:</span>
                          <span>${packageSelection.totals.monthly}</span>
                        </div>
                        {packageSelection.totals.oneTime > 0 && (
                          <div className="flex justify-between font-semibold text-orange-600">
                            <span>One-time Setup:</span>
                            <span>${packageSelection.totals.oneTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
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
                      formData={{
                        ...formData,
                        package_selection: packageSelection ? JSON.stringify(packageSelection) : undefined
                      }}
                      validationRules={{ email: true, phone: true }}
                      source={source}
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
                        // Navigate to success page
                        navigate("/contact/success");
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