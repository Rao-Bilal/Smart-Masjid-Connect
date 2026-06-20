import express from 'express';
import { askFiqhAgent, addFiqhRule } from '../controllers/fiqhAgentController.js';


const router = express.Router();
router.post('/ask', askFiqhAgent);
router.post('/add-rule', addFiqhRule);

export default router;