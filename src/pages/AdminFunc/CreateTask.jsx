import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { createTask, fetchUpcomingEvents, fetchEventManagers } from '../../services/adminService';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [event, setEvent] = useState('');
  const [assignee, setAssignee] = useState('');
  const [events, setEvents] = useState([]);
  const [eventManagers, setEventManagers] = useState([]);

  useEffect(() => {
    const loadUpcomingEvents = async () => {
      const result = await fetchUpcomingEvents();
      if (Array.isArray(result)) {
        setEvents(result);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.error || 'Failed to load upcoming events',
        });
      }
    };

    const loadEventManagers = async () => {
      const result = await fetchEventManagers();
      if (Array.isArray(result)) {
        setEventManagers(result);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.error || 'Failed to load event managers',
        });
      }
    };

    loadUpcomingEvents();
    loadEventManagers();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate || !event || !assignee) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Data',
        text: 'Please fill in all fields.',
      });
      return;
    }

    const taskData = {
      title,
      description,
      deadline: dueDate,  
      eventName: event,   
      eventManagerName: assignee,  
    };

    try {
      await createTask(taskData);
      Swal.fire({
        icon: 'success',
        title: 'Task Created',
        text: 'Your task has been created successfully.',
        timer: 2000,
        showConfirmButton: false,
      });

      setTitle('');
      setDescription('');
      setDueDate('');
      setEvent('');
      setAssignee('');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create task.',
      });
    }
  };

  
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Create New Task</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Related Event</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
            >
              <option value="" disabled>Select an Event</option>
              {events.map((event) => (
                <option key={event._id} value={event.name}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Assignee</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            >
              <option value="" disabled>Select an Assignee</option>
              {eventManagers.map((manager) => (
                <option key={manager._id} value={manager.name}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Due Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={today} 
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
