const fs = require('fs');
const {findById, createNewNote, validateNote} = require('../../lib/notes');
const { notes } = require('../../db/db.json');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.json(notes);
  });

router.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();
    
    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(notes);
  }
});

router.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    notes.forEach((array, index) => {
        if (id == array.id) {    
            notes.splice(index, 1);
            const newNotes = notes.slice();
            const jsonNotes = JSON.stringify({ notes: newNotes }, null, 2)
            fs.writeFile("./db/db.json", jsonNotes, function(err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
    res.json(true);
});

module.exports  = router;