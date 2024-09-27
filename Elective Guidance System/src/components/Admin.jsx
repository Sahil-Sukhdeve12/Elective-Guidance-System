import React, { useState, useEffect, useRef } from 'react';
import Header from './header';
import '../components/styling/admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
    const [trackId, setTrackId] = useState('');
    const [trackName, setTrackName] = useState('');
    const [tracks, setTracks] = useState([]);
    const [isAddingTrack, setIsAddingTrack] = useState(false);
    const [isAddingElective, setIsAddingElective] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [electives, setElectives] = useState([]);
    const [electiveName, setElectiveName] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [credits, setCredits] = useState('');
    const [semester, setSemester] = useState('');
    const [showElectives, setShowElectives] = useState(true);
    const [isUpdatingTrack, setIsUpdatingTrack] = useState(false);
    const [isUpdatingElective, setIsUpdatingElective] = useState(false);
    const [currentTrackId, setCurrentTrackId] = useState(null);
    const [currentElectiveName, setCurrentElectiveName] = useState('');
    const [hoveredElective, setHoveredElective] = useState(null);
    
    const electiveRef = useRef(null);

    const fetchTracks = async () => {
        const response = await fetch('http://localhost:5000/api/tracks');
        const data = await response.json();
        setTracks(data);
    };

    const fetchElectives = async (trackId) => {
        const response = await fetch(`http://localhost:5000/api/electives/${trackId}`);
        const data = await response.json();
        setElectives(data);
    };

    const addTrack = async () => {
        await fetch('http://localhost:5000/api/tracks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ track_id: parseInt(trackId), track_name: trackName }),
        });
        fetchTracks();
        resetTrackFields();
    };

    const updateTrack = async () => {
        await fetch(`http://localhost:5000/api/tracks/${currentTrackId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ track_name: trackName }),
        });
        fetchTracks();
        resetTrackFields();
        setIsUpdatingTrack(false);
    };

    const deleteTrack = async (trackId) => {
        await fetch(`http://localhost:5000/api/tracks/${trackId}`, { method: 'DELETE' });
        fetchTracks();
        setSelectedTrack(null);
        setShowElectives(true);
    };

    const addElective = async () => {
        await fetch('http://localhost:5000/api/electives', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Elective_Name: electiveName,
                Course_Code: courseCode,
                Credits: parseInt(credits),
                Semester: semester,
                Track_id: selectedTrack.Track_id
            }),
        });
        fetchElectives(selectedTrack.Track_id);
        resetElectiveFields();
    };

    const updateElective = async () => {
        await fetch(`http://localhost:5000/api/electives/${currentElectiveName}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Course_Code: courseCode, Credits: parseInt(credits), Semester: semester }),
        });
        fetchElectives(selectedTrack.Track_id);
        resetElectiveFields();
        setIsUpdatingElective(false);
    };

    const deleteElective = async (electiveName) => {
        await fetch(`http://localhost:5000/api/electives/${electiveName}`, { method: 'DELETE' });
        fetchElectives(selectedTrack.Track_id);
    };

    const handleTrackClick = (track) => {
        setSelectedTrack(track);
        fetchElectives(track.Track_id);
        setShowElectives(true);
        setTrackId(track.Track_id);
        setTrackName(track.Track_Name);
    };

    const handleElectiveClick = (elective) => {
        setCurrentElectiveName(elective.Elective_Name);
        setCourseCode(elective.Course_Code);
        setCredits(elective.Credits);
        setSemester(elective.Semester);
        setIsUpdatingElective(true);
    };

    const handleOutsideClick = (e) => {
        if (electiveRef.current && !electiveRef.current.contains(e.target)) {
            setShowElectives(false);
            setIsAddingElective(false);
            setIsUpdatingElective(false);
        }
    };

    const resetTrackFields = () => {
        setTrackId('');
        setTrackName('');
        setIsAddingTrack(false);
    };

    const resetElectiveFields = () => {
        setElectiveName('');
        setCourseCode('');
        setCredits('');
        setSemester('');
        setIsAddingElective(false);
        setIsUpdatingElective(false);
    };

    useEffect(() => {
        fetchTracks();
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div>
            <Header />
            <div className='container' style={{ width: '100%', height: "100%" }}>
                <h1 style={{ textAlign: 'center' }}>Admin Page</h1>
                <div className="split-container">
                    <div className="left-section" style={{ flex: 1 }}>
                        <button onClick={() => setIsAddingTrack(!isAddingTrack)} className="btn btn-primary">
                            {isAddingTrack ? 'Hide Add Track' : 'Add Track'}
                        </button>
                        {isAddingTrack && (
                            <div style={{ marginTop: '10px' }}>
                                <input
                                    type="number"
                                    placeholder="Track ID"
                                    value={trackId}
                                    onChange={(e) => setTrackId(e.target.value)}
                                    className="input-field"
                                />
                                <input
                                    type="text"
                                    placeholder="Track Name"
                                    value={trackName}
                                    onChange={(e) => setTrackName(e.target.value)}
                                    className="input-field"
                                />
                                <button onClick={addTrack} className="btn btn-success" style={{ marginLeft: '10px' }}>
                                    Submit
                                </button>
                            </div>
                        )}
                        <h2 className='track_list_heading'>Tracks List</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Track ID</th>
                                    <th>Track Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tracks.length > 0 ? (
                                    tracks.map((track) => (
                                        <tr key={track.Track_id} onClick={() => handleTrackClick(track)} style={{ cursor: 'pointer' }}>
                                            <td>{track.Track_id}</td>
                                            <td>{track.Track_Name}</td>
                                            <td>
                                                <button onClick={() => { 
                                                    setCurrentTrackId(track.Track_id); 
                                                    setTrackName(track.Track_Name); 
                                                    setIsUpdatingTrack(true); 
                                                }} className="btn btn-warning btn-sm">Update</button>
                                                <button onClick={() => deleteTrack(track.Track_id)} className="btn btn-danger btn-sm">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>No tracks available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {isUpdatingTrack && (
                            <div style={{ marginTop: '10px' }}>
                                <h3>Update Track</h3>
                                <input
                                    type="text"
                                    placeholder="Track Name"
                                    value={trackName}
                                    onChange={(e) => setTrackName(e.target.value)}
                                    className="input-field"
                                />
                                <button onClick={updateTrack} className="btn btn-info" style={{ marginLeft: '10px' }}>
                                    Update Track
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="right-section" style={{ flex: 1 }} ref={electiveRef}>
                        {selectedTrack && (
                            <>
                                <h2>Electives for {selectedTrack.Track_Name}</h2>
                                <button onClick={() => setShowElectives(!showElectives)} className="btn btn-warning">
                                    {showElectives ? 'Hide Electives' : 'Show Electives'}
                                </button>
                                {showElectives && (
                                    <>
                                        <button onClick={() => setIsAddingElective(!isAddingElective)} className="btn btn-primary">
                                            {isAddingElective ? 'Hide Add Elective' : 'Add Elective'}
                                        </button>
                                        {isAddingElective && (
                                            <div style={{ marginTop: '10px' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Elective Name"
                                                    value={electiveName}
                                                    onChange={(e) => setElectiveName(e.target.value)}
                                                    className="input-field"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Course Code"
                                                    value={courseCode}
                                                    onChange={(e) => setCourseCode(e.target.value)}
                                                    className="input-field"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Credits"
                                                    value={credits}
                                                    onChange={(e) => setCredits(e.target.value)}
                                                    className="input-field"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Semester"
                                                    value={semester}
                                                    onChange={(e) => setSemester(e.target.value)}
                                                    className="input-field"
                                                />
                                                <button onClick={addElective} className="btn btn-success" style={{ marginLeft: '10px' }}>
                                                    Add Elective
                                                </button>
                                            </div>
                                        )}
                                        <table className="table" style={{ marginTop: '10px' }}>
                                            <thead>
                                                <tr>
                                                    <th>Elective Name</th>
                                                    <th>Course Code</th>
                                                    <th>Credits</th>
                                                    <th>Semester</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {electives.map((elective) => (
                                                    <tr
                                                        key={elective.Elective_Name}
                                                        onMouseEnter={() => setHoveredElective(elective.Elective_Name)}
                                                        onMouseLeave={() => setHoveredElective(null)}
                                                    >
                                                        <td>{elective.Elective_Name}</td>
                                                        <td>{elective.Course_Code}</td>
                                                        <td>{elective.Credits}</td>
                                                        <td>{elective.Semester}</td>
                                                        <td>
                                                            {hoveredElective === elective.Elective_Name && (
                                                                <>
                                                                    <button onClick={() => handleElectiveClick(elective)} className="btn btn-warning btn-sm">Update</button>
                                                                    <button onClick={() => deleteElective(elective.Elective_Name)} className="btn btn-danger btn-sm">Delete</button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {isUpdatingElective && (
                                            <div style={{ marginTop: '10px' }}>
                                                <h3>Update Elective</h3>
                                                <input
                                                    type="text"
                                                    placeholder="Course Code"
                                                    value={courseCode}
                                                    onChange={(e) => setCourseCode(e.target.value)}
                                                    className="input-field"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Credits"
                                                    value={credits}
                                                    onChange={(e) => setCredits(e.target.value)}
                                                    className="input-field"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Semester"
                                                    value={semester}
                                                    onChange={(e) => setSemester(e.target.value)}
                                                    className="input-field"
                                                />
                                                <button onClick={updateElective} className="btn btn-info" style={{ marginLeft: '10px' }}>
                                                    Update Elective
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
