import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase/firebaseConfig';
import { useUser } from '../contexts/userContext/UserContext';

const Profile = () => {
  const { user } = useUser(); // Access the user context
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user.enrollmentNo) { // Check if the user has an enrollment number
        try {
          const userDocRef = doc(db, 'users', user.enrollmentNo); // Use enrollmentNo as userId
          const userDoc = await getDoc(userDocRef); // Fetch the document

          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user information: ', error);
        }
      }
    };

    fetchUserInfo();
  }, [user.enrollmentNo]); // Depend on enrollmentNo

  return (
    <div>
      <h1>Profile</h1>
      {userInfo ? (
        <div>
          <p>Semester: {userInfo.sem}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

// Remove prop types as we no longer need userId prop
export default Profile;
