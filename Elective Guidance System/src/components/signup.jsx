import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './signup.css'; // Import the CSS file for custom styles

const Signup = () => {
  return (
    <div>
      <div className="background-image">
        <div className="container mt-3">
          <form className="border p-4 shadow-sm rounded bg-light">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" id="name" name="name" className="form-control" required />
            </div>
            <div className="mb-2">
              <label htmlFor="semester" className="form-label">Semester:</label>
              <select id="semester" name="semester" className="form-control" required>
                <option value="">Select Semester</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="dept" className="form-label">Department:</label>
              <select id="dept" name="dept" className="form-control" required>
              <option value="">Select Department</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="cse">Computer Science Engineering</option>
                <option value="ai">Data Science</option>
                <option value="ai">CSE(Cyber Security)</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" id="email" name="email" className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" id="password" name="password" className="form-control" required />
            </div>
            <div className="d-flex justify-content-between align-items-center">
            <div className="text-center flex-grow-1" style={{ marginRight: '10px' }}>
              <button type="submit" className="btn btn-primary">Sign up</button>
            </div>
             </div>
            
            <div className="d-flex justify-content-between align-items-center mt-3">
            <p className="mb-0" style={{marginLeft:'120px'}}>Have an account?</p>
            <Link to="/" className="btn" style={{marginRight:"105px"}}>Sign in</Link>
         
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;