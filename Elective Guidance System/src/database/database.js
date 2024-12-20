import express from 'express';
import mysql from 'mysql2/promise'; // Use promise-based mysql2 for async/await
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // For parsing application/json

// MySQL connection configuration
const dbConfig = {
    host: 'minordb.c5w0ua8imsf1.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: '12Pass12',
    database: 'minor_project',
};

// Create a pool of connections with Promise-based API
const db = mysql.createPool(dbConfig); // Create the pool and it will return promises

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// --------------------
// Department Endpoints
// --------------------

// Get all departments
app.get('/departments', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM departments');
        res.json(results); // Send the results as JSON
    } catch (err) {
        console.error('Error fetching departments:', err);
        res.status(500).send('Server error');
    }
});

// Add a new department
app.post('/departments', async (req, res) => {
    const { department_name } = req.body;
    const query = 'INSERT INTO departments (department_name) VALUES (?)';
    try {
        await db.query(query, [department_name]);
        res.status(201).send('Department added successfully');
    } catch (err) {
        console.error('Error adding department:', err);
        res.status(500).send('Server error');
    }
});

// Update a department
app.put('/departments/:id', async (req, res) => {
    const departmentId = req.params.id;
    const { department_name } = req.body;
    const query = 'UPDATE departments SET department_name = ? WHERE department_id = ?';
    try {
        await db.query(query, [department_name, departmentId]);
        res.status(200).send('Department updated successfully');
    } catch (err) {
        console.error('Error updating department:', err);
        res.status(500).send('Server error');
    }
});

// Delete a department
app.delete('/departments/:id', async (req, res) => {
    const departmentId = req.params.id;
    const query = 'DELETE FROM departments WHERE department_id = ?';
    try {
        await db.query(query, [departmentId]);
        res.status(200).send('Department deleted successfully');
    } catch (err) {
        console.error('Error deleting department:', err);
        res.status(500).send('Server error');
    }
});

// --------------------
// Category Endpoints
// --------------------

// Get all categories
app.get('/categories', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM domain_Category');
        res.json(results);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).send('Server error');
    }
});

// Add a new category
app.post('/categories', async (req, res) => {
    const { category_name } = req.body;
    const query = 'INSERT INTO domain_Category (category_name) VALUES (?)';
    try {
        await db.query(query, [category_name]);
        res.status(201).send('Category added successfully');
    } catch (err) {
        console.error('Error adding category:', err);
        res.status(500).send('Server error');
    }
});

// Update a category
app.put('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
    const { category_name } = req.body;
    const query = 'UPDATE domain_Category SET category_name = ? WHERE category_id = ?';
    try {
        await db.query(query, [category_name, categoryId]);
        res.status(200).send('Category updated successfully');
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(500).send('Server error');
    }
});

// Delete a category
app.delete('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
    const query = 'DELETE FROM domain_Category WHERE category_id = ?';
    try {
        await db.query(query, [categoryId]);
        res.status(200).send('Category deleted successfully');
    } catch (err) {
        console.error('Error deleting category:', err);
        res.status(500).send('Server error');
    }
});

// --------------------
// Track Endpoints
// --------------------

// Get all tracks
app.get('/tracks', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM tracks');
        res.json(results);
    } catch (err) {
        console.error('Error fetching tracks:', err);
        res.status(500).send('Server error');
    }
});

// Get tracks for a specific categoryId
app.get('/tracks/:categoryId', async (req, res) => {
    const { categoryId } = req.params; // Get categoryId from the route params

    try {
        // Query to get tracks that belong to the given categoryId
        const [results] = await db.query(
            'SELECT * FROM tracks WHERE category_id = ?',
            [categoryId]
        );
        res.json(results); // Send the results as JSON
    } catch (err) {
        console.error(`Error fetching tracks for categoryId ${categoryId}:`, err);
        res.status(500).send('Server error');
    }
});

// Endpoint to get track IDs for a specific department
app.get('/track_department', async (req, res) => {
    const departmentId = req.query.department_id; // Get department_id from query parameters

    if (!departmentId) {
        return res.status(400).send('Department ID is required');
    }

    try {
        // Query to fetch track IDs for the given department_id
        const [results] = await db.query(
            'SELECT Track_id FROM track_department WHERE department_id = ?',
            [departmentId]
        );
        res.json(results); // Send the track IDs as JSON
    } catch (err) {
        console.error('Error fetching track department associations:', err);
        res.status(500).send('Server error');
    }
});

