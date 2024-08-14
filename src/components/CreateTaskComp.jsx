import React from 'react';
import Sidebar from '../pages/AdminDash/AdminDashSiderbar';
import CreateTask from '../pages/AdminFunc/CreateTask';

const CreateTaskComp = () => {
  return (
    <div className="flex">
     
      <Sidebar />
      
      
      <div className="flex-grow p-10 ml-64">
        <CreateTask />
      </div>
    </div>
  );
};

export default CreateTaskComp;
