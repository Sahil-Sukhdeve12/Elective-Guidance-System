import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './styling/signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [departmentsList, setDepartmentsList] = useState([]); // New state for departments list
  const [error, setError] = useState('');
  const [enrollment_no, setEnrollmentNo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
      department,
      enrollment_no
    };

    try {
      await addDoc(collection(db, 'users'), formData); // Store data in Firestore
      navigate('/'); // Redirect to login page after successful sign-up
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/departments');
        // Assuming response.data is an array of department objects
        console.log(response.data); // Check the structure
        setDepartmentsList(response.data); // Set the departments list directly
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Department</label>
          <select
            className="form-control"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="" disabled>Select a department</option>
            {departmentsList.map((dept) => (
              <option key={dept.department_id} value={dept.department_name}>
                {dept.department_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Enrollment Number</label>
          <input
            type="text"
            className="form-control"
            value={enrollment_no}
            onChange={(e) => setEnrollmentNo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <p className="mb-0" style={{ marginLeft: "150px" }}>Have an account?</p>
          <Link to="/" className="btn">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
