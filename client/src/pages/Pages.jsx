import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import Attendance from './Attendance';
import Plans from './Plans';
import Login from './Login';

const pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/users" element={<Users />} />
      <Route path="/attendance" element={<Attendance />} />
    </Routes>
  );
};

export default pages;
