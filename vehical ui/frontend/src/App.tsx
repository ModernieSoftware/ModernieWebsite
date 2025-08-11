import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashbord/Dashboard';
import VehicleListings from './pages/Registered_vehical/VehicleListings';
// import UnregisteredVehicles from './pages/Unregistered/UnregisteredVehicles';

// import SearchFilter from './pages/SearchFilter';
// import Analytics from './pages/Analytics/Analytics';

import Layout from './components/Layout/Layout';
import ModelMapping from './pages/Modelmap/ModelMapping';
// import AddVehicle from './pages/AddVehical/AddVehicle';
// import AuditTrail from './pages/AuditTrails/AuditTrail';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles" element={<VehicleListings />} />
        {/* <Route path="/unregistered" element={<UnregisteredVehicles />} /> */}
        <Route path="/mappings" element={<ModelMapping />} />
        {/* <Route path="/search" element={<SearchFilter />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/audit-trail" element={<AuditTrail />} /> */}
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;