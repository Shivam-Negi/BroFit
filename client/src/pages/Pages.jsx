import { Route, Routes } from 'react-router-dom';
import Login from './Login';

function pages() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default pages;
