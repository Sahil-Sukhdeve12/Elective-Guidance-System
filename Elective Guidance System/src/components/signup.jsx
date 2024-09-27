import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { doSignUp } from './src/firebase/auth'; // Import the sign-up function
import './signup.css'; // Import the CSS file for custom styles

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doSignUp(email, password, name);
      // Redirect or show success message
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="background-image">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;