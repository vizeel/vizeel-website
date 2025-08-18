import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const FAQ = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does it take to generate a video?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "After you connect your socials and add your Brand Kit, we generate your first Media Plan immediately. Once you activate your media plan by subscribing to a paid plan, short-form videos generate throughout the month according to your plan. Most customers see initial clips within 1–2 business days."
        }
      },
      {
        "@type": "Question", 
        "name": "What video formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vertical-first MP4 (9:16, 1080×1920) is standard. We can also provide square MP4 (1:1, 1080×1080). Transcripts/notes are included; captions (SRT/VTT) are available on eligible plans."
        }
      },
      {
        "@type": "Question",
        "name": "What if I want to edit something manually?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "You can request simple edits (titles, captions, thumbnail text) or download the file and make changes with your own tools."
        }
      },
      {
        "@type": "Question",
        "name": "Is the content copyright-free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We primarily use your brand assets, site content, and public reviews. Any third-party media used follows licensing best practices. You should only upload assets you have rights to use."
        }
      },
      {
        "@type": "Question",
        "name": "How does the content publishing work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Connect your social accounts once. We then generate and post content on your behalf, following your content calendar. You can turn off auto-posting and specify blackout dates for content."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use my own branding and assets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Add your Brand Kit (logos, colors, fonts) plus intro/outro cards once. We'll apply those presets so every video stays on brand."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if I'm not satisfied with a video?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We aim to generate highly effective and branded short-form videos. We expect videos to conform to our internal standards and do not issue refunds or revisions. If a video does not conform to brand guidelines, please submit a support ticket."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer refunds?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Subscriptions can be canceled at any time to stop future billing. As noted in our Terms, completed billing periods aren't typically refundable, except where required by law."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a limit to how many videos I can generate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each plan includes a monthly allocation (Entry, Sweet Spot, or Power User). If you need more, you can add extra blocks or upgrade at any time."
        }
      }
    ]
  };

  return (
    <>
      <Navigation />
      <Helmet>
        <title>Frequently Asked Questions — Vizeel</title>
        <meta 
          name="description" 
          content="Answers about formats, approvals, auto-posting, branding, refunds, and plan limits for Vizeel." 
        />
        <meta 
          name="keywords" 
          content="faq, frequently asked questions, video generation, formats, publishing, branding" 
        />
        <link rel="canonical" href="https://vizeel.com/faq" />
        <meta name="robots" content="index,follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Frequently Asked Questions — Vizeel" />
        <meta property="og:description" content="Answers about formats, approvals, auto-posting, branding, refunds, and plan limits for Vizeel." />
        <meta property="og:url" content="https://vizeel.com/faq" />
        <meta property="og:image" content="/og/vizeel-faq.png" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Frequently Asked Questions — Vizeel" />
        <meta name="twitter:description" content="Answers about formats, approvals, auto-posting, branding, refunds, and plan limits for Vizeel." />
        <meta name="twitter:image" content="/og/vizeel-faq.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Frequently Asked Questions
              </h1>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  How long does it take to generate a video?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  After you connect your socials and add your Brand Kit, we generate your first Media Plan immediately. Once you activate your media plan by subscribing to a paid plan, short-form videos generate throughout the month according to your plan. Most customers see initial clips within 1–2 business days.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  What video formats are supported?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vertical-first MP4 (9:16, 1080×1920) is standard. We can also provide square MP4 (1:1, 1080×1080). Transcripts/notes are included; captions (SRT/VTT) are available on eligible plans.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  What if I want to edit something manually?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You can request simple edits (titles, captions, thumbnail text) or download the file and make changes with your own tools.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Is the content copyright-free?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We primarily use your brand assets, site content, and public reviews. Any third-party media used follows licensing best practices. You should only upload assets you have rights to use.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  How does the content publishing work?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Connect your social accounts once. We then generate and post content on your behalf, following your content calendar. You can turn off auto-posting and specify blackout dates for content.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Can I use my own branding and assets?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Yes. Add your Brand Kit (logos, colors, fonts) plus intro/outro cards once. We'll apply those presets so every video stays on brand.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  What happens if I'm not satisfied with a video?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We aim to generate highly effective and branded short-form videos. We expect videos to conform to our internal standards and do not issue refunds or revisions. If a video does not conform to brand guidelines, please submit a support ticket.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Do you offer refunds?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Subscriptions can be canceled at any time to stop future billing. As noted in our Terms, completed billing periods aren't typically refundable, except where required by law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Is there a limit to how many videos I can generate?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Each plan includes a monthly allocation (Entry, Sweet Spot, or Power User). If you need more, you can add extra blocks or upgrade at any time.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;