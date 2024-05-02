const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Received authorization header:', authHeader); 
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Extracted token:', token); 
  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
   
      return res.sendStatus(403);
    }
    req.user = user;

    next();
  });
};
