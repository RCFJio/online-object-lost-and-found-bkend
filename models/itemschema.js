const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['lost', 'found'],
    required: true,
  },
  user_id: {
    type: String,
    ref: 'User',
    required: true,
  },
 Date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,  
    required: false,  // Optional, depending on if you want to make it mandatory
  },
},{ collection: 'item' });

module.exports = mongoose.model('Item', itemSchema);