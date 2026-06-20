import mongoose from 'mongoose';

const triageTicketSchema = new mongoose.Schema({
  userQuestion: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Reviewed', 'Answered'], default: 'Pending' },
  aiConfidenceScore: { type: Number },
  finalAnswer: { type: String }
}, { timestamps: true });

export default mongoose.model('TriageTicket', triageTicketSchema);