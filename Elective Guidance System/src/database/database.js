import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // For parsing application/json

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'minor_project'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database!');
});

// Example route for fetching tracks
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM tracks', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Route for adding a track
app.post('/api/tracks', (req, res) => {
  const { track_id, track_name } = req.body;
  db.query('INSERT INTO tracks (track_id, track_name) VALUES (?, ?)', [track_id, track_name], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Track added successfully!', results });
  });
});

const fetchTracks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTracks(data);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };
  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
