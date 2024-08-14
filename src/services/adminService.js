import axios from 'axios';
import BASE_URL from '../config';

const apiClient = axios.create({
  baseURL: BASE_URL,
});


const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Admin Login API
export const adminLogin = async (credentials) => {
  try {
    const response = await apiClient.post('/api/admin/login', credentials);
    
    
    const token = response.data.token;

    
    if (token) {
      localStorage.setItem('token', token);
    }

    return response.data; 
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { error: 'An error occurred during login. Please try again.' };
  }
};

// Create Event
export const createEvent = async (eventData) => {
  try {
    const token = getAuthToken(); 
    const response = await apiClient.post('/api/events', eventData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { error: 'An error occurred while creating the event. Please try again.' };
  }
};

// Fetch Event Managers
export const fetchEventManagers = async () => {
  try {
    const token = getAuthToken();
    const response = await apiClient.get('/api/events/event-managers', {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;  
  } catch (error) {
    console.error('Error fetching event managers:', error); 
    if (error.response && error.response.data) {
      return { error: error.response.data.message || 'An error occurred while fetching event managers' };
    }
    return { error: 'An error occurred while fetching event managers. Please try again.' };
  }
};

// Fetch participants
export const fetchParticipants = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await apiClient.get('/api/events/participants', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching participants:', error); 
    if (error.response && error.response.data) {
      return {
        error: error.response.data.message || 'An error occurred while fetching participants',
      };
    }
    return {
      error: 'An error occurred while fetching participants. Please try again.',
    };
  }
};


// Fetch Upcoming Events
export const fetchUpcomingEvents = async () => {
  try {
    const token = getAuthToken(); 
    const response = await apiClient.get('/api/events/upcoming', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    if (error.response && error.response.data) {
      return {
        error: error.response.data.message || 'An error occurred while fetching upcoming events',
      };
    }
    return {
      error: 'An error occurred while fetching upcoming events. Please try again.',
    };
  }
};




// Create a New Task
export const createTask = async (taskData) => {
  try {
    const token = getAuthToken();
    const response = await apiClient.post('/api/tasks', taskData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { error: 'An error occurred while creating the task. Please try again.' };
  }
};

//Get single event
export const getEventById = async (id) => {
  try {
    const token = getAuthToken(); 
    const response = await apiClient.get(`/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    if (error.response && error.response.data) {
      return {
        error: error.response.data.message || 'An error occurred while fetching event details',
      };
    }
    return {
      error: 'An error occurred while fetching event details. Please try again.',
    };
  }
};

// Fetch All Events
export const fetchAllEvents = async (query = '') => {
  try {
    const token = getAuthToken(); 
    const response = await apiClient.get(`/api/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (query) {
      // Filter events based on the search query
      const filteredEvents = response.data.filter(event =>
        event.name.toLowerCase().includes(query.toLowerCase())
      );
      return filteredEvents;
    }
    return response.data; 
  } catch (error) {
    console.error('Error fetching events:', error);
    if (error.response && error.response.data) {
      return { error: error.response.data.message || 'An error occurred while fetching events' };
    }
    return { error: 'An error occurred while fetching events. Please try again.' };
  }
};



// Update Event
export const updateEvent = async (eventId, eventData) => {
  try {
    const token = getAuthToken(); 
    const response = await apiClient.put(`/api/events/${eventId}`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    if (error.response && error.response.data) {
      return { error: error.response.data.message || 'An error occurred while updating the event' };
    }
    return { error: 'An error occurred while updating the event. Please try again.' };
  }
};

//delete event
export const deleteEvent = async (id) => {
  try {
    const token = getAuthToken(); 
    const response = await apiClient.delete(`/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return { error: error.response.data.message || 'Failed to delete event' };
    }
    return { error: 'An error occurred while deleting the event. Please try again.' };
  }
};


// API to fetch total events count
export const fetchTotalEventsCount = async () => {
  try {
    const token = getAuthToken();
    const response = await apiClient.get('/api/events/all-events/count', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.count;
  } catch (error) {
    console.error('Error fetching total events count:', error);
    return { error: 'Failed to fetch total events count' };
  }
};

// API to fetch total tasks count
export const fetchTotalTasksCount = async () => {
  try {
    const token = getAuthToken();
    const response = await apiClient.get('/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming response.data contains { tasks: [...], count: number }
    return {
      tasks: response.data.tasks,
      count: response.data.count,
    };
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return { error: 'Failed to fetch tasks' };
  }
};



// API to fetch total event managers count
export const fetchTotalEventManagersCount = async () => {
  try {
    const token = getAuthToken();
    const response = await apiClient.get('/api/events/event-managers/count', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.count;
  } catch (error) {
    console.error('Error fetching total event managers count:', error);
    return { error: 'Failed to fetch total event managers count' };
  }
};

// API to fetch total users count
export const fetchTotalUsersCount = async () => {
  try {
    const token = getAuthToken();
    const response = await apiClient.get('/api/users/alluser-count', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.count;
  } catch (error) {
    console.error('Error fetching total users count:', error);
    return { error: 'Failed to fetch total users count' };
  }
};


// Delete Task
export const deleteTask = async (taskId) => {
  try {
    const token = getAuthToken(); 
    const response = await apiClient.delete(`/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return { error: error.response.data.message || 'Failed to delete task' };
    }
    return { error: 'An error occurred while deleting the task. Please try again.' };
  }
};

// Update Task
export const updateTask = async (taskId, taskData) => {
  try {
    const token = getAuthToken();
    const response = await apiClient.put(`/api/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return { error: error.response.data.message || 'Failed to update task' };
    }
    return { error: 'An error occurred while updating the task. Please try again.' };
  }
};


// Fetch a single task by ID
export const fetchTaskById = async (taskId) => {
  try {
    const token = getAuthToken();
    const response = await apiClient.get(`/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
    return { error: 'Failed to fetch task' };
  }
};

