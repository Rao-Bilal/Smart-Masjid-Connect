import mongoose from 'mongoose';

const knowledgeChunkSchema = new mongoose.Schema({
  text: { type: String, required: true },
  source: { type: String, required: true },
  category: { type: String, required: true },
  source_confidence: { type: String }, // <-- ADD THIS LINE
  embedding: { type: [Number], required: true } 
});

export default mongoose.model('KnowledgeChunk', knowledgeChunkSchema);