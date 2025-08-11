import React from 'react';
import { Car, FileSpreadsheet, GitBranch, TrendingUp, DollarSign, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import StatCard from '../../components/ui/StatCard';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../utils/format';

const Dashboard: React.FC = () => {
  const { dashboardStats, vehicles } = useData();

  // Sample data for charts
  // const priceDistribution = [
  //   { range: '0-2M', count: 12 },
  //   { range: '2-4M', count: 25 },
  //   { range: '4-6M', count: 18 },
  //   { range: '6-8M', count: 15 },
  //   { range: '8M+', count: 8 }
  // ];

  // const monthlyChanges = [
  //   { month: 'Jan', changes: 45 },
  //   { month: 'Feb', changes: 52 },
  //   { month: 'Mar', changes: 38 },
  //   { month: 'Apr', changes: 61 },
  //   { month: 'May', changes: 55 },
  //   { month: 'Jun', changes: 67 }
  // ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-600 mt-1">Monitor your vehicle price management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Registered Vehicles"
          value={dashboardStats.totalRegisteredVehicles}
          icon={Car}
          color="blue"
          change="+12 this month"
          changeType="positive"
        />
        <StatCard
          title="Unregistered Entries"
          value={dashboardStats.totalUnregisteredEntries}
          icon={FileSpreadsheet}
          color="orange"
          change="5 pending review"
          changeType="neutral"
        />
        <StatCard
          title="Mapped Models"
          value={dashboardStats.totalMappedModels}
          icon={GitBranch}
          color="purple"
          change="+3 new mappings"
          changeType="positive"
        />
      
      </div>

      {/* Price Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Price Range</h3>
            <DollarSign className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Highest Price:</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(dashboardStats.highestPrice.amount)}
              </span>
            </div>
            <div className="text-xs text-slate-500">{dashboardStats.highestPrice.model}</div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Lowest Price:</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(dashboardStats.lowestPrice.amount)}
              </span>
            </div>
            <div className="text-xs text-slate-500">{dashboardStats.lowestPrice.model}</div>
          </div>
        </div> */}

        {/* <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Most Overridden Models</h3>
            <Users className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            {dashboardStats.mostOverridden.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-slate-600">{item.model}</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {item.count} overrides
                </span>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Charts */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Price Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Price Changes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyChanges}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="changes" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div> */}

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recently Edited Vehicles</h3>
        <div className="space-y-4">
          {dashboardStats.recentlyEdited.map((vehicle) => (
            <div key={vehicle.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <h4 className="font-medium text-slate-900">{vehicle.make} {vehicle.model}</h4>
                <p className="text-sm text-slate-600">
                  Updated by {vehicle.updatedBy} • {new Date(vehicle.lastUpdated).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">
                  {formatCurrency(vehicle.manualPrice || vehicle.systemPrice)}
                </p>
                {vehicle.manualPrice && (
                  <p className="text-sm text-orange-600">Manual Override</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;