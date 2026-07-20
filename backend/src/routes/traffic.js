import express from 'express';
import { logPageview, getTrafficStats } from '../controllers/trafficController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/log', logPageview);
router.get('/stats', protect, admin, getTrafficStats);

export default router;
