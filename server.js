// server.js
import 'dotenv/config'; // MUST BE LINE 1. This loads variables before anything else.

import express from 'express';
import cors from 'cors'; 
import connectDB from './config/db.js';
import ramadanRoutes from './routes/ramadanRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js'; 
import maktabRoutes from './routes/maktabRoutes.js';

// --- IMPORT EXISTING ROUTERS ---
import announcementRoutes from './routes/announcementRoutes.js';
import prayerTimeRoutes from './routes/prayerTimeRoutes.js';
import hadithRoutes from './routes/hadithRoutes.js';

// --- IMPORT NEW MODULAR ROUTERS ---
import eventRoutes from './routes/eventRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import dailyAyahRoutes from './routes/dailyAyahRoutes.js';

import lostFoundRoutes from './routes/lostFoundRoutes.js';
import janazaRoutes from './routes/janazaRoutes.js';

import fiqhAgentRoutes from './routes/fiqhAgentRoutes.js';

// Connect to database (will now successfully see process.env.MONGODB_URI)
connectDB();

const app = express();

// === MIDDLEWARE ===
app.use(cors()); 
app.use(express.json());

// === MOUNT EXISTING ROUTERS ===
app.use('/api/announcements', announcementRoutes);
app.use('/api/prayertimes', prayerTimeRoutes);
app.use('/api/hadith', hadithRoutes);


app.use('/api/admin', adminAuthRoutes);

app.use('/api/maktab', maktabRoutes);

// === MOUNT NEW MODULAR ROUTERS ===
app.use('/api/events', eventRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/dailyayah', dailyAyahRoutes);

app.use('/api/ramadan', ramadanRoutes);

app.use('/api/lostfound', lostFoundRoutes);
app.use('/api/janaza', janazaRoutes);

// (Will now successfully see process.env.GEMINI_API_KEY)
app.use('/api/fiqh', fiqhAgentRoutes);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));