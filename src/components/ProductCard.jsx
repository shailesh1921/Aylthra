import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';

// ─── Product Card ──────────────────────────────────────
export default function ProductCard({ product, index = 0 }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg bg-brand-light aspect-[3/4] mb-4 product-image-wrapper">
          {/* Discount Badge */}
          {product.discount > 0 && (
            <span className="discount-badge">-{product.discount}%</span>
          )}

          {/* Category Badge */}
          {product.badge && (
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand-dark text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-sm z-10">
              {product.badge}
            </span>
          )}

          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-image w-full h-full object-cover"
            loading="lazy"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

          {/* Quick View */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          >
            <span className="block w-full bg-white text-brand-dark text-center text-xs tracking-widest uppercase py-3 font-semibold rounded-sm hover:bg-brand-black hover:text-white transition-colors">
              Quick View
            </span>
          </motion.div>
        </div>
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          wishlisted ? 'bg-brand-accent text-white' : 'bg-white/90 text-brand-dark hover:bg-brand-accent hover:text-white'
        }`}
        style={{ position: 'relative', float: 'right', marginTop: '-56px', marginRight: '12px' }}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Product Info */}
      <div className="px-1">
        <p className="text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-body font-medium text-sm text-brand-dark mb-1.5 group-hover:text-brand-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mb-2">
          {/* Star rating */}
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-brand-accent' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] text-brand-gray">({product.reviews})</span>
        </div>
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-body font-semibold text-brand-dark">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-brand-gray line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
