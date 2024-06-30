const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
const database = process.env.DB_NAME;

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to Database', error);
        return;
    }
    console.log(`You are now connected to your database ${database}`);
});

app.use(bodyParser.json());
app.use(cors());

app.post('/api/offers', (req, res) => {
    const { email, title, insertDate, travelDate, fromAirport, toAirport, type, cost } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const query = 'SELECT user_id FROM user WHERE email = ?';
    connection.query(query, [email], (error, results) => {
        if (error) {
            console.error('Error querying database', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Not a valid email' });
        }

        const userId = results[0].user_id;

        const offerQuery = `INSERT INTO offer (User_id, title, insert_date, travel_date, from_airport, to_airport, type, cost, Likes, Dislikes)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0)`;

        const values = [userId, title, insertDate, travelDate, fromAirport, toAirport, type, cost];

        connection.query(offerQuery, values, (err, result) => {
            if (err) {
                console.error('Error creating the offer', err);
                res.status(500).json({ error: 'Error creating the offer' });
            } else {
                const newOfferId = result.insertId;
                res.status(201).json({ offerId: newOfferId, userId, title, insertDate, travelDate, fromAirport, toAirport, type, cost });
            }
        });
    });
});

app.get('/api/offers/:id', (req, res) => {
    const offerId = req.params.id;
    const query = 'SELECT * FROM offer WHERE offer_id = ?';
    const values = [offerId];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Error retrieving the offer', error);
            res.status(500).json({ error: 'Error retrieving the offer' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'Offer not found' });
            } else {
                res.json(result[0]);
            }
        }
    });
});

app.get('/api/offers', (req, res) => {
    const query = 'SELECT * FROM offer';

    connection.query(query, (error, result) => {
        if (error) {
            console.error('Error retrieving offers', error);
            res.status(500).json({ error: 'Error retrieving offers' });
        } else {
            res.status(200).json(result);
        }
    });
});

app.post('/api/users', (req, res) => {
    const { name, email, location } = req.body;
    const query = 'INSERT INTO user (name, email, location) VALUES (?, ?, ?)';
    const values = [name, email, location];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Error creating the user', error);
            res.status(500).json({ error: 'Error creating the user' });
        } else {
            res.json({ message: 'User created successfully', userId: result.insertId });
        }
    });
});

app.put('/api/users/:id/location', (req, res) => {
    const userId = req.params.id;
    const { location } = req.body;
    const query = 'UPDATE user SET location = ? WHERE UID = ?';
    const values = [location, userId];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Error updating the user location', error);
            res.status(500).json({ error: 'Error updating the user location' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.json({ message: 'User location updated successfully' });
            }
        }
    });
});

app.put('/api/offers/:id', (req, res) => {
    const offerId = req.params.id;
    const { likes, dislikes } = req.body;

    const updateQuery = 'UPDATE offer SET likes = ?, dislikes = ? WHERE Offer_id = ?';
    const values = [likes, dislikes, offerId];

    connection.query(updateQuery, values, (error, result) => {
        if (error) {
            console.error('Error updating likes and dislikes:', error);
            res.status(500).json({ error: 'Error updating likes and dislikes' });
        } else {
            res.json({ message: 'Likes and Dislikes updated successfully' });
        }
    });
});

app.post('/api/login', (req, res) => {
    const { email } = req.body;

    connection.query(
        'SELECT * FROM user WHERE email = ?',
        [email],
        (error, results) => {
            if (error) {
                console.error('Error querying database', error);
                return res.status(500).json({ error: 'Internal Server Error' });

            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'Not a valid e-mail' });
            }

            return res.json({ message: 'Login successful', user: results[0] });
        }
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
