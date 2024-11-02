import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getFirestore, doc, getDoc } from "firebase/firestore"; 
import { app } from '../firebase/firebaseConfig'; // Import your Firebase config
import '../components/styling/domain.css'; // Import your CSS file


const db = getFirestore(app); // Use the app instance here

const Domain = () => {
    const { categoryId } = useParams();
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDepartment = async () => {
            // Replace 'userId' with the actual ID of the user
            const userId = 'userId'; 
            const userDoc = await getDoc(doc(db, "users", userId));

            if (userDoc.exists()) {
                setUserDepartment(userDoc.data().department);
            } else {
                console.error("No such document!");
            }
        };

        fetchUserDepartment();
    }, []);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tracks/${categoryId}`);
                const filteredTracks = response.data.filter(track => {
                    // Check if the track is available for the user's department
                    return track.department_id === userDepartment; // Adjust based on your data structure
                });
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
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="domain-container text-center" style={{ marginTop: '-50px' }}>
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
