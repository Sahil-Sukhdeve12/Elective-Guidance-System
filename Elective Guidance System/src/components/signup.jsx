import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/signup.css'; // Import the CSS file for custom styles

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState(''); // Add state for department
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
    <div className="background-image">
      <div className="container">
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
            <label htmlFor="department" className="form-label">Department:</label>
            <select
              id="department"
              name="department"
              className="form-control"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="" disabled>Select your department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
            </select>
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
            <p className="mb-0">Have an account?</p>
            <Link to="/category" className="btn">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;