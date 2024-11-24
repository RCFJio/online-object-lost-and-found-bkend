const express = require('express');
const { register, login, user } = require('../controllers/userController');
const authenticate = require('../middleware/userauth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/user',authenticate ,user);

module.exports = router;