const express = require('express');
const { claimItem, getClaimsByUser } = require('../controllers/claimController');
const authenticate = require('../middleware/userauth');

const router = express.Router();

// POST route to claim an item
router.post('/', authenticate, claimItem);

// GET route to fetch claims for the logged-in user with optional filtering
router.get('/user-claims', authenticate, getClaimsByUser);

module.exports = router;