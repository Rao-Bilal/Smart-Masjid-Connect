// models/Notice.js
import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    enum: ['Lost & Found', 'For Sale', 'Job', 'Help Request', 'General'], // Specific categories [cite: 120]
    required: true
  },
  content: { 
    type: String, 
    required: true 
  },
  contactInfo: { 
    type: String, 
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending' // All submissions go into a pending queue 
  },
  expiresAt: {
    type: Date,
    // Auto-expire after 30 days unless renewed 
    default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000) 
  },
  // In the future, this will link to the User Authentication module [cite: 102]
  submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
}, { timestamps: true }); // timestamps provide the 'newest-first' sorting capability [cite: 122]

export default mongoose.model('Notice', noticeSchema);