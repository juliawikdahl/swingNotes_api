
const Datastore = require('nedb');

const db = new Datastore({ filename: './data/notes.db', autoload: true });

class Note {
  static getAll(callback) {
    db.find({}, callback);
  }

  static getById(id, callback) {
    db.findOne({ _id: id }, callback);
  }

  static create(noteData, callback) {
    db.insert(noteData, callback);
  }

  static update(id, newData, callback) {
    db.update({ _id: id }, { $set: newData }, {}, callback);
  }

  static delete(id, callback) {
    db.remove({ _id: id }, {}, callback);
  }
}

module.exports = Note;
