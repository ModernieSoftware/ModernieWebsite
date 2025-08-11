import React from 'react';
import { TrendingUp, DollarSign, Car, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import StatCard from '../../components/ui/StatCard';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../utils/format';

const Analytics: React.FC = () => {
  const { vehicles, priceChangeLogs } = useData();

  // Calculate analytics data
  const priceByMake = vehicles.reduce((acc, vehicle) => {
    const make = vehicle.make;
    const price = vehicle.manualPrice || vehicle.systemPrice;
    if (!acc[make]) {
      acc[make] = { make, totalPrice: 0, count: 0, avgPrice: 0 };
    }
    acc[make].totalPrice += price;
    acc[make].count += 1;
    acc[make].avgPrice = acc[make].totalPrice / acc[make].count;
    return acc;
  }, {} as Record<string, any>);

  const makeData = Object.values(priceByMake).map((item: any) => ({
    make: item.make,
    avgPrice: Math.round(item.avgPrice),
    count: item.count
  }));

  // Price vs Engine CC scatter data
  const priceEngineData = vehicles.map(v => ({
    engineCC: v.engineCC,
    price: (v.manualPrice || v.systemPrice) / 1000000, // Convert to millions
    make: v.make
  }));

  // Price vs Year data
  const priceYearData = vehicles.reduce((acc, vehicle) => {
    const year = vehicle.year;
    const price = vehicle.manualPrice || vehicle.systemPrice;
    if (!acc[year]) {
      acc[year] = { year, totalPrice: 0, count: 0, avgPrice: 0 };
    }
    acc[year].totalPrice += price;
    acc[year].count += 1;
    acc[year].avgPrice = acc[year].totalPrice / acc[year].count;
    return acc;
  }, {} as Record<number, any>);

  const yearData = Object.values(priceYearData)
    .map((item: any) => ({
      year: item.year,
      avgPrice: Math.round(item.avgPrice / 1000000), // Convert to millions
      count: item.count
    }))
    .sort((a, b) => a.year - b.year);

  // Fuel type distribution
  const fuelTypeData = vehicles.reduce((acc, vehicle) => {
    const fuel = vehicle.fuelType;
    acc[fuel] = (acc[fuel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const fuelData = Object.entries(fuelTypeData).map(([fuel, count]) => ({
    name: fuel,
    value: count
  }));

  // Monthly price changes
  const monthlyChanges = priceChangeLogs.reduce((acc, log) => {
    const month = new Date(log.changedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const monthlyData = Object.entries(monthlyChanges).map(([month, changes]) => ({
    month,
    changes
  }));

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  // Calculate key metrics
  const totalValue = vehicles.reduce((sum, v) => sum + (v.manualPrice || v.systemPrice), 0);
  const avgPrice = totalValue / vehicles.length;
  const manualOverrides = vehicles.filter(v => v.manualPrice).length;
  const overridePercentage = (manualOverrides / vehicles.length) * 100;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics & Insights</h1>
        <p className="text-slate-600 mt-1">Comprehensive analysis of vehicle pricing data</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Portfolio Value"
          value={formatCurrency(totalValue)}
          icon={DollarSign}
          color="green"
          change="Portfolio valuation"
          changeType="neutral"
        />
        <StatCard
          title="Average Vehicle Price"
          value={formatCurrency(avgPrice)}
          icon={TrendingUp}
          color="blue"
          change="Across all vehicles"
          changeType="neutral"
        />
        <StatCard
          title="Manual Overrides"
          value={`${manualOverrides} (${overridePercentage.toFixed(1)}%)`}
          icon={Car}
          color="orange"
          change="Price adjustments"
          changeType="neutral"
        />
        <StatCard
          title="Price Changes This Month"
          value={monthlyData[monthlyData.length - 1]?.changes || 0}
          icon={Calendar}
          color="purple"
          change="Recent activity"
          changeType="positive"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Price by Make */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Average Price by Make</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={makeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="make" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => [formatCurrency(value as number), 'Avg Price']} />
              <Bar dataKey="avgPrice" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Price vs Year Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Price Trend by Year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `${value}M`} />
              <Tooltip formatter={(value) => [`${value}M LKR`, 'Avg Price']} />
              <Line type="monotone" dataKey="avgPrice" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Fuel Type Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Fuel Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fuelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {fuelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Price vs Engine CC Scatter */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Price vs Engine Capacity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={priceEngineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="engineCC" name="Engine CC" />
              <YAxis dataKey="price" name="Price" tickFormatter={(value) => `${value}M`} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'price' ? `${value}M LKR` : value,
                  name === 'price' ? 'Price' : 'Engine CC'
                ]}
              />
              <Scatter dataKey="price" fill="#2563eb" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Price Changes */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Price Change Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="changes" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h4 className="font-semibold text-slate-900 mb-3">Top Performing Make</h4>
          <div className="space-y-2">
            {makeData
              .sort((a, b) => b.avgPrice - a.avgPrice)
              .slice(0, 3)
              .map((make, index) => (
                <div key={make.make} className="flex justify-between items-center">
                  <span className="text-slate-600">{index + 1}. {make.make}</span>
                  <span className="font-medium">{formatCurrency(make.avgPrice)}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h4 className="font-semibold text-slate-900 mb-3">Most Common Years</h4>
          <div className="space-y-2">
            {yearData
              .sort((a, b) => b.count - a.count)
              .slice(0, 3)
              .map((year, index) => (
                <div key={year.year} className="flex justify-between items-center">
                  <span className="text-slate-600">{index + 1}. {year.year}</span>
                  <span className="font-medium">{year.count} vehicles</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h4 className="font-semibold text-slate-900 mb-3">Price Range Analysis</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Under 3M LKR</span>
              <span className="font-medium">
                {vehicles.filter(v => (v.manualPrice || v.systemPrice) < 3000000).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">3M - 6M LKR</span>
              <span className="font-medium">
                {vehicles.filter(v => {
                  const price = v.manualPrice || v.systemPrice;
                  return price >= 3000000 && price < 6000000;
                }).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Above 6M LKR</span>
              <span className="font-medium">
                {vehicles.filter(v => (v.manualPrice || v.systemPrice) >= 6000000).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;