import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Signup from './components/signup';
import Login from './components/login';
import ForgotPassword from './components/forgotPassword';
import Error from './components/Error';
import Header from './components/header';
import Profile from './components/profile';

import UserForm from './components/userForm';
import { db } from './firebase/firebaseConfig';
import Category from './components/category'; // Import the Category component
import Domain from './components/domain';


const Layout = ({ isAdmin, setIsAdmin }) => {
  const location = useLocation();
  const showHeader = location.pathname !== '/' && location.pathname !== '/signup' && 
    location.pathname !== '/forgotPassword';

  return (
    <>
      {showHeader && <Header isAdmin={isAdmin} />}
      <Routes>
        <Route path="/" element={<Login setIsAdmin={setIsAdmin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category" element={<Category />} /> 
<<<<<<< HEAD
        <Route path="/domain/:categoryId" element={<Domain />} />
        <Route path="*" element={<Error />} />
=======
        <Route path="*" element={<Error/>} />
>>>>>>> 6c7c37a5874491fc0ec773db0db0c93022cf68eb
      </Routes>
    </>
  );
};

// Define prop types for Layout component
Layout.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  setIsAdmin: PropTypes.func.isRequired,
};

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [tracks,setTracks]=useState('');

  // for submission form
  const handleFormSubmit = async (userInfo) => {
    try {
      await db.collection('users').add(userInfo);
      alert('Information saved successfully!');
    } catch (error) {
      console.error('Error saving information: ', error);
    }
  };

  return (
    <Router>
      <Layout isAdmin={isAdmin} setIsAdmin={setIsAdmin} setTracks={setTracks} 
      tracks={tracks}/>
      <UserForm onSubmit={handleFormSubmit}/>
      <Layout isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
    </Router>
  );
};

export default App;
