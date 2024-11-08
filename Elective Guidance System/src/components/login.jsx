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
      const response = await doSignInWithEmailAndPassword(email, password);
      const { firstLogin, selectedDomain} = response; // Assuming response contains firstLogin flag

      if (email === 'minorprojectadmin@gmail.com' && password === '12@Admin12') {
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } else {
        setIsAdmin(false);
        localStorage.setItem('isAdmin', 'false');
      

        if (firstLogin) {
          navigate('/profile');
        } else {
          navigate(`/subject/${selectedDomain}`);
        }
      }
    } 
    // catch (error) {
    //   setError('Login failed. Please check your email and password.');
    // }
    catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('User not found. Please check your email and password.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Login failed. Please check your email and password.');
      }
    }
  };

  return (
    <div className="login-container d-flex flex-column align-items-center">
      <form className="border p-4 shadow-sm rounded bg-light" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4" style={{textAlign:"center"}}>Sign In</h2>
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
        
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-80">Sign In</button>
        </div>
        
        {/* <div className="d-flex justify-content-between align-items-center mt-3">
            <p className="mb-0" style={{marginLeft:'100px'}}>Don&apos;t have an account?</p>
            <Link to="/signup" className="btn" style={{marginRight:'10px'}}>Signup</Link>
        </div>
        <div className="d-flex justify-content-end" style={{marginLeft:'80px'}}>
          <Link to="/forgotPassword" className="btn btn-link">Forgot Password?</Link>
        </div> */}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <p className="mb-0" style={{marginLeft:'75px'}}>Don&apos;t have an account?</p>
          <Link to="/signup" className="btn btn-link" style={{marginRight:'10px'}}>Signup</Link>
        </div>
        <div className="d-flex justify-content-center mt-2" style={{marginLeft:'100px'}}>
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