import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import Attendance from './Attendance';
import Plans from './Plans';
import Login from './Login';
import UserProfile from './UserProfile';

const pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/users" element={<Users />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/users/:id" element={<UserProfile />} />
    </Routes>
  );
};

export default pages;
