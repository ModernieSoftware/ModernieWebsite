import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Car,
  // FileSpreadsheet,
  // GitBranch,
  // Search,
  // BarChart3,
  // Plus,
  // History,
  // Menu,
  X,
  ChevronLeft,
  ChevronRight,
  GitBranch
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMinimized: boolean;
  onMinimize: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, isMinimized, onMinimize }) => {
  const { user } = useAuth();

  const navigationItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/vehicles', icon: Car, label: 'Registered Vehicles' },
    // { to: '/unregistered', icon: FileSpreadsheet, label: 'Unregistered Vehicles' },
    { to: '/mappings', icon: GitBranch, label: 'Model Mapping' },
    // { to: '/search', icon: Search, label: 'Search & Filter' },
    // { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    // { to: '/add-vehicle', icon: Plus, label: 'Add Vehicle' },
    // { to: '/audit-trail', icon: History, label: 'Audit Trail' },
  ];

  const adminOnlyItems = ['Model Mapping', 'Audit Trail'];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-slate-900 text-white z-30 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isMinimized ? 'lg:w-16' : 'lg:w-64'} w-64 lg:static lg:z-auto
      `}>
        {/* Header */}
        <div className={`${isMinimized ? 'p-3' : 'p-6'} border-b border-slate-700 transition-all duration-300`}>
          <div className="flex items-center justify-between">
            <div className={`${isMinimized ? 'hidden' : 'block'}`}>
              <h1 className="text-xl font-bold text-white">VehiclePro</h1>
              <p className="text-sm text-slate-400">Price Management</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onMinimize}
                className="hidden lg:block p-2 hover:bg-slate-800 rounded-lg"
              >
                {isMinimized ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
              <button
                onClick={onToggle}
                className="lg:hidden p-2 hover:bg-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className={`${isMinimized ? 'p-2' : 'p-4'} border-b border-slate-700 transition-all duration-300`}>
          <div className="flex items-center space-x-3">
            <div className={`${isMinimized ? 'w-8 h-8' : 'w-10 h-10'} bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0`}>
              <span className="text-sm font-medium">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className={`${isMinimized ? 'hidden' : 'block'}`}>
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="text-xs text-slate-400">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => {
            if (user?.role !== 'Admin' && adminOnlyItems.includes(item.label)) {
              return null;
            }
            
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => window.innerWidth < 1024 && onToggle()}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200
                  ${isMinimized ? 'justify-center' : ''}
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }
                `}
                title={isMinimized ? item.label : ''}
              >
                <item.icon className="w-5 h-5" />
                <span className={`${isMinimized ? 'hidden' : 'block'}`}>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;