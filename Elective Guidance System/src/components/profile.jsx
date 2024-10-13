import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../firebase/firebaseConfig';

const Profile = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
          setUserInfo(userDoc.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user information: ', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <div>
      <h1>Profile</h1>
      {userInfo ? (
        <div>
          <p>Domain: {userInfo.domain}</p>
          <p>Semester: {userInfo.semester}</p>
          <p>Subject: {userInfo.subject}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

// Define prop types for Profile component
Profile.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Profile;