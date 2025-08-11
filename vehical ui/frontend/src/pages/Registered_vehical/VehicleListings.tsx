import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Edit, Eye, Trash } from 'lucide-react';

import axios from 'axios';
import { Vehicle } from '../../types';
import VehicleDetailsModal from './VehicleDetailsModal';
import PriceEditModal from './PriceEditModal';

interface GroupedVehicle {
  fuel_type: string;
  engine_cc: number;
 
  key: string;
  make: string;
  model: string;
  transmission: string;
  fuelType: string;
  
  vechiclePrice:number | null;
  vehicles: Vehicle[];
}





const VehicleListings: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    make: '',
    fuelType: '',
    transmission: '',
    yearFrom: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

const handleVehicleSave = async (updatedVehicle: Vehicle) => {
  try {
    const response = await axios.put(`http://localhost:8000/vehicles/${updatedVehicle.id}`, {
      make: updatedVehicle.make,
      model: updatedVehicle.model,
      transmission: updatedVehicle.transmission,
      fuel_type: updatedVehicle.fuel_type,
      engine_cc: updatedVehicle.engine_cc,
      year: updatedVehicle.year,
      vehicle_price: updatedVehicle.vehicle_price,
    });

    setVehicles((prev) =>
      prev.map((v) => (v.id === updatedVehicle.id ? response.data : v))
    );
  } catch (err) {
    console.error("Failed to update vehicle:", err);
    alert("Update failed.");
  }
};
    // Show Price Edit Modal
const openPriceModal = (vehicle: Vehicle) => {
  setSelectedVehicle(vehicle);
  setShowPriceModal(true);
};
  // Show Vehicle Details Modal
  const openDetailsModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetailsModal(true);
  }
