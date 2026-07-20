import mongoose from 'mongoose';

// ─── Traffic Model ─────────────────────────────────────
const trafficSchema = new mongoose.Schema({
  path: { type: String, required: true },
  ip: { type: String },
  userAgent: { type: String },
  referrer: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

// Indexing for faster aggregation on timestamp and path
trafficSchema.index({ timestamp: -1 });
trafficSchema.index({ path: 1 });

export default mongoose.model('Traffic', trafficSchema);
