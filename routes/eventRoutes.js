import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();

router.route('/').get(getEvents).post(createEvent);
router.route('/:id').put(updateEvent).delete(deleteEvent); // Added .put() [cite: 71]

export default router;