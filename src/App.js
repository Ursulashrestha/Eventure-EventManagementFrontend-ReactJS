import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/landing';
import AdminLogin from './pages/AdminFunc/AdminLogin';
import DashboardLayout from './components/AdminDashboard';
import CreateEventComp from './components/CreateEventComp';
import CreateTaskComp from './components/CreateTaskComp';
import EventDetailComp from './components/EventDetailComp';
import EditEvent from './pages/AdminFunc/EditEventDetail';
import AllTasksView from './components/AdminViewTaskComp';
import EditTask from './pages/AdminFunc/EditTask';

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<LandingPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={ <DashboardLayout />}/>
        <Route path="/admin/dashboard/createevent" element={ <CreateEventComp />}/>
        <Route path="/admin/dashboard/createtask" element={ <CreateTaskComp />}/>
        <Route path="/events/:id" element={<EventDetailComp />} />
        <Route path="/events/edit/:id" element={<EditEvent />} />
        <Route path="/alltasks" element={<AllTasksView />} />
        <Route path="/tasks/edit/:taskId" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
