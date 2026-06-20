import mongoose from 'mongoose';

const janazaSchema = new mongoose.Schema({
  deceasedName: { type: String, required: true },
  dateOfDeath: { type: Date, default: Date.now },
  namazTime: { type: String, required: true }, // e.g., "After Asr (5:30 PM)"
  graveyardLocation: { type: String, required: true },
  googleMapsLink: { type: String },
  status: { type: String, enum: ['Active', 'Completed'], default: 'Active' },
  
  // Array to track volunteers for specific tasks
  volunteers: [{
    task: { type: String, enum: ['Grave Digging', 'Transport/Ambulance', 'Food/Condolences'] },
    name: String,
    phone: String
  }]
}, { timestamps: true });

export default mongoose.model('Janaza', janazaSchema);