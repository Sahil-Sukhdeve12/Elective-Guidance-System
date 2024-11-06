import { doCreateUserWithEmailAndPassword } from './auth';
import { addUserData } from './firestoreService'; // Import your Firestore function

export const handleUserSignup = async (formData) => {
  const { email, password, ...userDetails } = formData; // Destructure to get user details

  try {
    // Create user in Firebase Auth
    const userCredential = await doCreateUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Store additional user data in Firestore
    await addUserData({
      ...userDetails,
      email: user.email, // Use the email from the created user
    });

    console.log('User signed up and data stored successfully');
  } catch (error) {
    console.error('Error during signup:', error);
    throw error; // Rethrow error to handle it in the UI
  }
};
