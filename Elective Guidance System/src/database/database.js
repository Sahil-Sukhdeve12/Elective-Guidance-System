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

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/categories', (req, res) => {
    console.log('Received request for /categories'); // Debugging log
    db.query('SELECT * FROM domain_Category', (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).send('Server error');
        }
        res.json(results);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
