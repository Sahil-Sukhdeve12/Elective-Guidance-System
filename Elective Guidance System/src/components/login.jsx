import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../firebase/auth'; // Correct import path
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/login.css'; // Import the CSS file for custom styles
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({setIsAdmin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithEmailAndPassword(email, password);
      if (email === 'minorprojectadmin@gmail.com' && password === '12@Admin12') {
        setIsAdmin(true);
        // navigate('/admin');
      } else {
        setIsAdmin(false);
        // navigate('/category');
      }
      navigate('/profile');
       // Redirect to profile page after successful login
    }
    catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="border p-4 shadow-sm rounded bg-light" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Sign In</h2>
        {error && <p className="text-danger">{error}</p>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
        
        <div className="d-flex justify-content-between align-items-center mt-3">
            <p className="mb-0" style={{marginLeft:'80px'}}>Don&apos;t have an account?</p>
            <Link to="/signup" className="btn" style={{marginRight:'10px'}}>Signup</Link>
        </div>
        <div className="d-flex justify-content-end" style={{marginLeft:'80px'}}>
          <Link to="/forgotPassword" className="btn btn-link">Forgot Password?</Link>
        </div>
        
    </form>
    </div>
  );
};

// Define prop types
Login.propTypes = {
  setIsAdmin: PropTypes.func.isRequired,
};
export default Login;