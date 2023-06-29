import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7000/api/v1',
});

// Function to retrieve the token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Set the default headers for each request
api.defaults.headers.common['Authorization'] = getToken();

export default api;
