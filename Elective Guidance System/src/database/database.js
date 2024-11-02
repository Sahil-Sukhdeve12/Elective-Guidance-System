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

// Initialize MySQL connection
const initializeDatabase = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL Database!');
        return connection;
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit if DB connection fails
    }
};

// Create a global database connection
let db;

const init = async () => {
    db = await initializeDatabase();
};

init(); // Initialize the database connection

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
        const results = await db.query('SELECT * FROM departments');
        res.json(results);
    } catch (err) {
        console.error('Error fetching departments:', err);
        res.status(500).send('Server error');
    }
});

// Create a department
app.post('/departments', async (req, res) => {
    const { department_name } = req.body;
    const query = 'INSERT INTO departments (department_name) VALUES (?)';
    try {
        await db.query(query, [department_name]);
        res.status(201).send('Department created successfully');
    } catch (err) {
        console.error('Error creating department:', err);
        res.status(500).send('Server error');
    }
});

// Update a department
app.put('/departments/:id', async (req, res) => {
    const { id } = req.params;
    const { department_name } = req.body;
    const query = 'UPDATE departments SET department_name = ? WHERE department_id = ?';
    try {
        await db.query(query, [department_name, id]);
        res.send('Department updated successfully');
    } catch (err) {
        console.error('Error updating department:', err);
        res.status(500).send('Server error');
    }
});

// Delete a department
app.delete('/departments/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM departments WHERE department_id = ?';
    try {
        await db.query(query, [id]);
        res.send('Department deleted successfully');
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

// Create a category
app.post('/domain_Category', async (req, res) => {
    const { category_name } = req.body;
    const query = 'INSERT INTO domain_Category (category_name) VALUES (?)';
    try {
        await db.query(query, [category_name]);
        res.status(201).send('Category created successfully');
    } catch (err) {
        console.error('Error creating category:', err);
        res.status(500).send('Server error');
    }
});

// Update a category
app.put('/domain_Category/:id', async (req, res) => {
    const { id } = req.params;
    const { category_name } = req.body;
    const query = 'UPDATE domain_Category SET category_name = ? WHERE category_id = ?';
    try {
        await db.query(query, [category_name, id]);
        res.send('Category updated successfully');
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(500).send('Server error');
    }
});

// Delete a category
app.delete('/domain_Category/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM domain_Category WHERE category_id = ?';
    try {
        await db.query(query, [id]);
        res.send('Category deleted successfully');
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

// Create a track and add to departments
app.post('/tracks', async (req, res) => {
    const { Track_Name, category_id, departments } = req.body;
    const query = 'INSERT INTO tracks (Track_Name, category_id) VALUES (?, ?)';
    try {
        const [result] = await db.query(query, [Track_Name, category_id]);
        const track_id = result.insertId;

        // Insert into track_department for each department
        const departmentQueries = departments.map(department_id =>
            db.query('INSERT INTO track_department (track_id, department_id) VALUES (?, ?)', [track_id, department_id])
        );

        await Promise.all(departmentQueries);
        res.status(201).send('Track and associated departments created successfully');
    } catch (err) {
        console.error('Error associating track with departments:', err);
        res.status(500).send('Server error while associating track with departments');
    }
});

// Update a track
app.put('/tracks/:id', async (req, res) => {
    const { id } = req.params;
    const { Track_Name, category_id } = req.body;
    const query = 'UPDATE tracks SET Track_Name = ?, category_id = ? WHERE Track_id = ?';
    try {
        await db.query(query, [Track_Name, category_id, id]);
        res.send('Track updated successfully');
    } catch (err) {
        console.error('Error updating track:', err);
        res.status(500).send('Server error');
    }
});

// Delete a track
app.delete('/tracks/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tracks WHERE Track_id = ?';
    try {
        await db.query(query, [id]);
        res.send('Track deleted successfully');
    } catch (err) {
        console.error('Error deleting track:', err);
        res.status(500).send('Server error');
    }
});

// --------------------
// Elective Endpoints
// --------------------

// Get electives by track
app.get('/electives', async (req, res) => {
    const { track_id } = req.query;
    if (!track_id) {
        return res.status(400).json({ error: 'Track ID is required' });
    }

    const query = 'SELECT * FROM electives WHERE Track_id = ?';
    try {
        const [results] = await db.query(query, [track_id]);
        res.json(results);
    } catch (err) {
        console.error('Error fetching electives:', err);
        res.status(500).send('Server error');
    }
});

// Create an elective
app.post('/electives', async (req, res) => {
    const { Elective_Name, Course_Code, Credits, Semester, Track_id } = req.body;
    const query = 'INSERT INTO electives (Elective_Name, Course_Code, Credits, Semester, Track_id) VALUES (?, ?, ?, ?, ?)';
    try {
        await db.query(query, [Elective_Name, Course_Code, Credits, Semester, Track_id]);
        res.status(201).send('Elective created successfully');
    } catch (err) {
        console.error('Error creating elective:', err);
        res.status(500).send('Server error');
    }
});

// Update an elective
app.put('/electives/:courseCode', async (req, res) => {
    const { courseCode } = req.params;
    const { Elective_Name, Credits } = req.body;
    const query = 'UPDATE electives SET Elective_Name = ?, Credits = ? WHERE Course_Code = ?';
    try {
        await db.query(query, [Elective_Name, Credits, courseCode]);
        res.send('Elective updated successfully');
    } catch (err) {
        console.error('Error updating elective:', err);
        res.status(500).send('Server error');
    }
});

// Delete an elective
app.delete('/electives/:courseCode', async (req, res) => {
    const { courseCode } = req.params;
    const query = 'DELETE FROM electives WHERE Course_Code = ?';
    try {
        await db.query(query, [courseCode]);
        res.send('Elective deleted successfully');
    } catch (err) {
        console.error('Error deleting elective:', err);
        res.status(500).send('Server error');
    }
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});


