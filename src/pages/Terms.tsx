import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <>
      <Navigation />
      <Helmet>
        <title>Terms of Service – Vizeel</title>
        <meta name="description" content="Terms of service for Vizeel AI video creation platform." />
        <link rel="canonical" href="https://vizeel.com/terms" />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="Terms of Service – Vizeel" />
        <meta property="og:description" content="Terms of service for Vizeel AI video creation platform." />
        <meta property="og:url" content="https://vizeel.com/terms" />
        <meta property="og:image" content="/og/vizeel-legal.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Service – Vizeel" />
        <meta name="twitter:description" content="Terms of service for Vizeel AI video creation platform." />
        <meta name="twitter:image" content="/og/vizeel-legal.png" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
              <div className="text-sm text-muted-foreground mb-6">
                Draft for web • Updated August 12, 2025
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Terms of Service
              </h1>
              
              <div className="text-sm text-muted-foreground mb-8">
                Effective date: August 12, 2025 • Release: R1.1
              </div>
              
              <div className="text-sm text-muted-foreground mb-8 p-4 bg-muted rounded-lg">
                This template is for general guidance and is not legal advice. Please have counsel review before publishing.
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using Vizeel's AI-assisted video creation and scheduling services, you agree to be bound by these Terms of Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
                <p className="text-muted-foreground">
                  Vizeel provides AI-powered tools for creating, editing, and scheduling video content for social media platforms and other distribution channels.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Accounts</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>You must provide accurate account information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>One account per user/organization</li>
                  <li>You must be at least 16 years old to use our service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Content and Intellectual Property</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>You retain ownership of content you upload</li>
                  <li>You grant us license to process and distribute your content as needed for the service</li>
                  <li>You must have rights to all content you upload</li>
                  <li>We reserve rights to our AI technology and platform</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Acceptable Use</h2>
                <p className="text-muted-foreground">
                  You agree not to use our service for illegal, harmful, or abusive purposes, including but not limited to spam, harassment, or copyright infringement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Payment and Billing</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Subscription fees are billed monthly in advance</li>
                  <li>No refunds for partial months</li>
                  <li>You may cancel at any time</li>
                  <li>Price changes will be communicated 30 days in advance</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Service Availability</h2>
                <p className="text-muted-foreground">
                  We strive for high availability but cannot guarantee uninterrupted service. We may perform maintenance with reasonable notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  Our liability is limited to the amount paid for our service. We are not responsible for indirect, incidental, or consequential damages.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Termination</h2>
                <p className="text-muted-foreground">
                  Either party may terminate this agreement. We may suspend or terminate accounts for violations of these terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We may update these terms as needed. Material changes will be communicated via email or service notification.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these terms, contact us at{" "}
                  <a href="mailto:legal@vizeel.com" className="text-accent hover:underline">
                    legal@vizeel.com
                  </a>
                  <br />
                  Mailing address: [To be added]
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Terms;