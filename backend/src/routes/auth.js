import express from 'express';
import { register, login, getMe, updateProfile, addAddress, changePassword } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/address', protect, addAddress);
router.put('/password', protect, changePassword);

export default router;
