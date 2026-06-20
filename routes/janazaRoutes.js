import express from 'express';
import { getActiveJanazas, 
    volunteerForJanaza,
    createJanaza, 
  deleteJanaza, 
  updateJanazaStatus } from '../controllers/janazaController.js';

const router = express.Router();

router.get('/', getActiveJanazas);
router.post('/:id/volunteer', volunteerForJanaza);
router.post('/', createJanaza);
router.delete('/:id', deleteJanaza);
router.put('/:id/status', updateJanazaStatus);

export default router;