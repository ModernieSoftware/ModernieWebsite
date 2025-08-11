import React, { useState } from 'react';
import { Plus, Car, Save, X } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';


const AddVehicle: React.FC = () => {
  const { addUnregisteredVehicle, modelMappings } = useData();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    transmission: '',
    fuelType: '',
    engineCC: '',
    mileage: '',
    price: '',
    mapModelName: '',
    isRegistered: false
  });
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const vehicleData = {
      make: formData.make,
      model: formData.model,
      year: formData.year ? parseInt(formData.year) : undefined,
      transmission: formData.transmission || undefined,
      fuelType: formData.fuelType || undefined,
      engineCC: formData.engineCC ? parseInt(formData.engineCC) : undefined,
      mileage: formData.mileage ? parseInt(formData.mileage) : undefined,
      price: formData.price ? parseInt(formData.price) : undefined,
      status: 'pending' as const
    };

    addUnregisteredVehicle(vehicleData);

    setSaving(false);
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      make: '',
      model: '',
      year: '',
      transmission: '',
      fuelType: '',
      engineCC: '',
      mileage: '',
      price: '',
      mapModelName: '',
      isRegistered: false
    });

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Get suggested mappings based on make and model
  const suggestedMappings = modelMappings.filter(mapping => 
    mapping.make.toLowerCase() === formData.make.toLowerCase() &&
    mapping.originalModel.toLowerCase().includes(formData.model.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Add New Vehicle</h1>
        <p className="text-slate-600 mt-1">Add a new vehicle entry to the system</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-green-800 font-medium">Vehicle added successfully!</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Car className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">Vehicle Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="make" className="block text-sm font-medium text-slate-700 mb-2">
                    Make <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="make"
                    name="make"
                    required
                    value={formData.make}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Toyota"
                  />
                </div>

                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-slate-700 mb-2">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    required
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Prius"
                  />
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-slate-700 mb-2">
                    Year of Manufacture
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    min="1990"
                    max="2024"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2020"
                  />
                </div>

                <div>
                  <label htmlFor="transmission" className="block text-sm font-medium text-slate-700 mb-2">
                    Transmission
                  </label>
                  <select
                    id="transmission"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Transmission</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="CVT">CVT</option>
                    <option value="Semi-Automatic">Semi-Automatic</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="fuelType" className="block text-sm font-medium text-slate-700 mb-2">
                    Fuel Type
                  </label>
                  <select
                    id="fuelType"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                    <option value="CNG">CNG</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="engineCC" className="block text-sm font-medium text-slate-700 mb-2">
                    Engine Capacity (CC)
                  </label>
                  <input
                    type="number"
                    id="engineCC"
                    name="engineCC"
                    min="0"
                    value={formData.engineCC}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1800"
                  />
                </div>

                <div>
                  <label htmlFor="mileage" className="block text-sm font-medium text-slate-700 mb-2">
                    Mileage (km)
                  </label>
                  <input
                    type="number"
                    id="mileage"
                    name="mileage"
                    min="0"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="45000"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">
                    Price (LKR)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="4500000"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save Vehicle'}</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData({
                    make: '',
                    model: '',
                    year: '',
                    transmission: '',
                    fuelType: '',
                    engineCC: '',
                    mileage: '',
                    price: '',
                    mapModelName: '',
                    isRegistered: false
                  })}
                  className="flex items-center space-x-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  <X className="w-4 h-4" />
                  <span>Clear Form</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Suggested Mappings */}
          {suggestedMappings.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Suggested Mappings</h3>
              <div className="space-y-3">
                {suggestedMappings.slice(0, 3).map((mapping) => (
                  <div key={mapping.id} className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">{mapping.mapModelName}</p>
                    <p className="text-sm text-blue-700">
                      Confidence: {(mapping.confidence * 100).toFixed(0)}%
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, mapModelName: mapping.mapModelName }))}
                      className="text-sm text-blue-600 hover:text-blue-800 mt-1"
                    >
                      Use this mapping
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Tips */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Tips</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Make and Model are required fields</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Vehicle will be added as "Unregistered" initially</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Admin can review and approve new entries</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Use suggested mappings for consistency</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Additions</h3>
            <div className="space-y-3">
              <div className="text-sm text-slate-600">
                <p className="font-medium">Toyota Prius</p>
                <p className="text-xs">Added 2 hours ago</p>
              </div>
              <div className="text-sm text-slate-600">
                <p className="font-medium">Honda Civic</p>
                <p className="text-xs">Added 5 hours ago</p>
              </div>
              <div className="text-sm text-slate-600">
                <p className="font-medium">BMW 320i</p>
                <p className="text-xs">Added 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;