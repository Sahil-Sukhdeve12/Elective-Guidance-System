import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContexts/index'; // Importing useAuth from AuthContext
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Profile = () => {
  const [name, setName] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [degree, setDegree] = useState('');
  const [section, setSection] = useState('');
  const [classRollNo, setClassRollNo] = useState('');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userDoc = doc(db, 'users', currentUser.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setName(userData.name);
          setEnrollmentNo(userData.enrollment_no);
          setDepartment(userData.department);
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDoc = doc(db, 'users', currentUser.uid);
      await setDoc(userDoc, {
        name,
        enrollment_no: enrollmentNo,
        department,
        semester,
        college_name: collegeName,
        degree,
        section,
        class_roll_no: classRollNo,
      }, { merge: true });
      navigate('/category');
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
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
          <input
            type="text"
            id="semester"
            className="form-control"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="collegeName" className="form-label">College Name</label>
          <input
            type="text"
            id="collegeName"
            className="form-control"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="degree" className="form-label">Degree</label>
          <input
            type="text"
            id="degree"
            className="form-control"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="section" className="form-label">Section</label>
          <input
            type="text"
            id="section"
            className="form-control"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          />
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
  );
};

export default Profile;