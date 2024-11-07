import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; // Import the db from firebaseConfig
import './styling/subject.css';
import { useAuth } from '../contexts/authContexts'; // Assuming you are using AuthContext for currentUser

const Subject = () => {
    const { trackId } = useParams(); // Extract Track_id from the route params
    const [electives, setElectives] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { currentUser } = useAuth(); // Assuming useAuth provides the current logged-in user

    // Fetch electives data based on trackId
    useEffect(() => {
        const fetchElectives = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/electives?track_id=${trackId}`);
                setElectives(response.data); // Set the electives data
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                setLoading(false); // Set loading to false in case of an error
                console.error('Error fetching electives:', err);
            }
        };

        const fetchTracks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tracks');
                setTracks(response.data);
            } catch (error) {
                console.error('Failed to load tracks', error);
            }
        };

        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/categories`);
                setCategory(response.data);
            } catch (error) {
                console.error('Failed to load tracks', error);
            }
        };
        fetchTracks();
        fetchCategory();
        fetchElectives();
    }, [trackId]);

    // Loading state
    if (loading) {
        return (
            <div className="loading-container">
                <p>Loading electives...</p>
            </div>
        );
    }

    // Back button handler
    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    // Submit handler to push trackId into Firebase under the current user's document
    const handleSubmit = async () => {
        if (!currentUser) {
            console.error("User is not authenticated.");
            return;
        }

        try {
            // Find the track and category that matches the trackId and category_id
            const selectedTrack = tracks.find(track => track.Track_id === Number(trackId)); // Ensure trackId is a number
            const selectedCategory = category.find(cat => cat.category_id === selectedTrack?.category_id);

            if (selectedTrack && selectedCategory) {
                // Normalize the category name to handle capital letters, spaces, and other inconsistencies
                const normalizedCategoryName = selectedCategory.category_name.trim().toLowerCase().replace(/\s+/g, '_');

                // Reference the current user's document using their uid
                const userDocRef = doc(db, 'users', currentUser.uid);

                // Check if the user already has the selected category assigned in their document
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userDocData = userDocSnapshot.data();

                    // Check if the user has already selected this category (normalized)
                    if (userDocData[normalizedCategoryName]) {
                        // If the user already has this category, prevent adding it again
                        console.error(`User has already selected the category: ${selectedCategory.category_name}`);
                        alert(`You have already selected the category: ${selectedCategory.category_name}`);
                        return; // Stop the function execution
                    }
                }

                // If no category is selected or it's a new category, add the trackId to the user's document
                await updateDoc(userDocRef, {
                    [normalizedCategoryName]: selectedTrack.Track_id // Dynamically set the normalized field name
                });

                console.log('Track ID successfully added to current user\'s document!');
            } else {
                console.error('Track or Category not found');
            }
        } catch (error) {
            console.error('Error adding track ID to current user\'s document:', error);
        }

        navigate('/profile'); // Navigate to profile page after submission
    };

    return (
        <div className="subject-container">
            {/* Back Button */}
            <button onClick={handleBack} className="back-button">
                &lt; Back to Select Track
            </button>

            {/* Display message if no electives are available */}
            {electives.length === 0 ? (
                <div className="no-electives-message">
                    <p>No electives are available for this track at the moment.</p>
                    <p>Please check again later or select a different track.</p>
                </div>
            ) : (
                <>
                    {/* Display electives table */}
                    <table className="electives-table">
                        <thead>
                            <tr>
                                <th>Elective Number</th>
                                <th>Elective Name</th>
                                <th>Course Code</th>
                                <th>Credits</th>
                                <th>Semester</th>
                            </tr>
                        </thead>
                        <tbody>
                            {electives.map((elective) => (
                                <tr key={elective.Course_Code}>
                                    <td>{elective.Elective_Number}</td>
                                    <td>{elective.Elective_Name}</td>
                                    <td>{elective.Course_Code}</td>
                                    <td>{elective.Credits}</td>
                                    <td>{elective.Semester}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Submit Button */}
                    <button onClick={handleSubmit} className="submit-button">
                        Submit
                    </button>
                </>
            )}
        </div>
    );
};

export default Subject;
