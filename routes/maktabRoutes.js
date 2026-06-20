import express from 'express';
import { getStudents, registerStudent, markAttendance, updateProgress } from '../controllers/maktabController.js';

const router = express.Router();

router.get('/students', getStudents);
router.post('/students', registerStudent);
router.put('/students/:id/attendance', markAttendance);
router.put('/students/:id/progress', updateProgress);

export default router;