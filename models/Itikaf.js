import mongoose from 'mongoose';

const itikafSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  cnic: { type: String, required: true, unique: true }, 
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Waitlisted', 'Rejected'], // <-- ADDED 'Pending'
    default: 'Pending' // <-- CHANGED default to 'Pending'
  },
  applicationDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Itikaf', itikafSchema);