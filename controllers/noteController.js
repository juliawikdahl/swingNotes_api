// api/controllers/noteController.js
const Note = require('../models/note');

exports.getAllNotes = (req, res) => {
  Note.getAll((err, notes) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(notes);
  });
};

exports.getNoteById = (req, res) => {
  Note.getById(req.params.id, (err, note) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  });
};

exports.createNote = (req, res) => {
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    createdAt: new Date(),
    modifiedAt: new Date()
  };

  Note.create(newNote, (err, note) => {
    if (err) {
      return res.status(400).json({ error: 'Bad request' });
    }
    res.status(201).json(note);
  });
};

exports.updateNote = (req, res) => {
  const newData = {
    title: req.body.title,
    text: req.body.text,
    modifiedAt: new Date()
  };

  Note.update(req.params.id, newData, (err, numReplaced) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (numReplaced === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.sendStatus(204);
  });
};

exports.deleteNote = (req, res) => {
  Note.delete(req.params.id, (err, numRemoved) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (numRemoved === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.sendStatus(204);
  });
};
