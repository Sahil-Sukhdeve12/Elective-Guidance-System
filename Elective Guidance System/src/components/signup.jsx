import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc,doc,setDoc} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth functions
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './styling/signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [departmentId, setDepartmentId] = useState(''); // This will store departmentId as a string initially
  const [departmentsList, setDepartmentsList] = useState([]); // List of departments
  const [error, setError] = useState('');
  const [enrollment_no, setEnrollmentNo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert departmentId to a number explicitly before storing it in Firestore
    const formData = {
      name,
      email,
      password,
      department: Number(departmentId), // Convert departmentId to a number
      enrollment_no
    };

    try {
      // Create user in Firebase Authentication
      const auth = getAuth();
      // await createUserWithEmailAndPassword(auth, email, password);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the user data in Firestore, including the department as a number
      // await addDoc(collection(db, 'users',user.uid), formData);

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), formData);

      navigate('/'); // Redirect to the login page after successful sign-up
    } catch (error) {
      setError(error.message); // Display error message if sign-up fails
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/departments');
        console.log(response.data); // Log department data for debugging
        setDepartmentsList(response.data); // Set the departments list from the API response
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

        {/* Name Input */}
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

        {/* Department Dropdown */}
        <div>
          <label>Department</label>
          <select
            className="form-control"
            value={departmentId} // departmentId value here
            onChange={(e) => setDepartmentId(e.target.value)} // Save departmentId
            required
          >
            <option value="" disabled>Select a department</option>
            {departmentsList.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.department_name} {/* Display department name */}
              </option>
            ))}
          </select>
        </div>

        {/* Enrollment Number */}
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

        {/* Email Input */}
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

        {/* Password Input */}
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

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>

        {/* Sign In Link */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <p className="mb-0" style={{ marginLeft: "150px" }}>Have an account?</p>
          <Link to="/" className="btn">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
