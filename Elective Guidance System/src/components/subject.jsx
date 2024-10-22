import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get the selected Track_id from URL params
import './styling/subject.css'; // Import your CSS for styling

const Subject = () => {
    const { trackId } = useParams(); // Extract Track_id from the route params
    const [electives, setElectives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchElectives = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/electives?track_id=${trackId}`);
                setElectives(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch electives.');
                setLoading(false);
            }
        };

        fetchElectives();
    }, [trackId]);

    if (loading) {
        return <p>Loading electives...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="subject-container">
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
            <button className="submit-button">Submit</button>
        </div>
    );
};

export default Subject;
