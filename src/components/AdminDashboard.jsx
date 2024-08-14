import React from 'react';

import Sidebar from '../pages/AdminDash/AdminDashSiderbar';
import Navbar from '../pages/AdminDash/Navbar';
import Dashboard from '../pages/AdminDash/Dashboard';

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardLayout;
