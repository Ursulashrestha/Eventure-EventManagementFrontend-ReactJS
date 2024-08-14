import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  fetchTotalEventsCount, 
  fetchTotalTasksCount, // Update this to fetch both tasks and count
  fetchTotalEventManagersCount, 
  fetchTotalUsersCount,
  fetchUpcomingEvents 
} from '../../services/adminService'; 
import { FaCalendarAlt } from 'react-icons/fa';

const Dashboard = () => {
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalEventManagers, setTotalEventManagers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCounts = async () => {
      const eventsCount = await fetchTotalEventsCount();
      const { tasks, count: tasksCount } = await fetchTotalTasksCount(); // Destructure tasks and count
      const eventManagersCount = await fetchTotalEventManagersCount();
      const usersCount = await fetchTotalUsersCount();
      const upcomingEventsData = await fetchUpcomingEvents();

      setTotalEvents(eventsCount);
      setTotalTasks(tasksCount); // Update this to set the count properly
      setTotalEventManagers(eventManagersCount);
      setTotalUsers(usersCount);
      setUpcomingEvents(upcomingEventsData);
    };

    loadCounts();
  }, []);

  // Function to handle navigation to event details
  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="ml-64 mt-4 p-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div 
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer" 
          onClick={() => navigate('/events')}>
          <h3 className="text-gray-600">Total Events</h3>
          <p className="text-2xl font-bold">{totalEvents}</p>
        </div>
        <div 
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer" 
          onClick={() => navigate('/alltasks')}>
          <h3 className="text-gray-600">Total Tasks</h3>
          <p className="text-2xl font-bold">{totalTasks}</p>
        </div>
        <div 
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer" 
          onClick={() => navigate('/event-managers')}>
          <h3 className="text-gray-600">Event Managers</h3>
          <p className="text-2xl font-bold">{totalEventManagers}</p>
        </div>  
        <div 
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer" 
          onClick={() => navigate('/users')}>
          <h3 className="text-gray-600">Total Users</h3>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
      </div>
      <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
        <h3 className="text-gray-600 text-2xl font-semibold mb-4 flex items-center">
          <FaCalendarAlt className="mr-2 text-blue-500" /> Upcoming Events
        </h3>
        <div className="space-y-4">
          {upcomingEvents.length > 0 ? (
            <ul className="space-y-4">
              {upcomingEvents.map((event) => (
                <li 
                  key={event._id} 
                  className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm cursor-pointer hover:bg-blue-100"  
                  onClick={() => handleEventClick(event._id)}  
                >
                  <h4 className="text-lg font-bold text-blue-800">{event.name}</h4>
                  <p className="text-sm text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming events.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
