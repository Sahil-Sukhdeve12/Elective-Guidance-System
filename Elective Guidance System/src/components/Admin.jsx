import React, { useState, useEffect } from 'react';
import Header from './header';
import './Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
    const [trackId, setTrackId] = useState('');
    const [trackName, setTrackName] = useState('');
    const [tracks, setTracks] = useState([]);
    const [isAddingTrack, setIsAddingTrack] = useState(false); // State to toggle add track section

    // Function to fetch tracks from the database
    const fetchTracks = async () => {
        const response = await fetch('http://localhost:5000/api/data');
        const data = await response.json();
        setTracks(data);
    };

    // Function to handle adding a track
    const addTrack = async () => {
        const response = await fetch('http://localhost:5000/api/tracks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ track_id: parseInt(trackId), track_name: trackName }),
        });

        const result = await response.json();
        alert(result.message); // Alert on successful addition
        fetchTracks(); // Refresh the track list
        setTrackId(''); // Clear input fields
        setTrackName('');
    };

    useEffect(() => {
        fetchTracks(); // Fetch tracks on component mount
    }, []);

    return (
        <div>
            <Header />
            <div className='container' style={{ width: '100%', height: "100%" }}>
                <h1 style={{ textAlign: 'center' }}>Admin Page</h1>
                <div className="split-container">
                    <div className="left-section" style={{ flex: 1 }}>
                        <button 
                            onClick={() => setIsAddingTrack(!isAddingTrack)} 
                            className="btn btn-primary"
                        >
                            {isAddingTrack ? 'Hide Add Track' : 'Add Track'}
                        </button>
                        {isAddingTrack && (
                            <div style={{ marginTop: '10px' }}>
                                <input
                                    type="number"
                                    placeholder="Track ID"
                                    value={trackId}
                                    onChange={(e) => setTrackId(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Track Name"
                                    value={trackName}
                                    onChange={(e) => setTrackName(e.target.value)}
                                />
                                <button onClick={addTrack} className="btn btn-success" style={{ marginLeft: '10px' }}>
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="right-section" style={{ flex: 1 }}>
                        <h2>Tracks List</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Track ID</th>
                                    <th>Track Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tracks.map((track, index) => (
                                    <tr key={`${track.Track_id}-${index}`}>
                                        <td>{track.Track_id}</td>
                                        <td>{track.Track_Name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
