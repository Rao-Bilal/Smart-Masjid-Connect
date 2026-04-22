// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import connectDB from './config/db.js';

// --- IMPORT EXISTING ROUTERS ---
import announcementRoutes from './routes/announcementRoutes.js';
import prayerTimeRoutes from './routes/prayerTimeRoutes.js';
import hadithRoutes from './routes/hadithRoutes.js';

// --- IMPORT NEW MODULAR ROUTERS ---
import eventRoutes from './routes/eventRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import dailyAyahRoutes from './routes/dailyAyahRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// === MIDDLEWARE ===
// Enable CORS for ALL origins (safest for development)
app.use(cors()); 

// Body parser (allows reading JSON in requests)
app.use(express.json());

// === MOUNT EXISTING ROUTERS ===
app.use('/api/announcements', announcementRoutes);
app.use('/api/prayertimes', prayerTimeRoutes);
app.use('/api/hadith', hadithRoutes);

// === MOUNT NEW MODULAR ROUTERS ===
app.use('/api/events', eventRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/dailyayah', dailyAyahRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));