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
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database!');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Fetch all tracks
app.get('/api/tracks', (req, res) => {
    db.query('SELECT * FROM tracks', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching tracks.' });
        }
        res.json(results);
    });
});

// Add a track
app.post('/api/tracks', (req, res) => {
    const { track_id, track_name } = req.body;
    db.query('INSERT INTO tracks (track_id, track_name) VALUES (?, ?)', [track_id, track_name], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error adding track.' });
        }
        res.json({ message: 'Track added successfully!', results });
    });
});

// Update a track
app.put('/api/tracks/:trackId', (req, res) => {
    const trackId = req.params.trackId;
    const { track_name } = req.body;
    db.query('UPDATE tracks SET track_name = ? WHERE track_id = ?', [track_name, trackId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error updating track.' });
        }
        res.json({ message: 'Track updated successfully!', results });
    });
});

// Delete a track
app.delete('/api/tracks/:trackId', (req, res) => {
    const trackId = req.params.trackId;
    db.query('DELETE FROM tracks WHERE track_id = ?', [trackId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting track.' });
        }
        res.json({ message: 'Track deleted successfully!' });
    });
});

// Fetch electives by track ID
app.get('/api/electives/:trackId', (req, res) => {
    const trackId = req.params.trackId;
    db.query('SELECT * FROM electives WHERE Track_id = ? ORDER BY Semester ASC', [trackId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching electives.' });
        }
        res.json(results);
    });
});

// Add an elective
app.post('/api/electives', (req, res) => {
    const { Elective_Name, Course_Code, Credits, Semester, Track_id } = req.body;
    db.query('INSERT INTO electives (Elective_Name, Course_Code, Credits, Semester, Track_id) VALUES (?, ?, ?, ?, ?)',
        [Elective_Name, Course_Code, Credits, Semester, Track_id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error adding elective.' });
            }
            res.json({ message: 'Elective added successfully!', results });
        });
});

// Update an elective
app.put('/api/electives/:electiveName', (req, res) => {
    const electiveName = req.params.electiveName;
    const { Course_Code, Credits, Semester } = req.body;
    db.query('UPDATE electives SET Course_Code = ?, Credits = ?, Semester = ? WHERE Elective_Name = ?', 
        [Course_Code, Credits, Semester, electiveName], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error updating elective.' });
            }
            res.json({ message: 'Elective updated successfully!', results });
        });
});

// Delete an elective
app.delete('/api/electives/:electiveName', (req, res) => {
    const electiveName = req.params.electiveName;
    db.query('DELETE FROM electives WHERE Elective_Name = ?', [electiveName], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting elective.' });
        }
        res.json({ message: 'Elective deleted successfully!' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
