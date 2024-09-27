import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/domain.css'; // Import the CSS file for custom styles

const Domain = ({ setSelectedTrack }) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tracks');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setError('Failed to load tracks. Please try again later.');
      }
    };

    fetchTracks();
  }, []);

  const handleTrackChange = (event) => {
    const trackId = event.target.value;
    setSelectedTrack(trackId); // Set the selected track ID
  };

  return (
    <div>
      <div className="domain-container">
        <h1 className="text-center mb-4 no-margin domain-title">Select a Track</h1>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form className="text-center">
          <div className="form-group">
            <label htmlFor="trackSelect">Choose a Domain:</label>
            <select
              id="trackSelect"
              className="form-control"
              onChange={handleTrackChange}
            >
              <option value="" disabled>Select a Domain</option>
              {tracks.length > 0 ? (
                tracks.map((track) => (
                  <option key={track.Track_id} value={track.Track_id}>
                    {track.Track_Name}
                  </option>
                ))
              ) : (
                <option disabled>No tracks available</option>
              )}
            </select>
          </div>
          <Link to="/subject">
            <button type="button" className="btn btn-primary mt-4" disabled={!setSelectedTrack}>
              Next
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Domain;
