import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Subject = ({ selectedTrack }) => {
  const [electives, setElectives] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchElectives = async () => {
      if (!selectedTrack) return; // Do nothing if no track is selected

      try {
        const response = await fetch(`http://localhost:5000/api/electives/${selectedTrack}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setElectives(data);
      } catch (error) {
        console.error('Error fetching electives:', error);
        setError('Failed to load electives. Please try again later.');
      }
    };

    fetchElectives();
  }, [selectedTrack]);

  return (
    <div>
      <h1 className="text-center mb-3">Available Electives in the Selected Track</h1>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div className="container mt-5">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Elective Name</th>
              <th>Course Code</th>
              <th>Credits</th>
              <th>Semester</th>
              <th>Track ID</th>
            </tr>
          </thead>
          <tbody>
            {electives.length > 0 ? (
              electives.map((elective) => (
                <tr key={elective.Elective_Name}>
                  <td>{elective.Elective_Name}</td>
                  <td>{elective.Course_Code}</td>
                  <td>{elective.Credits}</td>
                  <td>{elective.Semester}</td>
                  <td>{elective.Track_id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No electives available for this track.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subject;
