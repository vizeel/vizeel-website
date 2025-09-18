import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Search, Download, RefreshCw, MapPin, Star, Globe, Phone } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface WaitlistSignup {
  _id: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  name?: string;
  recaptcha_token?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
  is_contacted: boolean;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: string;
  featured_image?: string;
  published: boolean;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  published_at?: string;
  createdAt: string;
  updatedAt: string;
}

interface PlacesSearchResult {
  title: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewsCount?: number;
  categoryName?: string;
  location?: {
    lat: number;
    lng: number;
  };
  openingHours?: string[];
  priceLevel?: string;
  placeId?: string;
  url?: string;
  totalScore?: number;
  permanentlyClosed?: boolean;
  temporarilyClosed?: boolean;
  businessStatus?: string;
}

interface GooglePlacesSearchParams {
  textQuery: string;
  regionCode?: string;
}

interface PlacesSearchResponse {
  places: PlacesSearchResult[];
  nextPageToken?: string;
  totalResults: number;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [signups, setSignups] = useState<WaitlistSignup[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  
  // Blog-related state
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
    featured_image: '',
    published: false,
    tags: '',
    meta_title: '',
    meta_description: '',
    published_at: '',
  });

  // Places search state
  const [placesResults, setPlacesResults] = useState<PlacesSearchResult[]>([]);
  const [placesLoading, setPlacesLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [currentSearch, setCurrentSearch] = useState<GooglePlacesSearchParams | null>(null);
  const [placesFormData, setPlacesFormData] = useState<GooglePlacesSearchParams>({
    textQuery: '',
    regionCode: '',
  });

  // Places management functions
  const searchPlaces = async () => {
    if (!placesFormData.textQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setPlacesLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const token = localStorage.getItem('admin_token');
      
      // Clean up the form data to remove empty values and add maxResultCount
      const searchParams = {
        ...Object.fromEntries(
          Object.entries(placesFormData).filter(([_, value]) => {
            if (value === '' || value === 0 || value === false) return false;
            if (Array.isArray(value) && value.length === 0) return false;
            return true;
          })
        ),
        maxResultCount: 20, // Always request maximum results
      };
      
      const response = await fetch(`${apiUrl}/api/admin/places/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(searchParams),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to search places');
      }

      const results = await response.json() as PlacesSearchResponse;
      
      // Debug logging
      console.log('Frontend received:', {
        placesCount: results.places?.length,
        hasNextPageToken: !!results.nextPageToken,
        nextPageToken: results.nextPageToken?.substring(0, 50) + '...' || 'NULL'
      });
      
      setPlacesResults(results.places || []);
      setNextPageToken(results.nextPageToken || null);
      setCurrentSearch(placesFormData);
      toast.success(`Found ${results.places?.length || 0} places${results.nextPageToken ? ' (more available)' : ''}`);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to search places');
    } finally {
      setPlacesLoading(false);
    }
  };

  const loadMorePlaces = async () => {
    if (!nextPageToken || !currentSearch) {
      toast.error('No more results available');
      return;
    }

    setLoadingMore(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(`${apiUrl}/api/admin/places/load-more`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          textQuery: currentSearch.textQuery,
          regionCode: currentSearch.regionCode,
          pageToken: nextPageToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to load more places');
      }

      const results = await response.json() as PlacesSearchResponse;
      
      // Append new results to existing ones
      setPlacesResults(prev => [...prev, ...(results.places || [])]);
      setNextPageToken(results.nextPageToken || null);
      
      toast.success(`Loaded ${results.places?.length || 0} more places`);
    } catch (error) {
      console.error('Error loading more:', error);
      toast.error(error.message || 'Failed to load more places');
    } finally {
      setLoadingMore(false);
    }
  };

  const downloadPlacesCsv = async () => {
    if (!placesResults || placesResults.length === 0) {
      toast.error('No search results to download');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(`${apiUrl}/api/admin/places/export/csv`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ places: placesResults }),
      });

      if (!response.ok) {
        throw new Error('Failed to download CSV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `places-search-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('CSV downloaded successfully');
    } catch (error) {
      console.error('Error downloading CSV:', error);
      toast.error('Failed to download CSV');
    }
  };

  const resetPlacesForm = () => {
    setPlacesFormData({
      textQuery: '',
      regionCode: '',
    });
    setPlacesResults([]);
    setNextPageToken(null);
    setCurrentSearch(null);
  };

  // Blog management functions
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
      featured_image: '',
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
      featured_image: post.featured_image || '',
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

  // Check if user is already authenticated
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_authenticated') === 'true';
    if (isLoggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async () => {
    if (!adminEmail || !adminPassword) {
      toast.error('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      // Simple admin check - in production, this should be more secure
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const response = await fetch(`${apiUrl}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_token', data.token || 'admin');
      
      setIsAuthenticated(true);
      toast.success('Admin access granted');
      setAdminEmail('');
      setAdminPassword('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Login failed - Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_token');
      setIsAuthenticated(false);
      setSignups([]);
      setSearchTerm('');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchSignups = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(`${apiUrl}/api/admin/waitlist`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch signups');
      }

      const data = await response.json();
      setSignups(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch signups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSignups();
      fetchBlogPosts();
    }
  }, [isAuthenticated]);

  const updateSignup = async (id: string, updates: Partial<WaitlistSignup>) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(`${apiUrl}/api/admin/waitlist/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update signup');
      }

      toast.success('Signup updated successfully');
      fetchSignups(); // Refresh data
      setEditingRow(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update signup');
    }
  };

  const deleteSignup = async (id: string) => {
    if (!confirm('Are you sure you want to delete this signup?')) {
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(`${apiUrl}/api/admin/waitlist/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete signup');
      }

      toast.success('Signup deleted successfully');
      fetchSignups(); // Refresh data
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete signup');
    }
  };

  const filteredSignups = useMemo(() => {
    if (!searchTerm) return signups;
    
    return signups.filter(signup => 
      signup.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (signup.phone && signup.phone.includes(searchTerm)) ||
      (signup.source && signup.source.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (signup.name && signup.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [signups, searchTerm]);

  const filteredBlogPosts = useMemo(() => {
    if (!blogSearchTerm) return blogPosts;
    
    return blogPosts.filter(post => 
      post.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(blogSearchTerm.toLowerCase())))
    );
  }, [blogPosts, blogSearchTerm]);

  const placesColumnDefs: ColDef[] = [
    {
      headerName: 'Business Name',
      field: 'title',
      width: 250,
      sortable: true,
      filter: true,
      cellStyle: { fontWeight: '600', color: '#1f2937' },
      pinned: 'left',
    },
    {
      headerName: 'Address',
      field: 'address',
      width: 300,
      sortable: true,
      filter: true,
      cellStyle: { color: '#374151' },
    },
    {
      headerName: 'Category',
      field: 'categoryName',
      width: 180,
      sortable: true,
      filter: true,
      cellRenderer: (params: ICellRendererParams) => (
        params.value ? <Badge variant="outline">{params.value}</Badge> : ''
      ),
    },
    {
      headerName: 'Rating',
      field: 'rating',
      width: 120,
      sortable: true,
      filter: true,
      cellRenderer: (params: ICellRendererParams) => (
        params.value ? (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-medium">{params.value.toFixed(1)}</span>
          </div>
        ) : ''
      ),
    },
    {
      headerName: 'Reviews',
      field: 'reviewsCount',
      width: 100,
      sortable: true,
      filter: true,
      cellStyle: { color: '#6b7280', textAlign: 'center' },
    },
    {
      headerName: 'Phone',
      field: 'phone',
      width: 160,
      sortable: true,
      filter: true,
      cellRenderer: (params: ICellRendererParams) => (
        params.value ? (
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4 text-gray-400" />
            <span>{params.value}</span>
          </div>
        ) : ''
      ),
    },
    {
      headerName: 'Website',
      field: 'website',
      width: 200,
      sortable: true,
      filter: true,
      cellRenderer: (params: ICellRendererParams) => (
        params.value ? (
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4 text-blue-500" />
            <a
              href={params.value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate"
            >
              {params.value.replace(/^https?:\/\//, '')}
            </a>
          </div>
        ) : ''
      ),
    },
    {
      headerName: 'Status',
      field: 'businessStatus',
      width: 120,
      sortable: true,
      filter: true,
      cellRenderer: (params: ICellRendererParams) => {
        const status = params.data.permanentlyClosed ? 'Closed' : 
                     params.data.temporarilyClosed ? 'Temp Closed' : 
                     params.value || 'Open';
        const variant = status === 'Closed' ? 'destructive' : 
                       status === 'Temp Closed' ? 'secondary' : 'default';
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      headerName: 'Location',
      field: 'location',
      width: 120,
      cellRenderer: (params: ICellRendererParams) => (
        params.value ? (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-xs text-gray-600">
              {params.value.lat.toFixed(4)}, {params.value.lng.toFixed(4)}
            </span>
          </div>
        ) : ''
      ),
    },
  ];

  const columnDefs: ColDef[] = [
    {
      headerName: 'ID',
      field: '_id',
      width: 200,
      sortable: true,
      filter: true,
      cellStyle: { fontWeight: '600', color: '#6b7280', fontSize: '0.75rem' },
      valueFormatter: (params) => params.value ? params.value.substring(0, 8) + '...' : '',
    },
    {
      headerName: 'Name',
      field: 'name',
      width: 280,
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: 'agTextCellEditor',
      cellStyle: { color: '#1f2937', fontWeight: '500' },
    },
    {
      headerName: 'Email',
      field: 'email',
      width: 280,
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: 'agTextCellEditor',
      cellStyle: { color: '#1f2937', fontWeight: '500' },
    },
    {
      headerName: 'Phone',
      field: 'phone',
      width: 160,
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: 'agTextCellEditor',
      cellStyle: { color: '#374151' },
    },
    {
      headerName: 'Company',
      field: 'company',
      width: 150,
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: 'agTextCellEditor',
      cellStyle: { color: '#374151' },
    },
    {
      headerName: 'Message',
      field: 'message',
      width: 200,
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: 'agTextAreaCellEditor',
      cellStyle: { color: '#374151' },
    },
    {
      headerName: 'Source',
      field: 'source',
      width: 180,
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: 'agTextCellEditor',
      cellRenderer: (params: ICellRendererParams) => (
        <Badge variant="secondary" className="text-xs">
          {params.value || 'N/A'}
        </Badge>
      ),
    },
    {
      headerName: 'Contacted',
      field: 'is_contacted',
      width: 120,
      sortable: true,
      filter: true,
      cellRenderer: (params: ICellRendererParams) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={params.value}
            onCheckedChange={(checked) => {
              updateSignup(params.data._id, { is_contacted: checked as boolean });
            }}
          />
        </div>
      ),
    },
    {
      headerName: 'Created At',
      field: 'createdAt',
      width: 200,
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
      cellStyle: { color: '#6b7280', fontSize: '0.875rem' },
    },
    {
      headerName: 'Actions',
      width: 140,
      cellRenderer: (params: ICellRendererParams) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-3 text-xs"
            onClick={() => {
              if (editingRow === params.data._id) {
                setEditingRow(null);
              } else {
                setEditingRow(params.data._id);
              }
            }}
          >
            {editingRow === params.data._id ? 'Save' : 'Edit'}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="h-8 px-3 text-xs"
            onClick={() => deleteSignup(params.data._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    headerClass: 'ag-header-cell-custom',
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const onCellValueChanged = (params: any) => {
    const { data, field, newValue } = params;
    updateSignup(data._id, { [field]: newValue });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="Enter admin email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} disabled={loading} className="w-full">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Contact your administrator for login credentials
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage waitlist signups and blog posts</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="waitlist" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="waitlist">
              Waitlist ({filteredSignups.length})
            </TabsTrigger>
            <TabsTrigger value="blog">
              Blog Posts ({filteredBlogPosts.length})
            </TabsTrigger>
            <TabsTrigger value="places">
              Places Search ({placesResults.length})
            </TabsTrigger>
          </TabsList>

          {/* Waitlist Tab */}
          <TabsContent value="waitlist" className="space-y-6">
            {/* Search and Controls */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by email, phone, or source..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button onClick={fetchSignups} disabled={loading}>
                    {loading ? 'Loading...' : 'Refresh'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AG Grid */}
            <Card>
              <CardContent className="p-6">
                <div 
                  className="ag-theme-quartz w-full h-[800px]"
                  style={{ height: '800px' }}
                >
                  <AgGridReact
                    rowData={filteredSignups}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={20}
                    paginationPageSizeSelector={[10, 20, 50, 100]}
                    onGridReady={onGridReady}
                    onCellValueChanged={onCellValueChanged}
                    rowSelection="single"
                    animateRows={true}
                    suppressRowClickSelection={true}
                    rowHeight={60}
                    headerHeight={50}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
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
                          <div className="col-span-3">
                            <RichTextEditor
                              value={blogFormData.content}
                              onChange={(value) => setBlogFormData({...blogFormData, content: value})}
                              placeholder="Write your blog post content here..."
                              className="w-full"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="featured_image" className="text-right">
                            Featured Image URL
                          </Label>
                          <Input
                            id="featured_image"
                            value={blogFormData.featured_image}
                            onChange={(e) => setBlogFormData({...blogFormData, featured_image: e.target.value})}
                            className="col-span-3"
                          />
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
          </TabsContent>

          {/* Places Search Tab */}
          <TabsContent value="places" className="space-y-6">
            {/* Places Search Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Google Places Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="places-query">Search Query *</Label>
                    <Input
                      id="places-query"
                      placeholder="e.g., restaurants in New York"
                      value={placesFormData.textQuery}
                      onChange={(e) => setPlacesFormData({...placesFormData, textQuery: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="places-region">Region Code</Label>
                    <Input
                      id="places-region"
                      placeholder="e.g., US, CA, GB"
                      value={placesFormData.regionCode}
                      onChange={(e) => setPlacesFormData({...placesFormData, regionCode: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={searchPlaces} 
                    disabled={placesLoading || !placesFormData.textQuery.trim()}
                    className="flex items-center gap-2"
                  >
                    {placesLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    {placesLoading ? 'Searching...' : 'Search Places'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetPlacesForm}
                    disabled={placesLoading}
                  >
                    Reset
                  </Button>
                  {placesResults.length > 0 && (
                    <Button 
                      variant="secondary" 
                      onClick={downloadPlacesCsv}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download CSV
                    </Button>
                  )}
                  {nextPageToken && (
                    <Button 
                      variant="outline" 
                      onClick={loadMorePlaces}
                      disabled={loadingMore}
                      className="flex items-center gap-2"
                    >
                      {loadingMore ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      {loadingMore ? 'Loading...' : 'Load More'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results Grid */}
            {placesResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      Search Results ({placesResults.length} loaded{nextPageToken ? ', more available' : ''})
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={downloadPlacesCsv}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div 
                    className="ag-theme-quartz w-full h-[800px]"
                    style={{ height: '800px' }}
                  >
                    <AgGridReact
                      rowData={placesResults}
                      columnDefs={placesColumnDefs}
                      defaultColDef={defaultColDef}
                      rowSelection="multiple"
                      animateRows={true}
                      suppressRowClickSelection={false}
                      rowHeight={60}
                      headerHeight={50}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Load More at Bottom */}
            {nextPageToken && placesResults.length > 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <Button 
                    onClick={loadMorePlaces}
                    disabled={loadingMore}
                    className="flex items-center gap-2 mx-auto"
                    size="lg"
                  >
                    {loadingMore ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    {loadingMore ? 'Loading More Results...' : `Load More Results (${placesResults.length} loaded)`}
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Google Places API supports up to 60 total results (3 pages of 20 each)
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {!placesLoading && placesResults.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Search Google Places
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Enter a search query above to find businesses and locations using the official Google Places API.
                  </p>
                  <p className="text-sm text-gray-500">
                    Results will be displayed in a table format and can be exported as CSV.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
