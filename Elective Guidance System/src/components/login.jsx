import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; // Import the CSS file for custom styles

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <form className="border p-4 shadow-sm rounded bg-light">
          <h2 className="text-center mb-4">Sign In</h2>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" id="email" name="email" className="form-control" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" id="password" name="password" className="form-control" required />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-center flex-grow-1">
              <button type="submit" className="btn btn-primary" style={{width:'120px'}}>Login</button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <p className="mb-0" style={{marginLeft:'85px'}}>Don't have an account?</p>
            <Link to="/signup" className="btn" style={{marginRight:"5px"}}>Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;