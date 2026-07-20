import mongoose from 'mongoose';

// ─── Product Model ─────────────────────────────────────
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, default: 'temp' },
  category: { type: String, required: true, enum: ['men', 'women', 'kids', 'accessories'] },
  subcategory: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, default: null },
  discount: { type: Number, default: 0 },
  description: { type: String, required: true },
  details: [String],
  images: [String],
  colors: [String],
  sizes: [String],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  reviewCount: { type: Number, default: 0 },
  reviewAverage: { type: Number, default: 0 },
  badge: { type: String, enum: ['Bestseller', 'New', 'Trending', 'Premium', 'Essential', 'Eco', null], default: null },
  stock: { type: Number, default: 10 },
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

// Create slug from name before saving
productSchema.pre('save', function(next) {
  if (this.slug && !this.isModified('name')) return next();
  this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  next();
});

// Text index for search
productSchema.index({ name: 'text', description: 'text', category: 'text', subcategory: 'text' });

export default mongoose.model('Product', productSchema);
