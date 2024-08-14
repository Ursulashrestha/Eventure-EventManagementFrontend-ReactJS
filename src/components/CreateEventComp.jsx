import React from 'react';
import Sidebar from '../pages/AdminDash/AdminDashSiderbar';
import CreateEvent from '../pages/AdminFunc/CreateEvent';

const CreateEventComp = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-10 ml-64">
      <CreateEvent />
    </div>
    </div>
  );
};

export default CreateEventComp;
