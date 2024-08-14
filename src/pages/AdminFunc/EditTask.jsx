import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTaskById, updateTask, fetchUpcomingEvents, fetchEventManagers } from '../../services/adminService';

const EditTask = () => {
  const { taskId } = useParams(); 
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [event, setEvent] = useState(''); 
  const [assignee, setAssignee] = useState('');
  const [events, setEvents] = useState([]);
  const [eventManagers, setEventManagers] = useState([]);

  useEffect(() => {
    const loadTaskData = async () => {
        const taskData = await fetchTaskById(taskId);
        console.log("Task Data Loaded:", taskData);

        if (taskData) {
            setTitle(taskData.title);
            setDescription(taskData.description);
            setDueDate(taskData.deadline ? new Date(taskData.deadline).toISOString().split('T')[0] : '');

            if (taskData.event && taskData.event._id) {
                setEvent(taskData.event._id); 
                console.log("Event ID set from Task Data:", taskData.event._id); 
            } else {
                console.warn("No event ID found in task data."); 
            }

            if (taskData.eventManager && taskData.eventManager._id) {
                setAssignee(taskData.eventManager._id); 
                console.log("Assignee ID set from Task Data:", taskData.eventManager._id); 
            } else {
                console.warn("No event manager ID found in task data."); 
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load task data.',
            });
        }
    };

    const loadUpcomingEvents = async () => {
        const result = await fetchUpcomingEvents();
        console.log("Events Loaded:", result); 
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
        console.log("Event Managers Loaded:", result); 
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

    loadTaskData();
    loadUpcomingEvents();
    loadEventManagers();
}, [taskId]);


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
      event: event,  
      eventManager: assignee, 
    };

    console.log("Task Data to be Updated:", taskData); 

    try {
      await updateTask(taskId, taskData); 
      Swal.fire({
        icon: 'success',
        title: 'Task Updated',
        text: 'Your task has been updated successfully.',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate('/alltasks'); 
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update task.',
      });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Task</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Related Event</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={event} 
              onChange={(e) => setEvent(e.target.value)}
            >
              <option value="" disabled>Select an Event</option>
              {events.map((ev) => (
                <option key={ev._id} value={ev._id}>
                  {ev.name}
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
                <option key={manager._id} value={manager._id}>
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
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
