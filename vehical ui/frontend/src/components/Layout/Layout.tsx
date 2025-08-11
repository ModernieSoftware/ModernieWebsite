import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        isMinimized={sidebarMinimized}
        onMinimize={() => setSidebarMinimized(!sidebarMinimized)}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarMinimized ? 'lg:ml-0' : 'lg:ml-0'}`}>
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;