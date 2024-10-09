import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/domain.css'; // Import the CSS file for custom styles

const Domain = ({ selectedCategory, setSelectedTrack }) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchTracks = async () => {
      if (!selectedCategory) return; // Prevent fetch if no category is selected

      try {
        const response = await fetch(`http://localhost:5000/api/tracks?categoryId=${selectedCategory}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Fetched Tracks: ", data); // Log fetched tracks
        setTracks(data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setError('Failed to load tracks. Please try again later.');
      }
    };

    fetchTracks();
  }, [selectedCategory]); // Re-fetch tracks when the selected category changes

  useEffect(() => {
    console.log("Tracks updated:", tracks); // Log tracks when they update
  }, [tracks]);

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
            <label htmlFor="trackSelect">Choose a Track:</label>
            <select
              id="trackSelect"
              className="form-control"
              onChange={handleTrackChange}
            >
              <option value="" disabled>Select a Track</option>
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
            <button type="button" className="btn btn-primary mt-4" disabled={!tracks.length}>
              Next
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Domain;
