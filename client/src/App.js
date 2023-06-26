import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Pages from './pages/Pages';
import Navbar from './components/Navbar';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:7000/api/v1';
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Pages />
    </BrowserRouter>
  );
}

export default App;
