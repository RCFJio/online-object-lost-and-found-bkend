const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  lost_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item', // Reference to the Item model for the lost item
    required: true,
  },
  found_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item', // Reference to the Item model for the found item
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
},{ collection: 'claim' });

module.exports = mongoose.model('Claim', claimSchema);