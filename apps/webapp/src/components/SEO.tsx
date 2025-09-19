import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  structuredData?: object;
}

const SEO = ({
  title = "Vizeel - AI-Powered Video Creation for Social Media",
  description = "Turn long videos into publishable short clips—automatically. Vizeel drafts highlights, titles, captions, and transcripts in your brand style.",
  keywords = "AI video editing, social media content, video highlights, automated video creation, content creation tools, video marketing",
  image = "https://vizeel.com/og-image.png",
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = "Vizeel",
  section,
  structuredData
}: SEOProps) => {
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://vizeel.com');
  const fullTitle = title.includes('Vizeel') ? title : `${title} | Vizeel`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${title} - Vizeel`} />
      <meta property="og:site_name" content="Vizeel" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${title} - Vizeel`} />
      <meta name="twitter:site" content="@vizeel" />
      <meta name="twitter:creator" content="@vizeel" />

      {/* Article specific tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
        </>
      )}

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#000000" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;