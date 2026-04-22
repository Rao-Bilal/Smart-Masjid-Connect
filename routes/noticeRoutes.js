import express from 'express';
import { getPendingNotices, updateNoticeStatus, getApprovedNotices, createNotice } from '../controllers/noticeController.js';

const router = express.Router();

router.route('/').get(getApprovedNotices).post(createNotice); // Public routes
router.route('/pending').get(getPendingNotices); // Admin route
router.route('/:id/status').put(updateNoticeStatus); // Admin route

export default router;