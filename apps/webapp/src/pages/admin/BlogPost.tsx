import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
import ImageUpload from '@/components/ImageUpload';

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
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogSearchTerm, setBlogSearchTerm] = useState('');
  const [showBlogDialog, setShowBlogDialog] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: '',
    featured_image: null as { url: string; key: string; uploadedAt: Date } | null,
    published: false,
    tags: '',
    meta_title: '',
    meta_description: '',
    published_at: '',
  });

  const fetchBlogPosts = async () => {
    setBlogLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(`${apiUrl}/api/admin/blog`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const data = await response.json();
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch blog posts');
    } finally {
      setBlogLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const resetBlogForm = () => {
    setBlogFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      author: '',
      featured_image: null,
      published: false,
      tags: '',
      meta_title: '',
      meta_description: '',
      published_at: '',
    });
    setEditingBlogPost(null);
  };

  const handleBlogSubmit = async () => {
    if (!blogFormData.title || !blogFormData.content || !blogFormData.author) {
      toast.error('Please fill in title, content, and author fields');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const token = localStorage.getItem('admin_token');
      
      const payload = {
        ...blogFormData,
        slug: blogFormData.slug || generateSlug(blogFormData.title),
        tags: blogFormData.tags ? blogFormData.tags.split(',').map(tag => tag.trim()) : [],
        published_at: blogFormData.published && blogFormData.published_at ? 
          new Date(blogFormData.published_at).toISOString() : 
          (blogFormData.published ? new Date().toISOString() : undefined),
      };

      const url = editingBlogPost 
        ? `${apiUrl}/api/admin/blog/${editingBlogPost._id}`
        : `${apiUrl}/api/admin/blog`;
      
      const method = editingBlogPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingBlogPost ? 'update' : 'create'} blog post`);
      }

      toast.success(`Blog post ${editingBlogPost ? 'updated' : 'created'} successfully`);
      setShowBlogDialog(false);
      resetBlogForm();
      fetchBlogPosts();
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to ${editingBlogPost ? 'update' : 'create'} blog post`);
    }
  };

  const handleEditBlogPost = (post: BlogPost) => {
    setEditingBlogPost(post);
    setBlogFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      author: post.author,
      featured_image: post.featured_image ? {
        ...post.featured_image,
        uploadedAt: new Date(post.featured_image.uploadedAt)
      } : null,
      published: post.published,
      tags: post.tags ? post.tags.join(', ') : '',
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || '',
      published_at: post.published_at ? new Date(post.published_at).toISOString().split('T')[0] : '',
    });
    setShowBlogDialog(true);
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(`${apiUrl}/api/admin/blog/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }

      toast.success('Blog post deleted successfully');
      fetchBlogPosts();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete blog post');
    }
  };

  const filteredBlogPosts = useMemo(() => {
    if (!blogSearchTerm) return blogPosts;
    
    return blogPosts.filter(post => 
      post.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(blogSearchTerm.toLowerCase())))
    );
  }, [blogPosts, blogSearchTerm]);

  return (
    <div className="space-y-6">
      {/* Blog Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search by title, author, or tags..."
                value={blogSearchTerm}
                onChange={(e) => setBlogSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={fetchBlogPosts} disabled={blogLoading}>
              {blogLoading ? 'Loading...' : 'Refresh'}
            </Button>
            <Dialog open={showBlogDialog} onOpenChange={setShowBlogDialog}>
              <DialogTrigger asChild>
                <Button onClick={resetBlogForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingBlogPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      value={blogFormData.title}
                      onChange={(e) => {
                        setBlogFormData({
                          ...blogFormData, 
                          title: e.target.value,
                          slug: e.target.value ? generateSlug(e.target.value) : ''
                        });
                      }}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="slug" className="text-right">
                      Slug
                    </Label>
                    <Input
                      id="slug"
                      value={blogFormData.slug}
                      onChange={(e) => setBlogFormData({...blogFormData, slug: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="author" className="text-right">
                      Author *
                    </Label>
                    <Input
                      id="author"
                      value={blogFormData.author}
                      onChange={(e) => setBlogFormData({...blogFormData, author: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="excerpt" className="text-right">
                      Excerpt
                    </Label>
                    <Textarea
                      id="excerpt"
                      value={blogFormData.excerpt}
                      onChange={(e) => setBlogFormData({...blogFormData, excerpt: e.target.value})}
                      className="col-span-3"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="content" className="text-right pt-2">
                      Content *
                    </Label>
                    <div className="col-span-3 mb-6">
                      <RichTextEditor
                        value={blogFormData.content}
                        onChange={(value) => setBlogFormData({...blogFormData, content: value})}
                        placeholder="Write your blog post content here..."
                        className="w-full mb-4"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right pt-2">
                      Featured Image
                    </Label>
                    <div className="col-span-3">
                      <ImageUpload
                        value={blogFormData.featured_image}
                        onChange={(imageData) => setBlogFormData({...blogFormData, featured_image: imageData})}
                        label=""
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tags" className="text-right">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      value={blogFormData.tags}
                      onChange={(e) => setBlogFormData({...blogFormData, tags: e.target.value})}
                      className="col-span-3"
                      placeholder="Separate with commas"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="meta_title" className="text-right">
                      Meta Title
                    </Label>
                    <Input
                      id="meta_title"
                      value={blogFormData.meta_title}
                      onChange={(e) => setBlogFormData({...blogFormData, meta_title: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="meta_description" className="text-right">
                      Meta Description
                    </Label>
                    <Textarea
                      id="meta_description"
                      value={blogFormData.meta_description}
                      onChange={(e) => setBlogFormData({...blogFormData, meta_description: e.target.value})}
                      className="col-span-3"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="published_at" className="text-right">
                      Publish Date
                    </Label>
                    <Input
                      id="published_at"
                      type="date"
                      value={blogFormData.published_at}
                      onChange={(e) => setBlogFormData({...blogFormData, published_at: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="published" className="text-right">
                      Published
                    </Label>
                    <Switch
                      id="published"
                      checked={blogFormData.published}
                      onCheckedChange={(checked) => setBlogFormData({...blogFormData, published: checked})}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowBlogDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleBlogSubmit}>
                    {editingBlogPost ? 'Update' : 'Create'} Post
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts List */}
      <Card>
        <CardContent className="p-6">
          {filteredBlogPosts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No blog posts found</p>
              <Button onClick={() => {resetBlogForm(); setShowBlogDialog(true);}}>
                <Plus className="w-4 h-4 mr-2" />
                Create your first blog post
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBlogPosts.map((post) => (
                <div key={post._id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        By {post.author} • {new Date(post.published_at || post.createdAt).toLocaleDateString()}
                      </p>
                      {post.excerpt && (
                        <p className="text-gray-700 mb-2">{post.excerpt}</p>
                      )}
                      <div className="flex items-center gap-2">
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                        {post.tags && post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditBlogPost(post)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteBlogPost(post._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPost;