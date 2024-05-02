
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res) => {
  const { username, password } = req.body;
  console.log('Received signup request with username:', username);
  if (!username || !password) {
    return res.status(400).json({ error: 'Both username and password are required' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const newUser = { username, password: hashedPassword };
    console.log('New user data:', newUser);
    User.create(newUser, (err, user) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(400).json({ error: 'Username already exists' });
      }
      res.status(201).json(user);
    });
  });
};exports.login = (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request with username:', username);
    console.log('Received login request with password:', password);
    if (!username || !password) {
      return res.status(400).json({ error: 'Both username and password are required' });
    }
  
    User.getByUsername(username, (err, user) => {
      if (err) {
        console.error('Error finding user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('Found user:', user);
  
      if (!user) {
        console.log('User not found:', username);
        return res.status(404).json({ error: 'User not found' });
      }
  
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Password comparison result:', result);
  
        if (!result) {
          console.log('Invalid password for user:', username);
          return res.status(401).json({ error: 'Invalid password' });
        }
  
       
        const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        console.log('Generated access token:', accessToken);
  

        res.status(200).json({ accessToken });
      });
    });
  };
  