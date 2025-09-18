import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

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
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
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

  // Redirect /admin to /admin/wait-list by default
  if (location.pathname === '/admin') {
    return <Navigate to="/admin/wait-list" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage waitlist signups, blog posts, and places</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-full mx-auto px-6">
          <nav className="flex space-x-8">
            <Link
              to="/admin/wait-list"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                location.pathname === '/admin/wait-list'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Wait list
            </Link>
            <Link
              to="/admin/blog-post"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                location.pathname === '/admin/blog-post'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Blog Post
            </Link>
            <Link
              to="/admin/places"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                location.pathname === '/admin/places'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Places (Search)
            </Link>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-full mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;