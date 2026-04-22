// models/DailyAyah.js
import mongoose from 'mongoose';

const dailyAyahSchema = new mongoose.Schema({
  arabicText: { type: String, required: true },
  transliteration: { type: String, required: true },
  englishTranslation: { type: String, required: true },
  surahName: { type: String, required: true },
  ayahNumber: { type: Number, required: true },
  tafsirSnippet: { type: String } 
}, { timestamps: true });

export default mongoose.model('DailyAyah', dailyAyahSchema);