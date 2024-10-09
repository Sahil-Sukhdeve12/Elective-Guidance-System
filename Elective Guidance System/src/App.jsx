import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Signup from './components/signup';
import Login from './components/login';
import Domain from './components/domain';
import Subject from './components/subject';
import Admin from './components/Admin';
import ForgotPassword from './components/forgotPassword';
import Error from './components/Error';
import Header from './components/header';
import Category from './components/category';
import Profile from './components/profile';

const Layout = ({ isAdmin, setIsAdmin, setTracks }) => {
  const location = useLocation();
  const showHeader = location.pathname !== '/' && location.pathname !== '/signup' && 
    location.pathname !== '/forgotPassword';

  const [selectedTrack, setSelectedTrack] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <>
      {showHeader && <Header isAdmin={isAdmin} />}
      <Routes>
        <Route path="/" element={<Login setIsAdmin={setIsAdmin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/category" 
          element={<Category setSelectedCategory={setSelectedCategory} setTracks={setTracks} />} 
        />
        <Route 
          path="/domain" 
          element={<Domain selectedCategory={selectedCategory} setSelectedTrack={setSelectedTrack} />} 
        />
        <Route path="/subject" element={<Subject selectedTrack={selectedTrack} />} />
        {isAdmin && <Route path="/admin" element={<Admin />} />}
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

// Define prop types for Layout component
Layout.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  setIsAdmin: PropTypes.func.isRequired,
  setTracks: PropTypes.func.isRequired,
};

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [tracks, setTracks] = useState([]); // State for tracks

  return (
    <Router>
      <Layout isAdmin={isAdmin} setIsAdmin={setIsAdmin} setTracks={setTracks} />
    </Router>
  );
};

export default App;
