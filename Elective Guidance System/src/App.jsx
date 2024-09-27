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
import Header from './components/header'; // Import the Header component

const Layout = ({ isAdmin, setIsAdmin }) => {
  const location = useLocation();
  const showHeader = location.pathname !== '/' && location.pathname !== '/signup' && 
  location.pathname!=='/forgotPassword';

  return (
    <>
      {showHeader && <Header isAdmin={isAdmin} />}
      <Routes>
        <Route path="/" element={<Login setIsAdmin={setIsAdmin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/domain" element={<Domain />} />
        <Route path="/subject" element={<Subject />} />
        {isAdmin && <Route path="/admin" element={<Admin />} />}
        <Route path="/forgotPassword" element={<ForgotPassword />} />
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

  return (
    <Router>
      <Layout isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
    </Router>
  );
};

export default App;