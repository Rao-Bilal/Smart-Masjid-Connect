// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  urTitle: { 
    type: String, 
    required: true // Bilingual content string [cite: 74]
  },
  description: { 
    type: String, 
    required: true 
  },
  urDescription: { 
    type: String, 
    required: true // Bilingual content string [cite: 74]
  },
  dateGregorian: { 
    type: Date, 
    required: true // Standard calendar system [cite: 75]
  },
  dateHijri: { 
    type: String, 
    required: true // Islamic calendar system [cite: 75]
  },
  category: { 
    type: String, 
    enum: ['Islamic Holidays', 'Masjid Events', 'Educational', 'Community', 'Youth', 'Ladies'], // Required filters [cite: 63, 76]
    required: true
  },
  location: { 
    type: String, 
    required: true 
  },
  isRecurring: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);