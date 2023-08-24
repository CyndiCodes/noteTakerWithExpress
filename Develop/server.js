const express = require('express');
const path = require('path');
const PORT = 3001;
const app = express();
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.get('api/notes', (req, res) => res.json('/db/db.json'))

app.post('api/notes', (req, res) => res.json('/db/db.json'))

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);