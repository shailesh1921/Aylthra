import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

// ─── Seed Database ─────────────────────────────────────
// Run: node src/seed.js

const products = [
  {
    name: 'Essential Oxford Shirt', slug: 'essential-oxford-shirt', category: 'men', subcategory: 'shirts',
    price: 89, originalPrice: 120, discount: 26, rating: 4.5, reviewCount: 128,
    colors: ['White', 'Light Blue', 'Navy'], sizes: ['S', 'M', 'L', 'XL'],
    description: 'Crafted from premium cotton with a relaxed fit. The Essential Oxford is your go-to for both casual Fridays and weekend outings.',
    details: ['100% premium cotton', 'Button-down collar', 'Relaxed fit', 'Machine washable'],
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop', 'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=750&fit=crop'],
    badge: 'Bestseller', stock: 45,
  },
  {
    name: 'Tailored Wool Blazer', category: 'men', subcategory: 'outerwear',
    price: 245, discount: 0, rating: 4.8, reviewCount: 76,
    colors: ['Charcoal', 'Navy', 'Camel'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Impeccably tailored from Italian wool blend. A timeless blazer that elevates any outfit.',
    details: ['70% wool, 30% polyester', 'Notch lapel', 'Two-button closure', 'Dry clean only'],
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=750&fit=crop'],
    badge: 'New', stock: 20,
  },
  {
    name: 'Slim Fit Chinos', category: 'men', subcategory: 'trousers',
    price: 79, originalPrice: 95, discount: 17, rating: 4.3, reviewCount: 203,
    colors: ['Beige', 'Olive', 'Black', 'Navy'], sizes: ['28', '30', '32', '34', '36'],
    description: 'Perfectly tailored slim-fit chinos in stretch cotton. Versatile enough for the office.',
    details: ['98% cotton, 2% elastane', 'Slim fit', 'Zip fly with button', 'Machine washable'],
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=750&fit=crop'],
    badge: null, stock: 80,
  },
  {
    name: 'Merino Crew Sweater', category: 'men', subcategory: 'knitwear',
    price: 135, discount: 0, rating: 4.7, reviewCount: 94,
    colors: ['Black', 'Grey', 'Burgundy', 'Forest Green'], sizes: ['S', 'M', 'L', 'XL'],
    description: 'Ultra-soft merino wool crew neck sweater. The perfect layering piece.',
    details: ['100% merino wool', 'Crew neckline', 'Regular fit', 'Hand wash recommended'],
    images: ['https://images.unsplash.com/photo-1638000175091-4b15c1c16419?w=600&h=750&fit=crop'],
    badge: null, stock: 35,
  },
  {
    name: 'Classic White Tee', category: 'men', subcategory: 'tshirts',
    price: 35, discount: 0, rating: 4.6, reviewCount: 342,
    colors: ['White', 'Black', 'Grey', 'Navy'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'The foundation of every wardrobe. Heavyweight organic cotton tee.',
    details: ['100% organic cotton', '200gsm weight', 'Boxy fit', 'Pre-shrunk'],
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop'],
    badge: 'Essential', stock: 200,
  },
  {
    name: 'Leather Chelsea Boots', category: 'men', subcategory: 'shoes',
    price: 289, originalPrice: 340, discount: 15, rating: 4.9, reviewCount: 67,
    colors: ['Black', 'Tan', 'Dark Brown'], sizes: ['40', '41', '42', '43', '44', '45'],
    description: 'Handcrafted from full-grain leather. Built to last and designed to impress.',
    details: ['Full-grain leather upper', 'Leather sole', 'Elastic side panels', 'Made in Portugal'],
    images: ['https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=750&fit=crop'],
    badge: 'Premium', stock: 25,
  },
  {
    name: 'Silk Wrap Blouse', category: 'women', subcategory: 'tops',
    price: 165, discount: 0, rating: 4.7, reviewCount: 89,
    colors: ['Ivory', 'Black', 'Dusty Rose', 'Sage'], sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Flowing silk blouse with a flattering wrap silhouette. Effortlessly elegant.',
    details: ['100% mulberry silk', 'Wrap front closure', 'Relaxed fit', 'Dry clean only'],
    images: ['https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=750&fit=crop'],
    badge: 'New', stock: 30,
  },
  {
    name: 'High-Waist Trousers', category: 'women', subcategory: 'trousers',
    price: 110, originalPrice: 140, discount: 21, rating: 4.4, reviewCount: 156,
    colors: ['Black', 'Camel', 'White', 'Grey'], sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Tailored high-waist trousers with a wide leg. Understated sophistication.',
    details: ['96% wool, 4% elastane', 'High waist', 'Wide leg', 'Side pockets'],
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop'],
    badge: 'Bestseller', stock: 55,
  },
  {
    name: 'Cashmere Turtleneck', category: 'women', subcategory: 'knitwear',
    price: 195, discount: 0, rating: 4.8, reviewCount: 72,
    colors: ['Camel', 'Black', 'Cream', 'Plum'], sizes: ['XS', 'S', 'M', 'L'],
    description: 'Luxuriously soft Mongolian cashmere turtleneck. A wardrobe investment.',
    details: ['100% Grade-A cashmere', 'Turtleneck collar', 'Regular fit', 'Hand wash or dry clean'],
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop'],
    badge: 'Premium', stock: 18,
  },
  {
    name: 'Midi Slip Dress', category: 'women', subcategory: 'dresses',
    price: 145, originalPrice: 175, discount: 17, rating: 4.6, reviewCount: 118,
    colors: ['Champagne', 'Black', 'Emerald', 'Ruby'], sizes: ['XS', 'S', 'M', 'L'],
    description: 'A timeless satin midi slip dress. Cocktail hour to dinner date.',
    details: ['100% satin', 'Adjustable straps', 'Midi length', 'Fully lined'],
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop'],
    badge: null, stock: 40,
  },
  {
    name: 'Oversized Blazer', category: 'women', subcategory: 'outerwear',
    price: 210, discount: 0, rating: 4.5, reviewCount: 93,
    colors: ['Black', 'Tan', 'Powder Blue'], sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'An oversized blazer with strong shoulders. Power dressing, redefined.',
    details: ['Polyester blend', 'Peak lapel', 'Oversized fit', 'Internal pockets'],
    images: ['https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&h=750&fit=crop'],
    badge: 'Trending', stock: 28,
  },
  {
    name: 'Strappy Heeled Sandals', category: 'women', subcategory: 'shoes',
    price: 175, discount: 0, rating: 4.4, reviewCount: 81,
    colors: ['Black', 'Nude', 'Gold'], sizes: ['36', '37', '38', '39', '40', '41'],
    description: 'Elegant strappy sandals with a sculpted heel. The finishing touch.',
    details: ['Leather upper', '85mm heel', 'Leather sole', 'Buckle fastening'],
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=750&fit=crop'],
    badge: null, stock: 35,
  },
  {
    name: 'Leather Crossbody Bag', category: 'accessories', subcategory: 'bags',
    price: 195, discount: 0, rating: 4.6, reviewCount: 104,
    colors: ['Black', 'Tan', 'Burgundy'], sizes: ['One Size'],
    description: 'Compact crossbody bag in vegetable-tanned leather. Your everyday essential.',
    details: ['Vegetable-tanned leather', 'Adjustable strap', 'Interior zip pocket', 'Magnetic closure'],
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop'],
    badge: 'New', stock: 50,
  },
  {
    name: 'Merino Wool Scarf', category: 'accessories', subcategory: 'scarves',
    price: 65, originalPrice: 85, discount: 24, rating: 4.3, reviewCount: 67,
    colors: ['Grey', 'Camel', 'Black', 'Red'], sizes: ['One Size'],
    description: 'Luxuriously soft merino wool scarf. Perfect for cooler months.',
    details: ['100% merino wool', 'Fringe detail', '180cm x 35cm', 'Dry clean recommended'],
    images: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=750&fit=crop'],
    badge: null, stock: 70,
  },
  {
    name: 'Minimal Leather Watch', category: 'accessories', subcategory: 'watches',
    price: 225, discount: 0, rating: 4.8, reviewCount: 91,
    colors: ['Black/Steel', 'Brown/Gold', 'Navy/Steel'], sizes: ['One Size'],
    description: 'Swiss-movement minimal watch with Italian leather strap.',
    details: ['Swiss quartz movement', 'Sapphire crystal', 'Italian leather strap', 'Water resistant 50m'],
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=750&fit=crop'],
    badge: 'Premium', stock: 22,
  },
  {
    name: 'Organic Cotton Hoodie', category: 'kids', subcategory: 'tops',
    price: 49, discount: 0, rating: 4.7, reviewCount: 58,
    colors: ['Grey', 'Navy', 'Olive', 'Rust'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    description: 'Super soft organic cotton hoodie for kids. Durable and comfortable.',
    details: ['100% GOTS certified organic cotton', 'Kangaroo pocket', 'Ribbed cuffs', 'Machine washable'],
    images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=750&fit=crop'],
    badge: 'Eco', stock: 100,
  },
  {
    name: 'Denim Dungarees', category: 'kids', subcategory: 'trousers',
    price: 55, originalPrice: 70, discount: 21, rating: 4.4, reviewCount: 43,
    colors: ['Light Wash', 'Mid Wash', 'Dark Wash'], sizes: ['2-3Y', '3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    description: 'Classic denim dungarees built for adventure. Adjustable straps.',
    details: ['100% cotton denim', 'Adjustable straps', 'Front pocket', 'Machine washable'],
    images: ['https://images.unsplash.com/photo-1543854589-fdd4d3a0d181?w=600&h=750&fit=crop'],
    badge: null, stock: 60,
  },
  {
    name: 'Graphic Print Tee', category: 'kids', subcategory: 'tshirts',
    price: 28, discount: 0, rating: 4.5, reviewCount: 87,
    colors: ['White', 'Black', 'Yellow', 'Coral'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    description: 'Fun graphic tee made from soft organic cotton.',
    details: ['100% organic cotton', 'Screen print design', 'Regular fit', 'Machine washable'],
    images: ['https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=750&fit=crop'],
    badge: null, stock: 120,
  },
  {
    name: 'Canvas Sneakers', category: 'kids', subcategory: 'shoes',
    price: 45, discount: 0, rating: 4.6, reviewCount: 65,
    colors: ['White', 'Navy', 'Red'], sizes: ['28', '30', '32', '34', '36'],
    description: 'Lightweight canvas sneakers with Velcro straps. Perfect for little feet.',
    details: ['Canvas upper', 'Rubber sole', 'Velcro straps', 'Removable insole'],
    images: ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=750&fit=crop'],
    badge: null, stock: 90,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');

    // Create default admin user
    await User.create({
      name: 'Admin Aylthra',
      email: 'admin@aylthra.com',
      password: 'adminpassword',
      role: 'admin',
    });
    console.log('👤 Seeded default admin user (admin@aylthra.com / adminpassword)');

    // Insert products one by one (triggers pre-save middleware for slug)
    for (const product of products) {
      await Product.create(product);
    }
    console.log(`✅ Seeded ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
