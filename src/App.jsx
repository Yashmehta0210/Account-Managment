import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Login from './Screens/Auth/Login';
import Registration from './Screens/Auth/Registration';
import Dashboard from './Screens/Dashboard/Dashboard';
import Profile from './Screens/Profile/Profile';
import MainLayout from './Components/MainLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/dashboard" element={<ProtectedRoutes element={<MainLayout><Dashboard /></MainLayout>} />} />
      <Route path="/profile" element={<ProtectedRoutes element={<MainLayout><Profile /></MainLayout>} />} />
    </Routes>
  );
};

export default App;
