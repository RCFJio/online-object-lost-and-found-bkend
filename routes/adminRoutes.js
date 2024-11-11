const express = require('express');
const {
  viewAllItems,
  deleteItem,
  approveClaim,
  rejectClaim,
} = require('../controllers/adminController');
const authorizeAdmin = require('../middleware/adminauth');

const router = express.Router();

router.get('/view-all', authorizeAdmin, viewAllItems);
router.delete('/delete/:id', authorizeAdmin, deleteItem);
router.post('/approve-claim/:claimId', authorizeAdmin, approveClaim);
router.post('/reject-claim/:claimId', authorizeAdmin, rejectClaim);

module.exports = router;
