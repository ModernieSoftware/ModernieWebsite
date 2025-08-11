import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, UnregisteredVehicle, ModelMapping, PriceChangeLog, DashboardStats } from '../types';

interface DataContextType {
  vehicles: Vehicle[];
  unregisteredVehicles: UnregisteredVehicle[];
  modelMappings: ModelMapping[];
  priceChangeLogs: PriceChangeLog[];
  dashboardStats: DashboardStats;
  updateVehiclePrice: (vehicleId: string, newPrice: number, reason: string, userId: string) => void;
  addUnregisteredVehicle: (vehicle: Omit<UnregisteredVehicle, 'id' | 'createdAt'>) => void;
  bulkAddUnregisteredVehicles: (vehicles: Omit<UnregisteredVehicle, 'id' | 'createdAt'>[]) => void;
  addModelMapping: (mapping: Omit<ModelMapping, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateModelMapping: (id: string, mapping: Partial<ModelMapping>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Prius',
    year: 2020,
    transmission: 'CVT',
    fuelType: 'Hybrid',
    engineCC: 1800,
    mileage: 45000,
    systemPrice: 4500000,
    manualPrice: 4600000,
    mapModelName: 'Toyota Prius Gen 4',
    lastUpdated: new Date('2024-12-15'),
    updatedBy: 'admin@system.com'
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Civic',
    year: 2019,
    transmission: 'Manual',
    fuelType: 'Petrol',
    engineCC: 1500,
    mileage: 35000,
    systemPrice: 3800000,
    mapModelName: 'Honda Civic 10th Gen',
    lastUpdated: new Date('2024-12-14')
  },
  {
    id: '3',
    make: 'BMW',
    model: '320i',
    year: 2021,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineCC: 2000,
    mileage: 25000,
    systemPrice: 8500000,
    manualPrice: 8200000,
    mapModelName: 'BMW 3 Series G20',
    lastUpdated: new Date('2024-12-16'),
    updatedBy: 'valuator@system.com'
  }
];

const mockUnregistered: UnregisteredVehicle[] = [
  {
    id: '1',
    make: 'Nissan',
    model: 'Leaf',
    year: 2022,
    transmission: 'Automatic',
    fuelType: 'Electric',
    engineCC: 0,
    mileage: 15000,
    price: 6500000,
    status: 'pending',
    createdAt: new Date('2024-12-10')
  },
  {
    id: '2',
    make: 'Mercedes',
    model: 'C-Class',
    status: 'mapped',
    createdAt: new Date('2024-12-12')
  }
];

const mockMappings: ModelMapping[] = [
  {
    id: '1',
    originalModel: 'Prius',
    mapModelName: 'Toyota Prius Gen 4',
    make: 'Toyota',
    confidence: 0.95,
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: '2',
    originalModel: 'Civic',
    mapModelName: 'Honda Civic 10th Gen',
    make: 'Honda',
    confidence: 0.89,
    createdAt: new Date('2024-12-02'),
    updatedAt: new Date('2024-12-02')
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [unregisteredVehicles, setUnregisteredVehicles] = useState<UnregisteredVehicle[]>(mockUnregistered);
  const [modelMappings, setModelMappings] = useState<ModelMapping[]>(mockMappings);
  const [priceChangeLogs, setPriceChangeLogs] = useState<PriceChangeLog[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalRegisteredVehicles: 0,
    totalUnregisteredEntries: 0,
    totalMappedModels: 0,
    totalPriceChanges: 0,
    highestPrice: { amount: 0, model: '' },
    lowestPrice: { amount: 0, model: '' },
    recentlyEdited: [],
    mostOverridden: []
  });

  useEffect(() => {
    // Calculate dashboard stats
    const stats: DashboardStats = {
      totalRegisteredVehicles: vehicles.length,
      totalUnregisteredEntries: unregisteredVehicles.length,
      totalMappedModels: modelMappings.length,
      totalPriceChanges: priceChangeLogs.length,
      highestPrice: vehicles.reduce((max, v) => 
        (v.manualPrice || v.systemPrice) > max.amount 
          ? { amount: v.manualPrice || v.systemPrice, model: `${v.make} ${v.model}` }
          : max
      , { amount: 0, model: '' }),
      lowestPrice: vehicles.reduce((min, v) => 
        (min.amount === 0 || (v.manualPrice || v.systemPrice) < min.amount)
          ? { amount: v.manualPrice || v.systemPrice, model: `${v.make} ${v.model}` }
          : min
      , { amount: 0, model: '' }),
      recentlyEdited: vehicles
        .filter(v => v.updatedBy)
        .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        .slice(0, 5),
      mostOverridden: vehicles
        .filter(v => v.manualPrice)
        .reduce((acc, v) => {
          const model = `${v.make} ${v.model}`;
          const existing = acc.find(item => item.model === model);
          if (existing) {
            existing.count++;
          } else {
            acc.push({ model, count: 1 });
          }
          return acc;
        }, [] as { model: string; count: number }[])
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    };
    setDashboardStats(stats);
  }, [vehicles, unregisteredVehicles, modelMappings, priceChangeLogs]);

  const updateVehiclePrice = (vehicleId: string, newPrice: number, reason: string, userId: string) => {
    setVehicles(prev => prev.map(vehicle => {
      if (vehicle.id === vehicleId) {
        const oldPrice = vehicle.manualPrice || vehicle.systemPrice;
        
        // Add to change log
        const logEntry: PriceChangeLog = {
          id: Date.now().toString(),
          vehicleId,
          oldPrice,
          newPrice,
          reason,
          changedBy: userId,
          changedAt: new Date(),
          vehicleInfo: `${vehicle.make} ${vehicle.model} (${vehicle.year})`
        };
        setPriceChangeLogs(logs => [...logs, logEntry]);
        
        return {
          ...vehicle,
          manualPrice: newPrice,
          lastUpdated: new Date(),
          updatedBy: userId
        };
      }
      return vehicle;
    }));
  };

  const addUnregisteredVehicle = (vehicle: Omit<UnregisteredVehicle, 'id' | 'createdAt'>) => {
    const newVehicle: UnregisteredVehicle = {
      ...vehicle,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setUnregisteredVehicles(prev => [...prev, newVehicle]);
  };

  const bulkAddUnregisteredVehicles = (vehicles: Omit<UnregisteredVehicle, 'id' | 'createdAt'>[]) => {
    const newVehicles = vehicles.map((vehicle, index) => ({
      ...vehicle,
      id: (Date.now() + index).toString(),
      createdAt: new Date()
    }));
    setUnregisteredVehicles(prev => [...prev, ...newVehicles]);
  };

  const addModelMapping = (mapping: Omit<ModelMapping, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newMapping: ModelMapping = {
      ...mapping,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setModelMappings(prev => [...prev, newMapping]);
  };

  const updateModelMapping = (id: string, updates: Partial<ModelMapping>) => {
    setModelMappings(prev => prev.map(mapping =>
      mapping.id === id
        ? { ...mapping, ...updates, updatedAt: new Date() }
        : mapping
    ));
  };

  return (
    <DataContext.Provider value={{
      vehicles,
      unregisteredVehicles,
      modelMappings,
      priceChangeLogs,
      dashboardStats,
      updateVehiclePrice,
      addUnregisteredVehicle,
      bulkAddUnregisteredVehicles,
      addModelMapping,
      updateModelMapping
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};