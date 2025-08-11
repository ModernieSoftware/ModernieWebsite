import React from 'react';
import { Vehicle } from '../../types';

interface VehicleDetailsModalProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
}

const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({ vehicle, isOpen, onClose }) => {
  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Vehicle Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            ×
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div><strong>Make:</strong> {vehicle.make}</div>
          <div><strong>Model:</strong> {vehicle.model}</div>
          <div><strong>Transmission:</strong> {vehicle.transmission}</div>
          <div><strong>Fuel Type:</strong> {vehicle.fuel_type}</div>
          <div><strong>Engine CC:</strong> {vehicle.engine_cc}</div>
          <div><strong>Year:</strong> {vehicle.year}</div>
          <div><strong>Price:</strong> {vehicle.vehicle_price?.toLocaleString()}</div>
       
        </div>
        <div className="p-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;
