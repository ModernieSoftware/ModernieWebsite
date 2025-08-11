import React, { useState } from 'react';
import { History, User, Calendar, Filter, Download } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { formatDate } from 'date-fns';
import { PriceChangeLog } from '../../types';
import { formatCurrency } from '../../utils/format';


const AuditTrail: React.FC = () => {
  const { priceChangeLogs } = useData();
  const [filters, setFilters] = useState({
    user: '',
    dateFrom: '',
    dateTo: '',
    vehicleSearch: ''
  });

  // Get unique users for filter
  const uniqueUsers = [...new Set(priceChangeLogs.map(log => log.changedBy))];

  // Apply filters
  const filteredLogs = priceChangeLogs.filter(log => {
    if (filters.user && log.changedBy !== filters.user) return false;
    if (filters.dateFrom && new Date(log.changedAt) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(log.changedAt) > new Date(filters.dateTo)) return false;
    if (filters.vehicleSearch && !log.vehicleInfo.toLowerCase().includes(filters.vehicleSearch.toLowerCase())) return false;
    return true;
  });

  const exportLogs = () => {
    const csvContent = [
      ['Date', 'User', 'Vehicle', 'Old Price', 'New Price', 'Change Amount', 'Reason'],
      ...filteredLogs.map(log => [
        formatDate(log.changedAt),
        log.changedBy,
        log.vehicleInfo,
        log.oldPrice,
        log.newPrice,
        log.newPrice - log.oldPrice,
        log.reason
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit_trail.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const columns = [
    {
      key: 'changedAt',
      header: 'Date & Time',
      sortable: true,
      render: (log: PriceChangeLog) => (
        <div className="text-sm">
          <div className="font-medium">{new Date(log.changedAt).toLocaleDateString()}</div>
          <div className="text-slate-500">{new Date(log.changedAt).toLocaleTimeString()}</div>
        </div>
      )
    },
    {
      key: 'changedBy',
      header: 'User',
      sortable: true,
      render: (log: PriceChangeLog) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">{log.changedBy}</span>
        </div>
      )
    },
    {
      key: 'vehicleInfo',
      header: 'Vehicle',
      sortable: true,
      render: (log: PriceChangeLog) => (
        <span className="font-medium text-slate-900">{log.vehicleInfo}</span>
      )
    },
    {
      key: 'oldPrice',
      header: 'Old Price',
      sortable: true,
      render: (log: PriceChangeLog) => (
        <span className="font-mono text-sm">{formatCurrency(log.oldPrice)}</span>
      )
    },
    {
      key: 'newPrice',
      header: 'New Price',
      sortable: true,
      render: (log: PriceChangeLog) => (
        <span className="font-mono text-sm">{formatCurrency(log.newPrice)}</span>
      )
    },
    {
      key: 'change',
      header: 'Change',
      sortable: true,
      render: (log: PriceChangeLog) => {
        const change = log.newPrice - log.oldPrice;
        const isIncrease = change > 0;
        return (
          <div className="flex flex-col">
            <span className={`font-mono text-sm font-medium ${
              isIncrease ? 'text-green-600' : 'text-red-600'
            }`}>
              {isIncrease ? '+' : ''}{formatCurrency(change)}
            </span>
            <span className={`text-xs ${
              isIncrease ? 'text-green-600' : 'text-red-600'
            }`}>
              {isIncrease ? '↗' : '↘'} {((Math.abs(change) / log.oldPrice) * 100).toFixed(1)}%
            </span>
          </div>
        );
      }
    },
    {
      key: 'reason',
      header: 'Reason',
      render: (log: PriceChangeLog) => (
        <div className="max-w-xs">
          <p className="text-sm text-slate-600 truncate" title={log.reason}>
            {log.reason || 'No reason provided'}
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit Trail</h1>
          <p className="text-slate-600 mt-1">Track all price changes and system modifications</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportLogs}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Logs</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Changes</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{priceChangeLogs.length}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <History className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Active Users</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{uniqueUsers.length}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">This Month</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {priceChangeLogs.filter(log => {
                  const logDate = new Date(log.changedAt);
                  const now = new Date();
                  return logDate.getMonth() === now.getMonth() && logDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Avg Change</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {priceChangeLogs.length > 0 
                  ? formatCurrency(priceChangeLogs.reduce((sum, log) => sum + Math.abs(log.newPrice - log.oldPrice), 0) / priceChangeLogs.length)
                  : formatCurrency(0)
                }
              </p>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg">
              <History className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-slate-400" />
          <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">User</label>
            <select 
              value={filters.user}
              onChange={(e) => setFilters(prev => ({ ...prev, user: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Users</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Search</label>
            <input
              type="text"
              value={filters.vehicleSearch}
              onChange={(e) => setFilters(prev => ({ ...prev, vehicleSearch: e.target.value }))}
              placeholder="Search vehicle..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing {filteredLogs.length} of {priceChangeLogs.length} log entries
          </p>
          <button
            onClick={() => setFilters({ user: '', dateFrom: '', dateTo: '', vehicleSearch: '' })}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <DataTable
        data={filteredLogs.sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime())}
        columns={columns}
        searchable={false}
      />
    </div>
  );
};

export default AuditTrail;