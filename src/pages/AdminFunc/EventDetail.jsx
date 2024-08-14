import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, deleteEvent } from '../../services/adminService'; 
import Swal from 'sweetalert2';

const EventDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const loadEventDetails = async () => {
      const data = await getEventById(id);  
      if (!data.error) {
        setEvent(data);
      } else {
        console.error(data.error);
      }
    };

    loadEventDetails();
  }, [id]);

  if (!event) {
    return <div className="flex justify-center items-center h-screen"><span>Loading...</span></div>;
  }

  const handleEditClick = () => {
    navigate(`/events/edit/${id}`); 
  };

  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      const response = await deleteEvent(id);
      if (!response.error) {
        Swal.fire(
          'Deleted!',
          'The event has been deleted.',
          'success'
        );
        navigate('/admin/dashboard'); 
      } else {
        Swal.fire(
          'Error!',
          response.error,
          'error'
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">{event.name}</h2>
        
        <div className="text-lg text-gray-700 space-y-4">
          <p><strong className="font-semibold">Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong className="font-semibold">Location:</strong> {event.location}</p>
          <p><strong className="font-semibold">Description:</strong> {event.description}</p>
          <p><strong className="font-semibold">Event Manager:</strong> {event.eventManager.name}</p>
          <p><strong className="font-semibold">Participants:</strong> {event.participants.map(p => p.name).join(', ') || 'None'}</p>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button 
            onClick={handleEditClick} 
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Edit Event
          </button>
          <button 
            onClick={handleDeleteClick} 
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
          >
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
