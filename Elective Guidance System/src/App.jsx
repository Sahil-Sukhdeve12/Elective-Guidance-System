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
import Category from './components/category';
import Domain from './components/domain';
import Admin from './components/Admin';
import Subject from './components/subject';
import { UserProvider } from './contexts/userContext/UserContext'; // Ensure you import UserProvider
import { AuthProvider } from './contexts/authContexts/index'; // Ensure you import AuthProvider

const Layout = ({ isAdmin, setIsAdmin }) => {
  const location = useLocation();
  const showHeader = !['/', '/signup', '/forgotPassword'].includes(location.pathname);

  return (
    <>
      {showHeader && <Header isAdmin={isAdmin} />}
      <Routes>
        <Route path="/" element={<Login setIsAdmin={setIsAdmin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile userId="someUserId" />} />
        <Route path="/category" element={<Category />} />
        <Route path="/domain/:categoryId" element={<Domain />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Error />} />
        <Route path="/electives/:trackId" element={<Subject />} />
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

  // For submission form
  const handleFormSubmit = async (userInfo) => {
    try {
      // Assuming db is Firestore instance (make sure Firestore is initialized correctly)
      await db.collection('users').add(userInfo); 
      alert('Information saved successfully!');
    } catch (error) {
      console.error('Error saving information: ', error);
    }
  };

  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Layout isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
          <UserForm onSubmit={handleFormSubmit} />
        </Router>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
