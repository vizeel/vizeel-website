import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import SvgIcon from "@/components/SvgIcon";
import 'react-quill/dist/quill.snow.css';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: string;
  featured_image?: {
    url: string;
    key: string;
    uploadedAt: string;
  };
  published: boolean;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  published_at?: string;
  createdAt: string;
  updatedAt: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug);
    }
  }, [slug]);

  const fetchBlogPost = async (postSlug: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const response = await fetch(`${apiUrl}/api/blog/${postSlug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Blog post not found');
        }
        throw new Error('Failed to fetch blog post');
      }
      const data = await response.json();
      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || post.title,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to copying URL to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading blog post...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4 text-foreground">
                {error || 'Blog post not found'}
              </h1>
              <Button asChild>
                <Link to="/blog">Back to Blog</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Helmet>
        <title>{post.meta_title || post.title} – Vizeel Blog</title>
        <meta 
          name="description" 
          content={post.meta_description || post.excerpt || `Read about ${post.title} on the Vizeel blog.`} 
        />
        <meta 
          name="keywords" 
          content={post.tags ? post.tags.join(', ') : 'blog, AI video marketing, small business'} 
        />
        <link rel="canonical" href={`https://vizeel.com/blog/${post.slug}`} />
        <meta name="robots" content="index,follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || `Read about ${post.title} on the Vizeel blog.`} />
        <meta property="og:url" content={`https://vizeel.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        {post.featured_image && <meta property="og:image" content={post.featured_image.url} />}
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.published_at || post.createdAt} />
        {post.tags && post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || `Read about ${post.title} on the Vizeel blog.`} />
        {post.featured_image && <meta name="twitter:image" content={post.featured_image.url} />}

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Vizeel",
              "url": "https://vizeel.com"
            },
            "datePublished": post.published_at || post.createdAt,
            "dateModified": post.updatedAt,
            "url": `https://vizeel.com/blog/${post.slug}`,
            "image": post.featured_image?.url,
            "keywords": post.tags?.join(', ')
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Back Button */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/blog" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </section>

        {/* Featured Image */}
        <section>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video overflow-hidden rounded-lg mb-8 flex items-center justify-center bg-muted/20">
                {post.featured_image ? (
                  <img 
                    src={post.featured_image.url} 
                    alt={post.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div style={{ display: post.featured_image ? 'none' : 'flex' }} className="w-full h-full items-center justify-center">
                  <SvgIcon 
                    src="/logo.svg" 
                    alt="Logo" 
                    width={120} 
                    height={120}
                    className="object-contain logo-fill"
                    backgroundColor="transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Article Header */}
              <header className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.published_at || post.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                  {post.title}
                </h1>
                
                {post.excerpt && (
                  <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </header>

              {/* Article Body */}
              <div>
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .blog-content ul {
                      list-style-type: disc;
                      padding-left: 1.5rem;
                      margin: 1rem 0;
                    }
                    .blog-content ol {
                      list-style-type: decimal;
                      padding-left: 1.5rem;
                      margin: 1rem 0;
                    }
                    .blog-content li {
                      margin: 0.5rem 0;
                      padding-left: 0.25rem;
                    }
                    .blog-content .ql-indent-1 {
                      padding-left: 2rem;
                    }
                    .blog-content .ql-indent-2 {
                      padding-left: 3rem;
                    }
                    .blog-content .ql-indent-3 {
                      padding-left: 4rem;
                    }
                    .blog-content p {
                      margin: 1rem 0;
                      line-height: 1.7;
                    }
                    .blog-content strong {
                      font-weight: 600;
                    }
                    .blog-content em {
                      font-style: italic;
                    }
                    .blog-content a {
                      color: hsl(var(--primary));
                      text-decoration: underline;
                    }
                    .blog-content a:hover {
                      text-decoration: none;
                    }
                  `
                }} />
                <div 
                  className="blog-content prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Ready to Create 
                  <span className="text-primary"> AI Videos?</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of SMBs who are already using Vizeel to create engaging, 
                  on-brand videos that drive real results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/contact">Join Waitlist</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/blog">Read More Articles</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;