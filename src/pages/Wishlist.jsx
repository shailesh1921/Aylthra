import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';

// ─── Wishlist Page ─────────────────────────────────────
export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl lg:text-4xl font-heading mb-2">Wishlist</h1>
      <p className="text-sm text-brand-gray mb-10">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto mb-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className="text-xl font-heading mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-brand-gray mb-6">Save items you love for later.</p>
          <Link to="/shop" className="btn-primary inline-block">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          <AnimatePresence>
            {wishlist.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative overflow-hidden rounded-lg bg-brand-light aspect-[3/4] mb-4">
                    {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                </Link>
                <div className="px-1">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1">{product.category}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-body font-medium text-sm text-brand-dark mb-1">{product.name}</h3>
                  </Link>
                  <p className="font-semibold text-sm">${product.price}</p>
                </div>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-brand-gray hover:text-red-500 transition-colors shadow-sm"
                  aria-label="Remove"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