// Add a new track
app.post('/tracks', async (req, res) => {
    console.log("Received data:", req.body);

    try {
        const { Track_Name, category_id, selectedDepartments } = req.body;

        // Validate input
        if (!Track_Name || !category_id || !selectedDepartments) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Insert the new track into the 'tracks' table
        const [result] = await db.query(
            'INSERT INTO tracks (Track_Name, category_id) VALUES (?, ?)',
            [Track_Name, category_id]
        );

        // Send the newly created track ID as part of the response
        res.status(201).json({
            track_id: result.insertId // The auto-generated primary key (ID) of the new track
        });
    } catch (err) {
        console.error('Error adding track:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

// Associate a track with departments
app.post('/track_department', async (req, res) => {
    try {
        const { track_id, department_id } = req.body;

        // Ensure the provided track_id and department_id are valid
        if (!track_id || !department_id) {
            return res.status(400).json({ message: 'Track ID and Department ID are required' });
        }

        // Insert into the 'track_department' table
        const query = 'INSERT INTO track_department (track_id, department_id) VALUES (?, ?)';
        await db.query(query, [track_id, department_id]);

        res.status(200).json({ message: 'Department added to track successfully' });
    } catch (err) {
        console.error('Error associating department with track:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

// --------------------
// Elective Endpoints
// --------------------

// Get all electives

app.get('/allelectives', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM electives');
        res.json(results);
    } catch (err) {
        console.error('Error fetching electives:', err);
        res.status(500).send('Server error');
    }
});


// Get electives by track

app.get('/electives', async (req, res) => {
    const { track_id } = req.query;

    if (!track_id) {
        return res.status(400).json({ error: 'Track ID is required' });
    }

    const trackId = parseInt(track_id, 10); // Ensure trackId is a number
    if (isNaN(trackId)) {
        return res.status(400).json({ error: 'Track ID must be a valid number' });
    }

    const query = 'SELECT * FROM electives WHERE Track_id = ?';
    try {
        const [results] = await db.query(query, [trackId]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'No electives found for the given track ID' });
        }
        res.json(results);
    } catch (err) {
        console.error('Error fetching electives:', err);
        res.status(500).send('Server error');
    }
});


// Add a new elective
app.post('/electives', async (req, res) => {
    const { Elective_Name, Course_Code, Credits, Semester, Track_id } = req.body;
    const query = 'INSERT INTO electives (Elective_Name, Course_Code, Credits, Semester, Track_id) VALUES (?, ?, ?, ?, ?)';
    try {
        await db.query(query, [Elective_Name, Course_Code, Credits, Semester, Track_id]);
        res.status(201).send('Elective added successfully');
    } catch (err) {
        console.error('Error adding elective:', err);
        res.status(500).send('Server error');
    }
});

// Update an elective
app.put('/electives/:id', async (req, res) => {
    const { id } = req.params;
    const { Elective_Name, Course_Code, Credits, Semester, Track_id } = req.body;
    const query = 'UPDATE electives SET Elective_Name = ?, Course_Code = ?, Credits = ?, Semester = ?, Track_id = ? WHERE Elective_Number = ?';
    try {
        await db.query(query, [Elective_Name, Course_Code, Credits, Semester, Track_id, id]);
        res.status(200).send('Elective updated successfully');
    } catch (err) {
        console.error('Error updating elective:', err);
        res.status(500).send('Server error');
    }
});

// Delete an elective
app.delete('/electives/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM electives WHERE Elective_Number = ?';
    try {
        await db.query(query, [id]);
        res.status(200).send('Elective deleted successfully');
    } catch (err) {
        console.error('Error deleting elective:', err);
        res.status(500).send('Server error');
    }
});

// Get electives for a specific track
app.get('/electives/track/:track_id', async (req, res) => {
    const { track_id } = req.params;
    const query = 'SELECT * FROM electives WHERE Track_id = ?';
    try {
        const [result] = await db.query(query, [track_id]);
        res.json(result);
    } catch (err) {
        console.error('Error fetching electives:', err);
        res.status(500).send('Server error');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
