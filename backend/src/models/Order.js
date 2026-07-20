import mongoose from 'mongoose';

// ─── Order Model ───────────────────────────────────────
const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  image: String,
  size: String,
  color: String,
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, default: 'India' },
    phone: String,
  },
  payment: {
    method: { type: String, default: 'card' },
    cardLast4: String,
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  },
  subtotal: { type: Number, required: true },
  couponCode: String,
  couponDiscount: { type: Number, default: 0 },
  shippingCost: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'confirmed',
  },
  trackingNumber: String,
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
