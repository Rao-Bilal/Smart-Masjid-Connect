import mongoose from 'mongoose';

const iftarSponsorshipSchema = new mongoose.Schema({
  sponsorName: { type: String, required: true },
  phone: { type: String, required: true },
  sponsoredDate: { type: Date, required: true, unique: true }, 
  contributionType: { 
    type: String, 
    enum: ['Full Meal', 'Dates & Water', 'Financial Contribution'], 
    required: true 
  },
  amount: { type: Number },
  notes: { type: String },
  status: { // <-- ADDED status tracking for Iftar
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  }
}, { timestamps: true });

export default mongoose.model('IftarSponsorship', iftarSponsorshipSchema);