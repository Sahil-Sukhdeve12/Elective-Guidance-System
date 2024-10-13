import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Signup from './components/signup';
import Login from './components/login';
import ForgotPassword from './components/forgotPassword';
import Error from './components/Error';
import Header from './components/header';
import Profile from './components/profile';
<<<<<<< HEAD
import UserForm from './components/userForm';
import { db } from './firebase/firebaseConfig';
=======
import Category from './components/category'; // Import the Category component
>>>>>>> 3c371f31483efc8ea056f20c425642c10952adbf

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
        <Route path="*" element={<Error />} />
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
<<<<<<< HEAD
      <Layout isAdmin={isAdmin} setIsAdmin={setIsAdmin} setTracks={setTracks} />
      <UserForm onSubmit={handleFormSubmit}/>
=======
      <Layout isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
>>>>>>> 3c371f31483efc8ea056f20c425642c10952adbf
    </Router>
  );
};

export default App;
