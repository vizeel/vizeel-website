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
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Terms of Service
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Coming soon. This page will contain our complete terms of service.
              </p>
              <p className="text-muted-foreground">
                For questions about our terms, please contact us at{" "}
                <a href="mailto:support@vizeel.com" className="text-accent hover:underline">
                  support@vizeel.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Terms;