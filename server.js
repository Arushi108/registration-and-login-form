const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // CORS for cross-origin requests

const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(cors()); // Enable CORS for all requests

// Route to save user data to a JSON file
app.post('/save', (req, res) => {
    const newUser = req.body;

    const filePath = path.join(__dirname, 'users.json');

    // Read existing data from the file
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error(err);
            return res.status(500).json({ message: 'Failed to save data.' });
        }

        const existingUsers = data ? JSON.parse(data) : [];
        existingUsers.push(newUser);

        // Write updated data back to the file
        fs.writeFile(filePath, JSON.stringify(existingUsers, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to save data.' });
            }

            res.status(200).json({ message: 'Data saved successfully.' });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Corrected this line
});
