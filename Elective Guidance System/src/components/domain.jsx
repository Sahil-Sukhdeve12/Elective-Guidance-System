import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getFirestore, doc, getDoc } from "firebase/firestore"; 
import { app } from '../firebase/firebaseConfig';
import { useUser } from '../contexts/userContext/UserContext'; // Adjust the path as necessary
import '../components/styling/domain.css'; 

const db = getFirestore(app);

const Domain = () => {
    const { categoryId } = useParams();
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const navigate = useNavigate();
    const { enrollmentNo } = useUser(); // Get enrollmentNo from UserContext

    useEffect(() => {
        const fetchUserDepartment = async () => {
            if (!enrollmentNo) return; // Check if enrollmentNo is available

            const userDoc = await getDoc(doc(db, "users", enrollmentNo)); // Use enrollmentNo to fetch the user

            if (userDoc.exists()) {
                setUserDepartment(userDoc.data().department);
            } else {
                console.error("No such document!");
                // Handle the error (e.g., navigate or show a message)
            }
        };

        fetchUserDepartment();
    }, [enrollmentNo]); // Run this effect when enrollmentNo changes

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tracks/${categoryId}`);
                const allTracks = response.data;

                // Fetch track IDs associated with the user's department
                const departmentResponse = await axios.get(`http://localhost:5000/track_department?department_id=${userDepartment}`);
                const validTrackIds = departmentResponse.data.map(track => track.track_id);

                // Filter tracks to only include those valid for the user's department
                const filteredTracks = allTracks.filter(track => validTrackIds.includes(track.Track_id));
                setTracks(filteredTracks);
            } catch (error) {
                console.error('Error fetching tracks:', error);
            }
        };

        if (userDepartment) {
            fetchTracks();
        }
    }, [categoryId, userDepartment]);

    const handleSelect = () => {
        navigate(`/electives/${selectedTrack}`);
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
