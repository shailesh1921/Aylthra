import Order from '../models/Order.js';

// ─── Order Controller ──────────────────────────────────

// Coupon system
const coupons = {
  'WELCOME10': { discount: 10, type: 'percent', minOrder: 50 },
  'AYLTHRA20': { discount: 20, type: 'percent', minOrder: 100 },
  'FLAT15':    { discount: 15, type: 'fixed',  minOrder: 75 },
  'SUMMER25':  { discount: 25, type: 'percent', minOrder: 150 },
  'FREE50':    { discount: 50, type: 'fixed',  minOrder: 200 },
};

// POST /api/orders — Create order
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, payment, couponCode } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }
    if (!shippingAddress) {
      return res.status(400).json({ success: false, message: 'Shipping address required' });
    }

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Apply coupon
    let couponDiscount = 0;
    if (couponCode) {
      const coupon = coupons[couponCode.toUpperCase()];
      if (coupon) {
        if (subtotal >= coupon.minOrder) {
          couponDiscount = coupon.type === 'percent'
            ? Math.round(subtotal * coupon.discount / 100)
            : Math.min(coupon.discount, subtotal);
        }
      }
    }

    const shippingCost = subtotal > 150 ? 0 : 12;
    const total = Math.max(0, subtotal - couponDiscount + shippingCost);

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      payment: {
        method: payment?.method || 'card',
        cardLast4: payment?.cardLast4 || '0000',
        status: 'completed',
      },
      subtotal,
      couponCode: couponCode?.toUpperCase() || null,
      couponDiscount,
      shippingCost,
      total,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/orders — Get user's orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/orders/:id — Get single order
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/orders/coupon/validate — Validate coupon
export const validateCoupon = async (req, res) => {
  try {
    const { code, subtotal } = req.body;
    const coupon = coupons[code?.toUpperCase()];

    if (!coupon) {
      return res.json({ success: false, valid: false, message: 'Invalid coupon code' });
    }
    if (subtotal < coupon.minOrder) {
      return res.json({ success: false, valid: false, message: `Minimum order $${coupon.minOrder} required` });
    }

    const discount = coupon.type === 'percent'
      ? Math.round(subtotal * coupon.discount / 100)
      : Math.min(coupon.discount, subtotal);

    res.json({
      success: true,
      valid: true,
      coupon: { code: code.toUpperCase(), discount, description: `${coupon.discount}${coupon.type === 'percent' ? '%' : ''} off` },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/orders/admin/list — Get all store orders (admin only)
export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/orders/admin/:id/status — Update order status (admin only)
export const updateOrderStatusAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
