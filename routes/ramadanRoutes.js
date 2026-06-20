import express from 'express';
import { 
  applyForItikaf, getPendingItikaf, updateItikafStatus,
  sponsorIftar, getPendingIftar, updateIftarStatus 
} from '../controllers/ramadanController.js';

const router = express.Router();

// Itikaf Routes
router.post('/itikaf/apply', applyForItikaf);
router.get('/itikaf/pending', getPendingItikaf);
router.put('/itikaf/:id/status', updateItikafStatus);

// Iftar Routes
router.post('/iftar/sponsor', sponsorIftar);
router.get('/iftar/pending', getPendingIftar);
router.put('/iftar/:id/status', updateIftarStatus);

export default router;