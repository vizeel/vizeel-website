import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Search, Download, RefreshCw, Plus, MapPin, Star, Globe, Phone } from 'lucide-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([AllCommunityModule]);

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

const Places = () => {
  const [placesResults, setPlacesResults] = useState<PlacesSearchResult[]>([]);
  const [placesLoading, setPlacesLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [currentSearch, setCurrentSearch] = useState<GooglePlacesSearchParams | null>(null);
  const [placesFormData, setPlacesFormData] = useState<GooglePlacesSearchParams>({
    textQuery: '',
    regionCode: '',
  });

  const searchPlaces = async () => {
    if (!placesFormData.textQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setPlacesLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const token = localStorage.getItem('admin_token');
      
      const searchParams = {
        ...Object.fromEntries(
          Object.entries(placesFormData).filter(([_, value]) => {
            if (value === '' || value === 0 || value === false) return false;
            if (Array.isArray(value) && value.length === 0) return false;
            return true;
          })
        ),
        maxResultCount: 20,
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

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    headerClass: 'ag-header-cell-custom',
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default Places;