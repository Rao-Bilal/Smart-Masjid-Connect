import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  status: { type: String, enum: ['Present', 'Absent', 'Leave'], required: true }
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentName: { type: String, required: true },
  parentPhone: { type: String, required: true },
  course: { 
    type: String, 
    enum: ['Qaida', 'Nazra', 'Hifz', 'Islamic Studies'], 
    required: true 
  },
  currentLesson: { type: String, default: 'Starting' }, // e.g., "Para 30", "Surah Yaseen"
  attendanceHistory: [attendanceSchema],
  status: { type: String, enum: ['Active', 'Graduated', 'Left'], default: 'Active' }
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);