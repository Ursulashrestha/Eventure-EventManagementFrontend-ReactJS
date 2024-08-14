import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllEvents } from '../../services/adminService';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      fetchAllEvents(searchQuery).then((events) => {
        setSuggestions(events);
      });
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="relative flex items-center bg-white shadow-md w-full ml-64 px-4 h-16">
      <div className="relative flex items-center bg-white shadow-md rounded-lg w-full max-w-md">
        <input
          type="text"
          className="w-full px-4 py-2 text-gray-700 rounded-l-md focus:outline-none"
          placeholder="Search your event..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.386 4.386a1 1 0 01-1.414 1.414l-4.386-4.386zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
          </svg>
        </button>
        {searchQuery && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white shadow-lg border rounded-lg z-50">
            {suggestions.map((event) => (
              <div
                key={event._id}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleEventClick(event._id)}
              >
                {event.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
