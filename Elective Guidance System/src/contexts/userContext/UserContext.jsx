// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../authContexts/index'; // Import the custom hook from your AuthContext
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { currentUser } = useAuth(); // Accessing currentUser from AuthContext
    const [user, setUser] = useState({
        name: '',
        enrollmentNo: '',
        sem: '',
        degree: '',
        collegeName: '',
        department: '',
        section: '',
        classRollNo: '',
        email: '',
        uid: '', // Add uid to the user state
    });

    useEffect(() => {
        if (currentUser) {
            // Store the user id (uid) and fetch data accordingly
            setUser({
                name: currentUser.displayName || '',
                email: currentUser.email || '',
                uid: currentUser.uid || '', // Store the Firebase UID
                enrollmentNo: '',  // We'll fetch this from Firestore
                sem: '', 
                degree: '', 
                collegeName: '', 
                department: '', 
                section: '', 
                classRollNo: '',
            });
        } else {
            setUser({
                name: '',
                email: '',
                uid: '', // Reset on logout
                enrollmentNo: '',
                sem: '',
                degree: '',
                collegeName: '',
                department: '',
                section: '',
                classRollNo: '',
            });
        }
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
