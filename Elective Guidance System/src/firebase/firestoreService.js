import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from './firebaseConfig'; // Import your Firebase config

const db = getFirestore(app); // Use the app instance here

export const addUserData = async (userData) => {
    try {
        // Define the user data structure
        const userSchema = {
            name: userData.name,
            enrollmentNo: userData.enrollmentNo, // Adjusted key name to camelCase
            sem: userData.sem,
            degree: userData.degree,
            collegeName: userData.collegeName, // Adjusted key name to camelCase
            department: userData.department,
            section: userData.section,
            classRollNo: userData.classRollNo, // Adjusted key name to camelCase
            email: userData.email,
            password: userData.password, // Consider handling password securely
        };

        const docRef = await addDoc(collection(db, "users"), userSchema);
        console.log("User added with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding user: ", e);
    }
};

// Fetch user data using the modular SDK
export const fetchUserData = async () => {
    const snapshot = await getDocs(collection(db, 'users'));
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return users;
};
