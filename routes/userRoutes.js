
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', authenticateToken, userController.login);

module.exports = router;
