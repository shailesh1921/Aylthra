import Review from '../models/Review.js';
import Product from '../models/Product.js';

// ─── Review Controller ─────────────────────────────────

// GET /api/reviews/product/:productId
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/reviews — Create review
export const createReview = async (req, res) => {
  try {
    const { product: productId, rating, title, text } = req.body;

    // Check for existing review
    const existing = await Review.findOne({ product: productId, user: req.user._id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You already reviewed this product' });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating,
      title,
      text,
    });

    // Update product review stats
    const allReviews = await Review.find({ product: productId });
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await Product.findByIdAndUpdate(productId, {
      reviewCount: allReviews.length,
      reviewAverage: Math.round(avg * 10) / 10,
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Recalculate product average
    const allReviews = await Review.find({ product: review.product });
    const avg = allReviews.length > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      : 0;

    await Product.findByIdAndUpdate(review.product, {
      reviewCount: allReviews.length,
      reviewAverage: Math.round(avg * 10) / 10,
    });

    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
