const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/db.json')
const uuid = require('./helpers/uuid')



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.json(db);
  
});

// adding the notes to list after saveBtn clicked
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid()
      }
      
      db.push(newNote)
      
      const noteString = JSON.stringify(db, null, 2);
      
      fs.writeFile(`./db/db.json`, noteString, (err) => 
      err
      ? console.error(err)
      : console.log(`${newNote.title}`));
      
      const response = {
        status: 'success',
        body: newNote
      };
      
      console.log(response);
      res.status(201).json(response);
    } 
  });

app.delete('/api/notes/:id', (req, res) => {
const requestedNote = req.params.id;
const result = [];
// console.log(requestedNote)
for (let i = 0; i < db.length; i++) {
  const currentNote = db[i].id;
  // console.log(currentNote)
  if (requestedNote !== currentNote) {
    result.push(db[i]);
  }
  console.log(result)
  const noteString = JSON.stringify(result);
      
  fs.writeFile(`./db/db.json`, noteString, (err) => 
  err
  ? console.error(err)
  : console.log(`${newNote.title}`));
}
return res.json(result);
});



app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);



let object = {
 hello: "this is a greeting",
 bye: "get outta here"
}
console.log(object.hello)