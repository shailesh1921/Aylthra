import Product from '../models/Product.js';

// ─── Product Controller ────────────────────────────────

// GET /api/products — List all products with filtering
export const getProducts = async (req, res) => {
  try {
    const {
      category, subcategory, search, sort,
      minPrice, maxPrice, color, size,
      badge, page = 1, limit = 20,
    } = req.query;

    let query = { inStock: true };

    // Filters
    if (category && category !== 'all') query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (badge) query.badge = badge;
    if (color) query.colors = color;
    if (size) query.sizes = size;

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    // Sorting
    let sortOption = {};
    switch (sort) {
      case 'price_asc': sortOption = { price: 1 }; break;
      case 'price_desc': sortOption = { price: -1 }; break;
      case 'newest': sortOption = { createdAt: -1 }; break;
      case 'rating': sortOption = { reviewAverage: -1 }; break;
      default: sortOption = { createdAt: -1 };
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/products/:id — Get single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Get related products
    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4).sort({ createdAt: -1 });

    res.json({ success: true, product, related });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/products — Create product (admin only)
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/products/:id — Update product (admin only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/products/:id — Delete product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/products/categories/list — Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    const subcategories = {};
    for (const cat of categories) {
      subcategories[cat] = await Product.distinct('subcategory', { category: cat });
    }
    res.json({ success: true, categories, subcategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
