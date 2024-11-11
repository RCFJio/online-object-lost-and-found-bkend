const express = require('express');
const { claimItem } = require('../controllers/claimController');
const authenticate = require('../middleware/userauth');

const router = express.Router();

router.post('/:itemId', authenticate, claimItem);

module.exports = router;