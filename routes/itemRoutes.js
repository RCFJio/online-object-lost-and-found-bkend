const express = require('express');
const { postItem, findItems, getLostItemsByUser } = require('../controllers/itemController');
const authenticate = require('../middleware/userauth');

const router = express.Router();

router.post('/post', authenticate, postItem);
router.get('/find', findItems);
router.get('/lost-items', authenticate, getLostItemsByUser);

module.exports = router;