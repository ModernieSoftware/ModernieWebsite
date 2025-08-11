import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Edit } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import { useData } from '../contexts/DataContext';
import { Vehicle } from '../types';
import { formatCurrency } from '../utils/format';

const SearchFilter: React.FC = () => {
  const { vehicles } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    make: '',
    fuelType: '',
    transmission: '',
    yearFrom: '',
    yearTo: '',
    priceFrom: '',
    priceTo: '',
    engineFrom: '',
    engineTo: '',
    mileageFrom: '',
    mileageTo: '',
    hasManualPrice: ''
  });

  // Get unique values for dropdowns
  const uniqueMakes = [...new Set(vehicles.map(v => v.make))];
  const uniqueFuelTypes = [...new Set(vehicles.map(v => v.fuelType))];
  const uniqueTransmissions = [...new Set(vehicles.map(v => v.transmission))];

  // Apply filters
  const filteredVehicles = vehicles.filter(vehicle => {
    // Search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        vehicle.make.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.mapModelName?.toLowerCase().includes(searchLower) ||
        vehicle.year.toString().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Other filters
    if (filters.make && vehicle.make !== filters.make) return false;
    if (filters.fuelType && vehicle.fuelType !== filters.fuelType) return false;
    if (filters.transmission && vehicle.transmission !== filters.transmission) return false;
    if (filters.yearFrom && vehicle.year < parseInt(filters.yearFrom)) return false;
    if (filters.yearTo && vehicle.year > parseInt(filters.yearTo)) return false;
    
    const currentPrice = vehicle.manualPrice || vehicle.systemPrice;
    if (filters.priceFrom && currentPrice < parseInt(filters.priceFrom)) return false;
    if (filters.priceTo && currentPrice > parseInt(filters.priceTo)) return false;
    
    if (filters.engineFrom && vehicle.engineCC < parseInt(filters.engineFrom)) return false;
    if (filters.engineTo && vehicle.engineCC > parseInt(filters.engineTo)) return false;
    if (filters.mileageFrom && vehicle.mileage < parseInt(filters.mileageFrom)) return false;
    if (filters.mileageTo && vehicle.mileage > parseInt(filters.mileageTo)) return false;
    
    if (filters.hasManualPrice === 'yes' && !vehicle.manualPrice) return false;
    if (filters.hasManualPrice === 'no' && vehicle.manualPrice) return false;

    return true;
  });

  const clearFilters = () => {
    setFilters({
      make: '',
      fuelType: '',
      transmission: '',
      yearFrom: '',
      yearTo: '',
      priceFrom: '',
      priceTo: '',
      engineFrom: '',
      engineTo: '',
      mileageFrom: '',
      mileageTo: '',
      hasManualPrice: ''
    });
    setSearchTerm('');
  };

  const exportResults = () => {
    const csvContent = [
      ['Make', 'Model', 'Year', 'Transmission', 'Fuel Type', 'Engine CC', 'Mileage', 'System Price', 'Manual Price', 'Mapped Model'],
      ...filteredVehicles.map(v => [
        v.make,
        v.model,
        v.year,
        v.transmission,
        v.fuelType,
        v.engineCC,
        v.mileage,
        v.systemPrice,
        v.manualPrice || '',
        v.mapModelName || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filtered_vehicles.csv';
    a.click();
    window.URL.revokeObjectURL(url);
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
      sortable: true
    },
    {
      key: 'transmission',
      header: 'Transmission'
    },
    {
      key: 'fuelType',
      header: 'Fuel Type'
    },
    {
      key: 'engineCC',
      header: 'Engine (CC)',
      sortable: true,
      render: (vehicle: Vehicle) => vehicle.engineCC.toLocaleString()
    },
    {
      key: 'mileage',
      header: 'Mileage (km)',
      sortable: true,
      render: (vehicle: Vehicle) => vehicle.mileage.toLocaleString()
    },
    {
      key: 'currentPrice',
      header: 'Current Price',
      sortable: true,
      render: (vehicle: Vehicle) => (
        <div className="flex flex-col">
          <span className="font-mono text-sm font-medium">
            {formatCurrency(vehicle.manualPrice || vehicle.systemPrice)}
          </span>
          {vehicle.manualPrice && (
            <span className="text-xs text-orange-600">Manual Override</span>
          )}
        </div>
      )
    },
    {
      key: 'mapModelName',
      header: 'Mapped Model',
      render: (vehicle: Vehicle) => (
        <span className="text-blue-600 font-medium">
          {vehicle.mapModelName || '-'}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (vehicle: Vehicle) => (
        <div className="flex items-center space-x-2">
          <button
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            title="Edit Price"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Search & Filter</h1>
          <p className="text-slate-600 mt-1">Advanced search and filtering for all vehicles</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
          >
            Clear All
          </button>
          <button
            onClick={exportResults}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Results</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by make, model, mapped model name, or year..."
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Advanced Filters</span>
          </h3>
          <p className="text-sm text-slate-600">
            Showing {filteredVehicles.length} of {vehicles.length} vehicles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Basic Filters */}
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Type</label>
            <select 
              value={filters.fuelType}
              onChange={(e) => setFilters(prev => ({ ...prev, fuelType: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Fuel Types</option>
              {uniqueFuelTypes.map(fuel => (
                <option key={fuel} value={fuel}>{fuel}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Transmission</label>
            <select 
              value={filters.transmission}
              onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Transmissions</option>
              {uniqueTransmissions.map(trans => (
                <option key={trans} value={trans}>{trans}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Manual Price Override</label>
            <select 
              value={filters.hasManualPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, hasManualPrice: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Vehicles</option>
              <option value="yes">Has Manual Override</option>
              <option value="no">System Price Only</option>
            </select>
          </div>

          {/* Range Filters */}
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Price From (LKR)</label>
            <input
              type="number"
              value={filters.priceFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, priceFrom: e.target.value }))}
              placeholder="1000000"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Price To (LKR)</label>
            <input
              type="number"
              value={filters.priceTo}
              onChange={(e) => setFilters(prev => ({ ...prev, priceTo: e.target.value }))}
              placeholder="10000000"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Engine From (CC)</label>
            <input
              type="number"
              value={filters.engineFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, engineFrom: e.target.value }))}
              placeholder="1000"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Engine To (CC)</label>
            <input
              type="number"
              value={filters.engineTo}
              onChange={(e) => setFilters(prev => ({ ...prev, engineTo: e.target.value }))}
              placeholder="5000"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mileage From (km)</label>
            <input
              type="number"
              value={filters.mileageFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, mileageFrom: e.target.value }))}
              placeholder="0"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mileage To (km)</label>
            <input
              type="number"
              value={filters.mileageTo}
              onChange={(e) => setFilters(prev => ({ ...prev, mileageTo: e.target.value }))}
              placeholder="200000"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Results Table */}
      <DataTable
        data={filteredVehicles}
        columns={columns}
        searchable={false}
      />
    </div>
  );
};

export default SearchFilter;