// models/ReadingProgress.js
import mongoose from 'mongoose';

const readingProgressSchema = new mongoose.Schema({
  userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
  },
  completedSurahs: [{ 
      type: Number, 
      min: 1, 
      max: 114 
  }]
}, { timestamps: true });

export default mongoose.model('ReadingProgress', readingProgressSchema);