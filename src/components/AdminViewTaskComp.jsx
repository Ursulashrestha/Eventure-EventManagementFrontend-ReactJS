import React from 'react';

import Sidebar from '../pages/AdminDash/AdminDashSiderbar';
// import Navbar from '../pages/AdminDash/Navbar';
import AllTasks from '../pages/AdminFunc/GetAllTask';

const AllTasksView = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        {/* <Navbar /> */}
        <AllTasks />
      </div>
    </div>
  );
};

export default AllTasksView;
