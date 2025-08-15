import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <>
      <Navigation />
      <Helmet>
        <title>Privacy Policy – Vizeel</title>
        <meta name="description" content="How we collect, use, and protect your information." />
        <link rel="canonical" href="https://vizeel.com/privacy" />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="Privacy Policy – Vizeel" />
        <meta property="og:description" content="How we collect, use, and protect your information." />
        <meta property="og:url" content="https://vizeel.com/privacy" />
        <meta property="og:image" content="/og/vizeel-legal.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy – Vizeel" />
        <meta name="twitter:description" content="How we collect, use, and protect your information." />
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
                Privacy Policy
              </h1>
              
              <div className="text-sm text-muted-foreground mb-8">
                Effective date: August 12, 2025 • Release: R1.1
              </div>
              
              <div className="text-sm text-muted-foreground mb-8 p-4 bg-muted rounded-lg">
                This template is for general guidance and is not legal advice. Please have counsel review before publishing.
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Who we are</h2>
                <p className="text-muted-foreground">
                  Vizeel provides AI-assisted video creation and scheduling tools for businesses. This policy explains how we handle personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information we collect</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Account data</li>
                  <li>Billing data</li>
                  <li>Service data</li>
                  <li>Website data (cookies/analytics)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How we use information</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide/improve service</li>
                  <li>Generate/schedule content</li>
                  <li>Security/fraud/support</li>
                  <li>Product communications (opt-out available)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Sharing</h2>
                <p className="text-muted-foreground">
                  Service providers (hosting, analytics, payments, support) with safeguards/limited use.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Cookies & tracking</h2>
                <p className="text-muted-foreground">
                  Essential + analytics; controls via browser; additional notice if advertising cookies are used.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Data retention</h2>
                <p className="text-muted-foreground">
                  While account is active and as needed for service/legal/disputes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Your rights</h2>
                <p className="text-muted-foreground">
                  Access/correct/delete/port/object/restrict depending on location; contact us to exercise.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">8. International transfers</h2>
                <p className="text-muted-foreground">
                  Cross-border transfers; appropriate safeguards (e.g., SCCs) where required.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Security</h2>
                <p className="text-muted-foreground">
                  Administrative/technical/physical measures; no method is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Children</h2>
                <p className="text-muted-foreground">
                  Not intended for &lt;16; we don't knowingly collect children's data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Changes</h2>
                <p className="text-muted-foreground">
                  We'll update as needed; material changes communicated via service or email.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Contact</h2>
                <p className="text-muted-foreground">
                  <a href="mailto:privacy@vizeel.com" className="text-accent hover:underline">
                    privacy@vizeel.com
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

export default Privacy;