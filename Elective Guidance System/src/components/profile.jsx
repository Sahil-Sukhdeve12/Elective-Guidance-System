import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContexts/index'; // Importing useAuth from AuthContext
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import axios from 'axios';
import './styling/profile.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [department, setDepartment] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departmentsList, setDepartmentsList] = useState([]);
  const [semester, setSemester] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [degree, setDegree] = useState('');
  const [section, setSection] = useState('');
  const [classRollNo, setClassRollNo] = useState('');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching departments list from the API
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/departments');
        setDepartmentsList(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    // Fetching user data once departments are available and currentUser is set
    const fetchUserData = async () => {
      if (currentUser && departmentsList.length > 0) {
        try {
          const userDoc = doc(db, 'users', currentUser.uid);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();

            // Set values from the user data, ensuring fallback to empty string if undefined
            setName(userData.name || '');
            setEnrollmentNo(userData.enrollment_no || '');
            setDepartmentId(userData.department || '');
            setSemester(userData.semester || '');
            setCollegeName(userData.collegeName || '');
            setDegree(userData.degree || '');
            setSection(userData.section || '');
            setClassRollNo(userData.classRollNo || '');

            // Find the department name using the department ID
            const department = departmentsList.find(dept => dept.department_id === userData.department);
            if (department) {
              setDepartment(department.department_name);
            }
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else if (!currentUser) {
        console.log('No current user!');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, departmentsList]);

  // Show loading state while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form data before submitting for debugging purposes
    console.log('Form data before submitting:', {
      name,
      enrollmentNo,
      departmentId,
      semester,
      collegeName,
      degree,
      section,
      classRollNo,
    });

    // Validate all required fields before submitting
    if (!semester || !collegeName || !degree || !section || !classRollNo) {
      alert("Please fill in all required fields.");
      return; // Prevent submission if any required field is missing
    }

    try {
      const userDoc = doc(db, 'users', currentUser.uid);
      // Update Firestore document with new user data
      await setDoc(userDoc, {
        name,
        enrollment_no: enrollmentNo,
        department: departmentId,
        semester,  // This will only be included if it's a valid value
        college_name: collegeName,
        degree,
        section,
        class_roll_no: classRollNo,
      }, { merge: true });

      // Redirect to category page after data is successfully saved
      navigate('/category');
    } catch (error) {
      console.error('Error updating user data: ', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-form-container">
        <h2>Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="enrollmentNo" className="form-label">Enrollment No</label>
            <input
              type="text"
              id="enrollmentNo"
              className="form-control"
              value={enrollmentNo}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <input
              type="text"
              id="department"
              className="form-control"
              value={department}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="semester" className="form-label">Semester</label>
            <select
              id="semester"
              className="form-control"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            >
              <option value="" disabled>Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="collegeName" className="form-label">College Name</label>
            <select
              id="collegeName"
              className="form-control"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              required
            >
              <option value="" disabled>Select College</option>
              <option value="College A">G H Raisoni College of Engineering and Management Nagpur</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="degree" className="form-label">Degree</label>
            <select
              id="degree"
              className="form-control"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
            >
              <option value="" disabled>Select Degree</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="B.Sc">B.Sc</option>
              <option value="M.Sc">M.Sc</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="section" className="form-label">Section</label>
            <select
              id="section"
              className="form-control"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
            >
              <option value="" disabled>Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="classRollNo" className="form-label">Class Roll No</label>
            <input
              type="text"
              id="classRollNo"
              className="form-control"
              value={classRollNo}
              onChange={(e) => setClassRollNo(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Next</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
