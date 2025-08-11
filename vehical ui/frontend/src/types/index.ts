export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Valuator';
}

export interface Vehicle {

  fuel_type: string;
  engine_cc: number;
  vehicle_price: number;
  vehicle_id: string;
  id: string;
  make: string;
  model: string;
  year: number;
  transmission: string;
 
  


}

export interface UnregisteredVehicle {
  id: string;
  make: string;
  model: string;
  year?: number;
  transmission?: string;
  fuelType?: string;
  engineCC?: number;
  mileage?: number;
  price?: number;
  status: 'pending' | 'mapped' | 'rejected';
  createdAt: Date;
}

export interface ModelMap {
  id: number;
  make: string;
  model: string;
  mapModelName: string;
}

export interface PriceChangeLog {
  id: string;
  vehicleId: string;
  oldPrice: number;
  newPrice: number;
  reason: string;
  changedBy: string;
  changedAt: Date;
  vehicleInfo: string;
}

export interface DashboardStats {
  totalRegisteredVehicles: number;
  totalUnregisteredEntries: number;
  totalMappedModels: number;
  totalPriceChanges: number;
  highestPrice: { amount: number; model: string };
  lowestPrice: { amount: number; model: string };
  recentlyEdited: Vehicle[];
  mostOverridden: { model: string; count: number }[];
}