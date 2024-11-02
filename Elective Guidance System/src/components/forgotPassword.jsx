import { useState } from 'react';
import { doPasswordReset } from '../firebase/auth'; // Correct import path
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styling/forgotPassword.css'; // Import the CSS file for custom styles
import './styling/forgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doPasswordReset(email);
      setMessage('Password reset email sent successfully.');
      setError('');
    } catch (error) {
      setError(error.message);
      setMessage('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="border p-4 shadow-sm rounded bg-light" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Forgot Password</h2>
        {message && <p className="text-success">{message}</p>}
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
        <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary">Send Password Reset Email</button>
        </div>

      </form>
    </div>
  );
};

export default ForgotPassword;