const deleteDetailsModal = (vehicle: Vehicle) => {
  if (window.confirm(`Are you sure you want to delete the vehicle ${vehicle.make} ${vehicle.model}?`)) {
    axios.delete(`http://localhost:8000/vehicles/${vehicle.id}`)
      .then(() => {
        setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
      })
      .catch((error) => {
        console.error('Error deleting vehicle:', error);
        alert('Failed to delete vehicle.');
      });
  }
}

  // Group vehicles by unique characteristics
 const groupedVehicles = React.useMemo(() => {
  const groups: Record<string, GroupedVehicle> = {};
  
  vehicles.forEach((vehicle) => {
    const key = `${vehicle.make}-${vehicle.model}-${vehicle.transmission}-${vehicle.fuel_type}-${vehicle.engine_cc}`;
    
    if (!groups[key]) {
      groups[key] = {
        key,
        make: vehicle.make,
        model: vehicle.model,
        transmission: vehicle.transmission,
        fuelType: vehicle.fuel_type,
        
        fuel_type: vehicle.fuel_type,
        engine_cc: vehicle.engine_cc,
      
        vechiclePrice: vehicle.vehicle_price ?? null,
        vehicles: [], // 🟡 Initially empty array
      };
    }

    groups[key].vehicles.push(vehicle); // ✅ Push to that group
  });

  return Object.values(groups);
}, [vehicles]);




  // Apply filters
  const filteredGroups = groupedVehicles.filter((group) => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        group.make.toLowerCase().includes(searchLower) ||
        group.model.toLowerCase().includes(searchLower) ||
        group.fuelType.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    if (filters.make && group.make !== filters.make) return false;
    if (filters.fuelType && group.fuelType !== filters.fuelType) return false;
    if (filters.transmission && group.transmission !== filters.transmission) return false;
    if (filters.yearFrom) {
      const hasMatchingYear = group.vehicles.some((v) => v.year >= parseInt(filters.yearFrom));
      if (!hasMatchingYear) return false;
    }

    return true;
  });

  const toggleGroup = (groupKey: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  // Fetch vehicle data on component mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/vehicles');
        if (response.data) {
          setVehicles(response.data);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, []);

  // Expand all groups
  const expandAll = () => {
    setExpandedGroups(new Set(filteredGroups.map((g) => g.key)));
  };

  // Collapse all groups
  const collapseAll = () => {
    setExpandedGroups(new Set());
  };

  // Get unique values for filters
  const uniqueMakes = [...new Set(vehicles.map((v) => v.make))];
  const uniqueFuelTypes = [...new Set(vehicles.map((v) => v.fuel_type))];
  const uniqueTransmissions = [...new Set(vehicles.map((v) => v.transmission))];


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Registered Vehicles</h1>
          <p className="text-slate-600 mt-1">
            {filteredGroups.length} vehicle groups •{' '}
            {filteredGroups.reduce((sum, g) => sum + g.vehicles.length, 0)} total vehicles
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={expandAll}
            className="px-3 py-2 text-sm border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-2 text-sm border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
          >
            Collapse All
          </button>
        </div>
      </div>



      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by make, model, or mapped model name..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Make</label>
              <select
                value={filters.make}
                onChange={(e) => setFilters((prev) => ({ ...prev, make: e.target.value }))}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Makes</option>
                {uniqueMakes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Type</label>
              <select
                value={filters.fuelType}
                onChange={(e) => setFilters((prev) => ({ ...prev, fuelType: e.target.value }))}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Fuel Types</option>
                {uniqueFuelTypes.map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Transmission</label>
              <select
                value={filters.transmission}
                onChange={(e) => setFilters((prev) => ({ ...prev, transmission: e.target.value }))}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Transmissions</option>
                {uniqueTransmissions.map((trans) => (
                  <option key={trans} value={trans}>
                    {trans}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Year From</label>
              <input
                type="number"
                value={filters.yearFrom}
                onChange={(e) => setFilters((prev) => ({ ...prev, yearFrom: e.target.value }))}
                placeholder="2000"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grouped Vehicle Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Vehicle Make
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Vehicle Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Specifications
                </th>
               
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Variants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredGroups.map((group) => (
                <React.Fragment key={group.key}>
                  <tr className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleGroup(group.key)}
                          className="p-1 hover:bg-slate-200 rounded transition-colors"
                        >
                          {expandedGroups.has(group.key) ? (
                            <ChevronDown className="w-4 h-4 text-slate-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-600" />
                          )}
                        </button>
                        <div>
                          <div className="font-medium text-slate-900">
                            {group.make} 
                          </div>
                         
                          <div className="text-sm text-slate-500">
                            {group.vehicles.length} variant{group.vehicles.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </td>
                      <td className="px-6 py-4"> <div className="font-medium text-slate-900">
                          {group.model}
                          </div></td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900">
                        <div>{group.transmission}</div>
                        <div className="text-slate-500">{group.fuel_type} • {group.engine_cc}</div>
                      </div>
                    </td>
                   
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">
                        Years: {Math.min(...group.vehicles.map((v) => v.year))} - {Math.max(...group.vehicles.map((v) => v.year))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleGroup(group.key)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        {expandedGroups.has(group.key) ? 'Hide' : 'Show'} Details
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Vehicle Details */}
                  {expandedGroups.has(group.key) && (
                    <tr>
                      <td colSpan={5} className="px-6 py-0">
                        <div className="bg-slate-50 rounded-lg m-2">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-slate-200">
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Year</th>
                              
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">System Price</th>
                              
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                             {group.vehicles.map((vehicle) => (
                                <tr key={vehicle.id} className="border-b border-slate-100 last:border-b-0 hover:bg-white transition-colors">
                                  <td className="px-4 py-3">
                                    <span className="font-medium text-slate-900">{vehicle.year}</span>
                                  </td>
                                 
                                  <td className="px-4 py-3">
                                    <span className="font-mono text-sm text-slate-900">
                                      {vehicle.vehicle_price ? vehicle.vehicle_price.toLocaleString() : '-'}
                                    </span>
                                  </td>
                                 
                                  <td className="px-4 py-3">
                     <button
  type="button"
  onClick={() => openPriceModal(vehicle)}
  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
  title="Edit Price"
>
  <Edit className="w-4 h-4" />
</button>

                    <button
                      onClick={() => openDetailsModal(vehicle)}
                      className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteDetailsModal(vehicle)}
                      className="p-2 text-red-600 hover:bg-slate-50 rounded-lg"
                      title="View Details"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          
                        </div>
                      </td>
                    </tr>
                    
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Price Edit Modal */}
  {showPriceModal && selectedVehicle && (
  <PriceEditModal
    vehicle={selectedVehicle}
    isOpen={showPriceModal}
    onClose={() => setShowPriceModal(false)}
    onSave={handleVehicleSave}
  />
)}


      {/* Vehicle Details Modal */}
      {showDetailsModal && selectedVehicle && (
        <VehicleDetailsModal
          vehicle={selectedVehicle}
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};


export default VehicleListings;