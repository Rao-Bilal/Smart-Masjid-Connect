import express from 'express';
import { createDailyAyah, getLatestAyah, updateDailyAyah, getAllAyahs } from '../controllers/dailyAyahController.js';

const router = express.Router();

router.route('/').post(createDailyAyah).get(getLatestAyah);
router.route('/all').get(getAllAyahs); // Added to help populate management list
router.route('/:id').put(updateDailyAyah); // Added .put()

export default router;