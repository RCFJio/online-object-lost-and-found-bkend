const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item', // Reference to the Item model
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'], // Added 'rejected' status
    default: 'pending',
  },
  claimedBy: {
    type: String,
    required: true,
  },
  claimedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Claim', claimSchema);