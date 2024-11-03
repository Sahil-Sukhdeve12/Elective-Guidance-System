import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig'; // Import the Firestore instance
import { collection, addDoc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './styling/signup.css'; // Import the CSS file for custom styles
// import Login from './login';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState(''); // Change to string for the selected department
  const [departmentsList, setDepartmentsList] = useState([]); // New state for departments list
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
      department,
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
        const departments = response.data[0]; // Get the first array
        console.log(departments); // Check the structure
        setDepartmentsList(departments); // Set the departments list
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);


  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2 style={{textAlign:"center"}}>Sign Up</h2>
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
            <p className="mb-0" style={{marginLeft:"150px"}}>Have an account?</p>
            <Link to="/" className="btn">Sign in</Link>
          </div>
      </form>
    </div>
  );
};

export default Signup;
