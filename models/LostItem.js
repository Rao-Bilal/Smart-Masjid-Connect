import mongoose from 'mongoose';

const lostItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  
  // Made generic so it works for both "I lost this today" and "I found this today"
  dateReported: { type: Date, default: Date.now },
  location: { type: String, required: true }, // e.g., "Wudu Area", "Main Hall"
  
  // NEW: Tells us if a Namazi lost it, or the Imam found it
  type: { 
    type: String, 
    enum: ['LOST', 'FOUND'], 
    required: true 
  },
  
  status: { 
    type: String, 
    // Added 'Searching' for lost items, and 'Resolved' as a general closed state
    enum: ['Unclaimed', 'Claim Pending', 'Returned', 'Searching', 'Resolved'], 
    default: 'Unclaimed' 
  },
  
  // Renamed slightly so it can be the person looking for an item, or claiming a found one
  contactInfo: { type: String, required: true }, 
   // The person reporting
  claimantContact: { type: String },
  
  // NEW: For the Imam to upload pictures of found items
  imageUrl: { type: String } 
  
}, { timestamps: true });

export default mongoose.model('LostItem', lostItemSchema);