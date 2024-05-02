
const Datastore = require('nedb');

const db = {
  notes: new Datastore({ filename: './data/notes.db', autoload: true }),
  users: new Datastore({ filename: './data/users.db', autoload: true })
};

module.exports = db;
