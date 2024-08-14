import React from 'react';
import { FaHome, FaCalendarAlt, FaTasks, FaUser, FaSignOutAlt } from 'react-icons/fa';
import Logo from '../../constants/logo';
import { useNavigate } from 'react-router-dom'; 

const Sidebar = () => {
  const navigate = useNavigate(); 

  const handleDashboardClick = (e) => {
    e.preventDefault(); 
    navigate('/admin/dashboard'); 
  };

  const handleEventsClick = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard/createevent'); 
  };

  const handleTaskClick = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard/createtask'); 
  };

  return (
    
    <div className="h-screen w-64 bg-blue-800 text-white fixed">
      <div className="p-4 text-center">
        <Logo className="text-white" />
      </div>
      <nav className="mt-5">
        <a href="#" onClick={handleDashboardClick} className="flex justify-between items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white">
          <div className="flex items-center">
            <FaHome className="mr-3" />
            Home
          </div>
          <span className="text-white text-xl">{'›'}</span>
        </a>
        <a href="#" onClick={handleEventsClick} className="flex justify-between items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-3" />
            Events
          </div>
          <span className="text-white text-xl">{'›'}</span>
        </a>
        <a href="#" onClick={handleTaskClick} className="flex justify-between items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white">
          <div className="flex items-center">
            <FaTasks className="mr-3" />
            Tasks
          </div>
          <span className="text-white text-xl">{'›'}</span>
        </a>
        <a href="#" className="flex justify-between items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white">
          <div className="flex items-center">
            <FaUser className="mr-3" />
            Profile
          </div>
          <span className="text-white text-xl">{'›'}</span>
        </a>
        <a href="#" className="flex justify-between items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white">
          <div className="flex items-center">
            <FaSignOutAlt className="mr-3" />
            Logout
          </div>
          <span className="text-white text-xl">{'›'}</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
