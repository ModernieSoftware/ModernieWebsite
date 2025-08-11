import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Vehicle } from '../../types';

export interface PriceEditModalProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedVehicle: Vehicle) => Promise<void>;
}

const PriceEditModal: React.FC<PriceEditModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  onSave,
}) => {
  const [newPrice, setNewPrice] = useState<number>(() => vehicle?.vehicle_price ?? 0);

  useEffect(() => {
    if (vehicle) {
      setNewPrice(vehicle.vehicle_price ?? 0);
    }
  }, [vehicle]);

  const handleSave = async () => {
    try {
      const payload = {
        make: vehicle.make,
        model: vehicle.model,
        transmission: vehicle.transmission,
        fuel_type: vehicle.fuel_type,
        engine_cc: vehicle.engine_cc,
        year: vehicle.year,
        vehicle_price: newPrice,
      };

      const response = await axios.put<Vehicle>(
        `http://localhost:8000/vehicles/${vehicle.id}`,
        payload
      );

      await onSave(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating vehicle:', error);
      alert('Failed to update vehicle. Please try again.');
    }
  };

  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Edit Vehicle Price</h2>
          <button onClick={onClose} className="text-2xl text-gray-700 hover:text-black">
            &times;
          </button>
        </div>

        <div className="p-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Vehicle Price (Rs)
          </label>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="p-6 flex justify-end space-x-3 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceEditModal;
