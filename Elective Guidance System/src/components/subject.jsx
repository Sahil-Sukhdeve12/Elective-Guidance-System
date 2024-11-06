import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import axios from 'axios';

const Subject = () => {
    const { trackId } = useParams(); // Extract Track_id from the route params
    const [electives, setElectives] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate to programmatically navigate

    useEffect(() => {
        const fetchElectives = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/electives?track_id=${trackId}`);
                setElectives(response.data); // Set the electives data
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                setLoading(false); // Set loading to false in case of an error
                console.error('Error fetching electives:', err); // Log error for debugging (optional)
            }
        };

        fetchElectives();
    }, [trackId]);

    // Loading state
    if (loading) {
        return <p>Loading electives...</p>;
    }

    // Back button handler
    const handleBack = () => {
        navigate(-1); // Go back to the previous page in history
    };

    return (
        <div className="subject-container">
            {/* Back Button */}
            <button onClick={handleBack} className="back-button">
                Back to Select Track
            </button>

            {/* Display message if no electives are available */}
            {electives.length === 0 ? (
                <div className="no-electives-message">
                    <p>No electives are available for this track at the moment.</p>
                    <p>Please check again later or select a different track.</p>
                </div>
            ) : (
                <>
                    {/* Display electives table if there are electives */}
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

                    {/* Only show submit button if there are electives */}
                    <button className="submit-button">Submit</button>
                </>
            )}
        </div>
    );
};

export default Subject;
