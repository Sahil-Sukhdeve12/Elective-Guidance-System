import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from '../firebase/firebaseConfig';
import { useAuth } from '../contexts/authContexts/index'; // Assuming the correct path
import '../components/styling/domain.css';

const db = getFirestore(app);

const Domain = () => {
    const { categoryId } = useParams();
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const navigate = useNavigate();
    const { currentUser, loading } = useAuth(); // Using currentUser from AuthContext

    // Check if the user is loading or not
    if (loading) {
        return <div>Loading...</div>;  // Optionally, show a loading spinner or message
    }

    // If there's no user, return a message or redirect them
    if (!currentUser) {
        return <div>You need to be logged in to access this page.</div>;
    }

    // Fetch user's department based on currentUser.email (or any other field you use)
    useEffect(() => {
        const fetchUserDepartment = async () => {
            if (!currentUser.email) {
                console.error("No user email found");
                return;
            }

            try {
                // Query Firestore to find the user document using currentUser.email
                const userQuery = query(
                    collection(db, "users"),
                    where("email", "==", currentUser.email) // Adjust the field name if needed
                );

                const querySnapshot = await getDocs(userQuery);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0]; // Get the first document (assuming email is unique)
                    setUserDepartment(userDoc.data().department); // Assuming 'department' exists in Firestore
                } else {
                    console.error(`No user document found for email: ${currentUser.email}`);
                }
            } catch (error) {
                console.error("Error fetching user department:", error);
            }
        };

        fetchUserDepartment();
    }, [currentUser.email, db]); // Only run this effect when currentUser.email changes

    useEffect(() => {
        if (!userDepartment) return;

        const fetchTracks = async () => {
            try {
                console.log(`Fetching tracks for categoryId: ${categoryId}`);

                const response = await axios.get(`http://localhost:5000/tracks/${categoryId}`);
                const allTracks = response.data;

                console.log('Fetched tracks:', allTracks);

                // Fetch track IDs associated with the user's department
                const departmentResponse = await axios.get(`http://localhost:5000/track_department?department_id=${userDepartment}`);
                console.log('Department Response:', departmentResponse.data);

                // Correctly map Track_id from department response
                const validTrackIds = departmentResponse.data.map(track => track.Track_id);  // Updated to Track_id
                console.log('Valid track IDs for user\'s department:', validTrackIds);

                // Filter tracks to only include those valid for the user's department
                const filteredTracks = allTracks.filter(track => validTrackIds.includes(track.Track_id));
                console.log('Filtered tracks:', filteredTracks);

                setTracks(filteredTracks);
            } catch (error) {
                console.error('Error fetching tracks:', error);
            }
        };

        fetchTracks();
    }, [categoryId, userDepartment]);

    const handleSelect = () => {
        console.log('Navigating to:', `/electives/${selectedTrack}`);
        if (selectedTrack) {
            navigate(`/electives/${selectedTrack}`);
        }
    };    

    return (
        <div className="d-flex justify-content-center align-items-center vh-75">
            <div className="domain-container text-center" style={{ marginTop: '100px' }}>
                <h1 className="domain-title">Select a Track</h1>
                <select onChange={(e) => setSelectedTrack(e.target.value)} value={selectedTrack} className="custom-select mb-3">
                    <option value="">Select a Track</option>
                    {tracks.map((track) => (
                        <option key={track.Track_id} value={track.Track_id}>
                            {track.Track_Name}
                        </option>
                    ))}
                </select> 
                
                <button onClick={handleSelect} disabled={!selectedTrack} className="btn btn-primary">
                    Go to Electives
                </button>
            </div>
        </div>
    );
};

export default Domain;
