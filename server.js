// global variables
const express = require('express');
const app = express();
const notes = require('./db/db.json');

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });