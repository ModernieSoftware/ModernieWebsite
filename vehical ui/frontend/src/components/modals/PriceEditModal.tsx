import React, { useState } from 'react';
import { X, DollarSign, AlertCircle } from 'lucide-react';
import { Vehicle } from '../../types';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../utils/format';

interface PriceEditModalProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
}

const PriceEditModal: React.FC<PriceEditModalProps> = ({ vehicle, isOpen, onClose }) => {
  const { updateVehiclePrice } = useData();
  const { user } = useAuth();
  const [newPrice, setNewPrice] = useState(vehicle.manualPrice?.toString() || vehicle.systemPrice.toString());
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateVehiclePrice(vehicle.id, parseFloat(newPrice), reason, user.email);
    
    setSaving(false);
    onClose();
  };

  const currentPrice = vehicle.manualPrice || vehicle.systemPrice;
  const priceChange = parseFloat(newPrice) - currentPrice;
  const percentageChange = (priceChange / currentPrice) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Edit Price</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Vehicle Info */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900">
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </h3>
            <div className="text-sm text-slate-600 mt-2 space-y-1">
              <div>Transmission: {vehicle.transmission}</div>
              <div>Fuel: {vehicle.fuelType}</div>
              <div>Engine: {vehicle.engineCC.toLocaleString()} CC</div>
              <div>Mileage: {vehicle.mileage.toLocaleString()} km</div>
            </div>
          </div>

          {/* Price Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-700 font-medium">System Predicted Price:</span>
              <span className="font-mono font-bold text-blue-900">
                {formatCurrency(vehicle.systemPrice)}
              </span>
            </div>
            
            {vehicle.manualPrice && (
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="text-orange-700 font-medium">Current Manual Price:</span>
                <span className="font-mono font-bold text-orange-900">
                  {formatCurrency(vehicle.manualPrice)}
                </span>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="newPrice" className="block text-sm font-medium text-slate-700 mb-2">
                New Price (LKR)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  id="newPrice"
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter new price"
                />
              </div>
              
              {priceChange !== 0 && (
                <div className={`mt-2 p-2 rounded-lg ${
                  priceChange > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>
                      {priceChange > 0 ? 'Increase' : 'Decrease'} of {formatCurrency(Math.abs(priceChange))} 
                      ({percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-2">
                Reason for Change
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Explain why you're changing the price..."
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Update Price'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PriceEditModal;