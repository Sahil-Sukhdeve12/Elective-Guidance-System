import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'; // Correct import path
import './signup.css'; // Import the CSS file for custom styles
import { Link } from 'react-router-dom';
import Category from './components/category';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      navigate('/'); // Redirect to login page after successful sign-up
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="background-image" style={{ position: 'absolute',
  top: '50%',
  left: '70%',
  transform: 'translate(-50%, -50%)'}}>
        <div className="container mt-3">
          <form className="border p-4 shadow-sm rounded bg-light" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>

            <div className="d-flex justify-content-between align-items-center mt-3">
  <p className="mb-0" style={{ marginLeft: '100px' }}>Have an account?</p>
  <Link to="/Category" className="btn" style={{ marginRight: "40px" }}>Sign in</Link>
</div>
</form>
</div>
</div>
</div>
);
};

export default Signup;