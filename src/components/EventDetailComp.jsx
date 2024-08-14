import React from 'react';
import Sidebar from '../pages/AdminDash/AdminDashSiderbar';
import EventDetails from '../pages/AdminFunc/EventDetail';

const EventDetailComp = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-10 ml-64">
      <EventDetails />
    </div>
    </div>
  );
};

export default EventDetailComp;
