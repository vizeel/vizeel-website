import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import SvgIcon from "@/components/SvgIcon";

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

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const response = await fetch(`${apiUrl}/api/blog`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      const data = await response.json();
      setPosts(data);
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

  const getExcerpt = (post: BlogPost) => {
    if (post.excerpt) return post.excerpt;
    // Create excerpt from content by stripping HTML and limiting to 150 characters
    const textContent = post.content.replace(/<[^>]*>/g, '');
    return textContent.length > 150 ? textContent.substring(0, 150) + '...' : textContent;
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <p className="text-red-500">Error: {error}</p>
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
        <title>Blog – Vizeel</title>
        <meta 
          name="description" 
          content="Read the latest insights about AI video marketing, small business growth, and Vizeel updates from our team." 
        />
        <meta 
          name="keywords" 
          content="blog, AI video marketing, small business, SMB, video content, marketing insights" 
        />
        <link rel="canonical" href="https://vizeel.com/blog" />
        <meta name="robots" content="index,follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog – Vizeel" />
        <meta property="og:description" content="Read the latest insights about AI video marketing, small business growth, and Vizeel updates from our team." />
        <meta property="og:url" content="https://vizeel.com/blog" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog – Vizeel" />
        <meta name="twitter:description" content="Read the latest insights about AI video marketing, small business growth, and Vizeel updates from our team." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-2 md:py-2">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Vizeel 
                <span className="text-primary"> Blog</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Insights, updates, and tips about AI-powered video marketing for small businesses.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {posts.length === 0 ? (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">No blog posts yet</h2>
                  <p className="text-muted-foreground mb-8">
                    We're working on creating great content for you. Check back soon!
                  </p>
                  <Button asChild>
                    <Link to="/contact">Join our waitlist for updates</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <Card key={post._id} className="border-border bg-card hover:shadow-lg transition-shadow duration-300 group">
                      <div className="aspect-video overflow-hidden rounded-t-lg flex items-center justify-center bg-muted/20">
                        {post.featured_image ? (
                          <img 
                            src={post.featured_image.url} 
                            alt={post.title}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
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
                            width={80} 
                            height={80}
                            className="object-contain logo-fill"
                            backgroundColor="transparent"
                          />
                        </div>
                      </div>
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.published_at || post.createdAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                        </div>
                        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-muted-foreground leading-relaxed">
                          {getExcerpt(post)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <Button variant="outline" asChild className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                          <Link to={`/blog/${post.slug}`} className="flex items-center justify-center gap-2">
                            Read More
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Ready to Transform Your 
                  <span className="text-primary"> Marketing?</span>
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
                    <Link to="/product">See How It Works</Link>
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

export default Blog;