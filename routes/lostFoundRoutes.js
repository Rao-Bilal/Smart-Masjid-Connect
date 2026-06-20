import express from 'express';
import { 
  getLostItems, 
  claimItem, 
  reportLostItem, 
  reportFoundItem ,
  getAdminItems, // <-- NEW
  resolveClaim,
  updateItemStatus
} from '../controllers/lostFoundController.js';
import { upload } from '../middlewares/upload.js'; // Import Multer middleware

const router = express.Router();

// --- PUBLIC ROUTES ---
// Get all found items to display on the page
router.get('/', getLostItems);

// Submit a claim for a specific found item
router.post('/:id/claim', claimItem);

// Namazi reporting an item they lost
router.post('/report-lost', reportLostItem);

router.get('/admin', getAdminItems); 
router.put('/:id/status', updateItemStatus);// <-- NEW: Fetches everything for Imam
router.put('/:id/resolve-claim', resolveClaim);

// --- ADMIN ROUTES ---
// Imam logging a newly found item (upload.single('image') intercepts the picture)
router.post('/report-found', upload.single('image'), reportFoundItem);

export default router;