import React, { useState } from 'react';
import { Upload, Plus, Download, Filter, X } from 'lucide-react';
import * as XLSX from 'xlsx';
import DataTable from '../../components/ui/DataTable';
import { useData } from '../../contexts/DataContext';
import { UnregisteredVehicle } from '../../types';
import { formatCurrency } from '../../utils/format';

const UnregisteredVehicles: React.FC = () => {
  const { unregisteredVehicles, bulkAddUnregisteredVehicles } = useData();
  const [uploading, setUploading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    make: '',
    status: '',
    yearFrom: '',
    yearTo: '',
    priceFrom: '',
    priceTo: ''
  });

  // Get unique makes for filter dropdown
  const uniqueMakes = [...new Set(unregisteredVehicles.map(v => v.make).filter(Boolean))];

  // Filter data based on current filters
  const filteredData = unregisteredVehicles.filter(vehicle => {
    if (filters.make && vehicle.make !== filters.make) return false;
    if (filters.status && vehicle.status !== filters.status) return false;
    if (filters.yearFrom && vehicle.year && vehicle.year < parseInt(filters.yearFrom)) return false;
    if (filters.yearTo && vehicle.year && vehicle.year > parseInt(filters.yearTo)) return false;
    if (filters.priceFrom && vehicle.price && vehicle.price < parseInt(filters.priceFrom)) return false;
    if (filters.priceTo && vehicle.price && vehicle.price > parseInt(filters.priceTo)) return false;
    return true;
  });

  const clearFilters = () => {
    setFilters({
      make: '',
      status: '',
      yearFrom: '',
      yearTo: '',
      priceFrom: '',
      priceTo: ''
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Transform Excel data to UnregisteredVehicle format
      const vehicles = jsonData.map((row: any) => ({
        make: row.Make || row.make || '',
        model: row.Model || row.model || '',
        year: parseInt(row.Year || row.year) || undefined,
        transmission: row.Transmission || row.transmission || undefined,
        fuelType: row.FuelType || row.fuelType || row['Fuel Type'] || undefined,
        engineCC: parseInt(row.EngineCC || row.engineCC || row['Engine CC']) || undefined,
        mileage: parseInt(row.Mileage || row.mileage) || undefined,
        price: parseInt(row.Price || row.price) || undefined,
        status: 'pending' as const
      }));

      bulkAddUnregisteredVehicles(vehicles);
      
      // Reset the input
      event.target.value = '';
    } catch (error) {
      console.error('Error processing Excel file:', error);
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const template = [
      {
        Make: 'Toyota',
        Model: 'Camry',
        Year: 2020,
        Transmission: 'Automatic',
        'Fuel Type': 'Petrol',
        'Engine CC': 2500,
        Mileage: 45000,
        Price: 4500000
      }
    ];
    
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'unregistered_vehicles_template.xlsx');
  };

  const columns = [
    {
      key: 'make',
      header: 'Make',
      sortable: true
    },
    {
      key: 'model',
      header: 'Model',
      sortable: true
    },
    {
      key: 'year',
      header: 'Year',
      sortable: true,
      render: (vehicle: UnregisteredVehicle) => vehicle.year || '-'
    },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
      render: (vehicle: UnregisteredVehicle) => 
        vehicle.price ? formatCurrency(vehicle.price) : '-'
    },
    {
      key: 'status',
      header: 'Status',
      render: (vehicle: UnregisteredVehicle) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          vehicle.status === 'pending' 
            ? 'bg-yellow-100 text-yellow-800'
            : vehicle.status === 'mapped'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
        </span>
      )
    },
    {
      key: 'createdAt',
      header: 'Added',
      sortable: true,
      render: (vehicle: UnregisteredVehicle) => 
        new Date(vehicle.createdAt).toLocaleDateString()
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Unregistered Vehicles</h1>
          <p className="text-slate-600 mt-1">Manage new vehicle entries and bulk uploads</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
              showFilters 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button
            onClick={downloadTemplate}
            className="flex items-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Template</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Manual</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Advanced Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-slate-600 hover:text-slate-800 flex items-center space-x-1"
            >
              <X className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Make</label>
              <select 
                value={filters.make}
                onChange={(e) => setFilters(prev => ({ ...prev, make: e.target.value }))}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Makes</option>
                {uniqueMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select 
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="mapped">Mapped</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Year From</label>
              <input
                type="number"
                value={filters.yearFrom}
                onChange={(e) => setFilters(prev => ({ ...prev, yearFrom: e.target.value }))}
                placeholder="2000"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Year To</label>
              <input
                type="number"
                value={filters.yearTo}
                onChange={(e) => setFilters(prev => ({ ...prev, yearTo: e.target.value }))}
                placeholder="2024"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price From</label>
              <input
                type="number"
                value={filters.priceFrom}
                onChange={(e) => setFilters(prev => ({ ...prev, priceFrom: e.target.value }))}
                placeholder="1000000"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price To</label>
              <input
                type="number"
                value={filters.priceTo}
                onChange={(e) => setFilters(prev => ({ ...prev, priceTo: e.target.value }))}
                placeholder="10000000"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing {filteredData.length} of {unregisteredVehicles.length} vehicles
            </p>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Bulk Upload</h3>
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 sm:p-8 text-center">
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <div className="space-y-2">
            <h4 className="text-lg font-medium text-slate-900">Upload Excel File</h4>
            <p className="text-slate-600">
              Upload a .xlsx file with vehicle data. Make sure to follow the template format.
            </p>
          </div>
          <div className="mt-6">
            <label className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>{uploading ? 'Processing...' : 'Choose File'}</span>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Supports .xlsx and .xls files up to 10MB
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredData}
        columns={columns}
        searchable
        searchPlaceholder="Search unregistered vehicles..."
        className="overflow-x-auto"
      />
    </div>
  );
};

export default UnregisteredVehicles;