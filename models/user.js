
const Datastore = require('nedb');
const bcrypt = require('bcryptjs');

const db = new Datastore({ filename: './data/users.db', autoload: true });

class User {
  static create(userData, callback) {
    db.findOne({ username: userData.username }, (err, existingUser) => {
      if (err) {
        return callback(err);
      }
      if (existingUser) {
        return callback('Username already exists');
      }
      bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
        if (err) {
          return callback(err);
        }
        const newUser = { username: userData.username, password: hashedPassword };
        db.insert(newUser, (err, user) => {
          if (err) {
            return callback(err);
          }
          callback(null, user);
        });
      });
    });
  }

  static getByUsername(username, callback) {
    db.findOne({ username }, callback);
  }
}

module.exports = User;
