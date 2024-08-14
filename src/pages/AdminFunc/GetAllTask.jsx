import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchTotalTasksCount, deleteTask } from '../../services/adminService';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('latest'); 
  const navigate = useNavigate();

  useEffect(() => {
    const loadTasks = async () => {
      const { tasks } = await fetchTotalTasksCount();
      if (tasks) {
        setTasks(tasks);
        applyFilter(tasks, filter);
      } else {
        console.error('Failed to fetch tasks');
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    applyFilter(tasks, filter);
  }, [filter, tasks]);

  const applyFilter = (tasks, filter) => {
    let sortedTasks = [...tasks];
    if (filter === 'latest') {
      sortedTasks.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
    } else {
      sortedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }
    setFilteredTasks(sortedTasks);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleEditClick = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  const handleDeleteClick = (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(taskId)
          .then((response) => {
            if (!response.error) {
              Swal.fire(
                'Deleted!',
                'Your task has been deleted.',
                'success'
              );
              setTasks(tasks.filter((task) => task._id !== taskId)); // Update the tasks list
            } else {
              Swal.fire(
                'Error!',
                'There was an error deleting the task.',
                'error'
              );
            }
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the task.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div className="ml-64 mt-4 p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">All Tasks</h2>
        <div className="relative">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5H7z"/></svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm hover:bg-blue-100 transition-all duration-300 ease-in-out"
            >
              <div onClick={() => handleTaskClick(task._id)} className="cursor-pointer">
                <h4 className="text-xl font-semibold text-blue-800 mb-2">
                  {task.title || 'No title provided'}
                </h4>
                <p className="text-gray-700 mb-2">
                  {task.description || 'No description provided'}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Due Date:</strong> {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No due date'}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Related Event:</strong> {task.event?.name || 'No event assigned'}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Assignee:</strong> {task.eventManager?.name || 'No assignee'}
                </p>
              </div>
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  onClick={() => handleEditClick(task._id)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(task._id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default AllTasks;
