const express = require('express');
const { postItem, findItems } = require('../controllers/itemController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/post', authenticate, postItem);
router.get('/find', findItems);

module.exports = router;