import { BrowserRouter as Router } from 'react-router-dom';
import Page from './pages/Pages';
import Navbar from './components/Navbar';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:7000/api/v1/ ';
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Page />
      </Router>
    </>
  );
};

export default App;
