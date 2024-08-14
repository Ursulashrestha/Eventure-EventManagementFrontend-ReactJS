import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2'; 
import { getEventById, updateEvent, fetchEventManagers, fetchParticipants } from '../../services/adminService'; 

const EditEvent = () => {
  const { id } = useParams(); // Get event ID from the URL
  const navigate = useNavigate(); // For navigating after form submission
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [eventResponsible, setEventResponsible] = useState('');
  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState('');
  const [eventManagers, setEventManagers] = useState([]);
  const [allParticipants, setAllParticipants] = useState([]);

  useEffect(() => {
    const loadEventDetails = async () => {
      const data = await getEventById(id); 
      if (data && !data.error) {
        setEventName(data.name);
        setEventDate(new Date(data.date).toISOString().split('T')[0]); 
        setLocation(data.location);
        setDescription(data.description);
        setEventResponsible(data.eventManager.name);
        setParticipants(data.participants.map(p => p.name)); 
      } else {
        setMessage('Failed to load event details');
      }
    };

    const loadEventManagers = async () => {
      const result = await fetchEventManagers();
      if (Array.isArray(result)) {
        setEventManagers(result);
      } else {
        setMessage(result.error || 'Failed to load event managers');
      }
    };

    const loadParticipants = async () => {
      const result = await fetchParticipants();
      if (Array.isArray(result)) {
        const participantOptions = result.map(participant => ({
          value: participant.name,
          label: participant.name,
        }));
        setAllParticipants(participantOptions);
      } else {
        setMessage(result.error || 'Failed to load participants');
      }
    };

    loadEventDetails();
    loadEventManagers();
    loadParticipants();
  }, [id]);

  const handleParticipantsChange = selectedOptions => {
    setParticipants(selectedOptions.map(option => option.value));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      name: eventName,
      date: eventDate,
      location,
      description,
      eventManagerName: eventResponsible,
      participantNames: participants,
    };

    const response = await updateEvent(id, eventData); 

    if (response.error) {
      setMessage(response.error);
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Event updated successfully!',
        showConfirmButton: false,
        timer: 2000,
        iconColor: '#28a745',
        background: '#fff',
        backdrop: `rgba(0,0,123,0.4) left top no-repeat`,
      });

     
      setTimeout(() => {
        navigate('/admin/dashboard'); 
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Edit Event</h2>
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Event Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter event name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Event Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter event location"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Event Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Enter event description"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Event Responsible</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventResponsible}
              onChange={(e) => setEventResponsible(e.target.value)}
              required
            >
              <option value="" disabled>Select Event Manager</option>
              {Array.isArray(eventManagers) && eventManagers.map((manager) => (
                <option key={manager._id} value={manager.name}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Participants</label>
            <Select
              isMulti
              name="participants"
              options={allParticipants}
              className="basic-multi-select"
              classNamePrefix="select"
              value={allParticipants.filter(option => participants.includes(option.value))}
              onChange={handleParticipantsChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Selected Participants</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={participants.join(', ')}
              readOnly
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
