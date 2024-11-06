import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/userContext/UserContext'; // Importing useUser from UserContext
import { useAuth } from '../contexts/authContexts/index'; // Importing useAuth from AuthContext
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Profile = () => {

  return (
    <div>
    </div>
  );
};

export default Profile;
