const express = require('express');
const {
  viewAllItems,
  deleteItem,
  approveClaim,
  rejectClaim,
  viewPendingClaims,
} = require('../controllers/adminController');
const authorizeAdmin = require('../middleware/adminauth');

const router = express.Router();

router.get('/view-all', authorizeAdmin, viewAllItems);
router.delete('/delete/:id', authorizeAdmin, deleteItem);
router.post('/approve-claim/:claimId', authorizeAdmin, approveClaim);
router.post('/reject-claim/:claimId', authorizeAdmin, rejectClaim);
router.get('/view-pending-claims', authorizeAdmin, viewPendingClaims);

module.exports = router;
