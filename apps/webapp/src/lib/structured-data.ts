// Structured data schemas for SEO

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vizeel",
  "description": "AI-powered video creation platform for social media content",
  "url": "https://vizeel.com",
  "logo": "https://vizeel.com/logo.svg",
  "sameAs": [
    "https://twitter.com/vizeel",
    "https://linkedin.com/company/vizeel"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "customer service",
    "email": "support@vizeel.com"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Vizeel",
  "description": "Turn long videos into publishable short clips—automatically. Vizeel drafts highlights, titles, captions, and transcripts in your brand style.",
  "url": "https://vizeel.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://vizeel.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Vizeel",
  "description": "AI-powered video editing platform that automatically turns long videos into publishable short clips",
  "url": "https://vizeel.com",
  "applicationCategory": "VideoEditingApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free trial available"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127"
  }
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const articleSchema = (article: {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "url": article.url,
  "datePublished": article.publishedTime,
  "dateModified": article.modifiedTime || article.publishedTime,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Vizeel",
    "logo": {
      "@type": "ImageObject",
      "url": "https://vizeel.com/logo.svg"
    }
  },
  "image": article.image || "https://vizeel.com/og-image.png",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  }
});

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Vizeel",
  "description": "AI-powered video creation platform",
  "url": "https://vizeel.com",
  "telephone": "+1-XXX-XXX-XXXX",
  "email": "contact@vizeel.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  }
};