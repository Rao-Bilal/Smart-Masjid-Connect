// server.js
import 'dotenv/config'; // MUST BE FIRST

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// ===== ROUTES =====
import ramadanRoutes from './routes/ramadanRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import maktabRoutes from './routes/maktabRoutes.js';

import announcementRoutes from './routes/announcementRoutes.js';
import prayerTimeRoutes from './routes/prayerTimeRoutes.js';
import hadithRoutes from './routes/hadithRoutes.js';

import eventRoutes from './routes/eventRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import dailyAyahRoutes from './routes/dailyAyahRoutes.js';

import lostFoundRoutes from './routes/lostFoundRoutes.js';
import janazaRoutes from './routes/janazaRoutes.js';

import fiqhAgentRoutes from './routes/fiqhAgentRoutes.js';

// ✅ IMPORTANT: Members route (FIXED)
import memberRoutes from './routes/membersRoutes.js';

// ===== CONNECT DB =====
connectDB();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== STATIC FILES =====
app.use('/uploads', express.static('uploads'));

// ===== ROUTES =====
app.use('/api/admin', adminAuthRoutes);

app.use('/api/announcements', announcementRoutes);
app.use('/api/prayertimes', prayerTimeRoutes);
app.use('/api/hadith', hadithRoutes);

app.use('/api/maktab', maktabRoutes);

app.use('/api/events', eventRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/dailyayah', dailyAyahRoutes);

app.use('/api/ramadan', ramadanRoutes);

app.use('/api/lostfound', lostFoundRoutes);
app.use('/api/janaza', janazaRoutes);

app.use('/api/fiqh', fiqhAgentRoutes);

// ✅ FIXED: Members API
app.use('/api/members', memberRoutes);

// ===== SERVER =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);