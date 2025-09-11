import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
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

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [signups, setSignups] = useState<WaitlistSignup[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [editingRow, setEditingRow] = useState<string | null>(null);

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
            <p className="text-gray-600">Manage waitlist signups</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              {filteredSignups.length} signups
            </Badge>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Search and Controls */}
        <Card className="mb-6">
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
      </div>
    </div>
  );
};

export default Admin;
