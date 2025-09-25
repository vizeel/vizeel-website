import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

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
  package_selection?: string;
  createdAt: string;
  updatedAt: string;
  is_contacted: boolean;
}

const WaitList = () => {
  const [signups, setSignups] = useState<WaitlistSignup[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [editingRow, setEditingRow] = useState<string | null>(null);

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
    fetchSignups();
  }, []);

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
      fetchSignups();
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
      fetchSignups();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete signup');
    }
  };

  const filteredSignups = useMemo(() => {
    if (!searchTerm) return signups;
    
    return signups.filter(signup => {
      const basicMatch = 
        signup.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (signup.phone && signup.phone.includes(searchTerm)) ||
        (signup.source && signup.source.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (signup.name && signup.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Also search in package selection
      if (signup.package_selection) {
        try {
          const packageData = JSON.parse(signup.package_selection);
          const packageMatch = 
            (packageData.agent && packageData.agent.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (packageData.plan && packageData.plan.toLowerCase().includes(searchTerm.toLowerCase()));
          return basicMatch || packageMatch;
        } catch (error) {
          // If package_selection is not valid JSON, just use basic match
          return basicMatch;
        }
      }
      
      return basicMatch;
    });
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
      headerName: 'Package',
      field: 'package_selection',
      width: 400,
      sortable: true,
      filter: true,
      cellRenderer: (params: ICellRendererParams) => {
        if (!params.value) {
          return <span className="text-gray-400 text-xs">No package</span>;
        }
        
        try {
          const packageData = JSON.parse(params.value);
          
          return (
            <div className="space-y-2 p-2">
              {/* Agent and Plan */}
              <div className="border-b border-gray-200 pb-2">
                <div className="text-xs font-semibold text-gray-900 mb-1">
                  {packageData.agent || 'N/A'}
                </div>
                <div className="text-xs text-gray-700">
                  <span className="font-medium">{packageData.plan || 'N/A'}</span> - ${packageData.planPrice || 0}/month
                </div>
              </div>

              {/* Add-ons */}
              {packageData.addOns && packageData.addOns.length > 0 && (
                <div className="border-b border-gray-200 pb-2">
                  <div className="text-xs font-medium text-gray-800 mb-1">Add-ons:</div>
                  <div className="space-y-1">
                    {packageData.addOns.slice(0, 3).map((addon: any, index: number) => (
                      <div key={index} className="text-xs text-gray-600 flex justify-between">
                        <span className="truncate mr-2">
                          {addon.name} {addon.quantity > 1 ? `(${addon.quantity}x)` : ''}
                        </span>
                        <span className="whitespace-nowrap">
                          ${addon.price * addon.quantity}{addon.type === 'Recurring' ? '/mo' : ''}
                        </span>
                      </div>
                    ))}
                    {packageData.addOns.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{packageData.addOns.length - 3} more...
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Totals */}
              {packageData.totals && (
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-xs font-semibold text-green-700 flex justify-between">
                    <span>Monthly Total:</span>
                    <span>${packageData.totals.monthly}</span>
                  </div>
                  {packageData.totals.oneTime > 0 && (
                    <div className="text-xs font-semibold text-orange-600 flex justify-between mt-1">
                      <span>One-time Setup:</span>
                      <span>${packageData.totals.oneTime}</span>
                    </div>
                  )}
                  <div className="text-xs font-bold text-gray-900 flex justify-between mt-1 pt-1 border-t border-gray-300">
                    <span>Total Value:</span>
                    <span>${packageData.totals.monthly + (packageData.totals.oneTime || 0)}</span>
                  </div>
                </div>
              )}
            </div>
          );
        } catch (error) {
          return <span className="text-red-400 text-xs">Invalid package data</span>;
        }
      },
      autoHeight: true,
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

  return (
    <div className="space-y-6">
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
              getRowHeight={(params) => {
                // Increase height for rows with package data
                if (params.data.package_selection) {
                  try {
                    const packageData = JSON.parse(params.data.package_selection);
                    const addOnCount = packageData.addOns?.length || 0;
                    // Base height + extra for add-ons (up to 3 shown) + totals section
                    return 120 + (Math.min(addOnCount, 3) * 20) + 40;
                  } catch (error) {
                    return 80;
                  }
                }
                return 80;
              }}
              headerHeight={50}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitList;