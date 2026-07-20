import express from 'express';
import {
  createOrder, getOrders, getOrder, validateCoupon,
  getAllOrdersAdmin, updateOrderStatusAdmin,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/coupon/validate', validateCoupon);
router.get('/admin/list', protect, admin, getAllOrdersAdmin);
router.put('/admin/:id/status', protect, admin, updateOrderStatusAdmin);
router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);

export default router;
