import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { supabase } from '../lib/supabase';

// ─── Product Page ──────────────────────────────────────
export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        // Fetch current product
        const { data: prodData, error: prodErr } = await supabase
          .from('products')
          .select('*')
          .eq('id', parseInt(id))
          .single();
        
        if (prodErr) throw prodErr;
        setProduct(prodData);

        // Fetch related products
        if (prodData) {
          const { data: relData } = await supabase
            .from('products')
            .select('*')
            .eq('category', prodData.category)
            .neq('id', prodData.id)
            .limit(4);
          setRelatedProducts(relData || []);
        }
      } catch (err) {
        console.error('Error fetching product:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-brand-gray text-sm">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-heading mb-4">Product Not Found</h1>
        <Link to="/shop" className="btn-primary inline-block">Back to Shop</Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addItem(product, selectedSize, selectedColor || product.colors[0], quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Mock reviews
  const reviews = [
    { name: 'Alex M.', rating: 5, date: '2 days ago', text: 'Absolutely love this piece. The quality is exceptional and it fits perfectly.' },
    { name: 'Sarah K.', rating: 4, date: '1 week ago', text: 'Great quality for the price. Slightly longer than expected but overall very happy.' },
    { name: 'James R.', rating: 5, date: '2 weeks ago', text: 'This is my second purchase from AYLTHRA and they never disappoint. Highly recommend.' },
  ];

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-xs text-brand-gray">
          <Link to="/" className="hover:text-brand-dark">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-brand-dark">Shop</Link>
          <span className="mx-2">/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-brand-dark capitalize">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-dark">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div>
            <div className="relative overflow-hidden rounded-lg bg-brand-light aspect-[3/4] mb-4">
              {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
              {product.badge && (
                <span className="absolute top-3 right-3 bg-white/90 text-brand-dark text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-sm z-10">
                  {product.badge}
                </span>
              )}
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-brand-black' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-xs tracking-[0.2em] uppercase text-brand-accent mb-2">{product.category} — {product.subcategory}</p>
              <h1 className="text-3xl lg:text-4xl font-heading mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-brand-accent' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-brand-gray">{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-2xl font-semibold">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-brand-gray line-through">${product.originalPrice}</span>
                    <span className="text-sm text-red-500 font-medium">Save ${product.originalPrice - product.price}</span>
                  </>
                )}
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">
                  Color: <span className="text-brand-gray font-normal">{selectedColor || product.colors[0]}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs border rounded-sm transition-all ${
                        (selectedColor || product.colors[0]) === color
                          ? 'border-brand-black bg-brand-black text-white'
                          : 'border-gray-200 hover:border-brand-black'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">Size</p>
                  <button className="text-xs text-brand-accent underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-10 text-xs border rounded-sm transition-all ${
                        selectedSize === size
                          ? 'border-brand-black bg-brand-black text-white'
                          : 'border-gray-200 hover:border-brand-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Actions */}
              <div className="flex gap-3 mb-6">
                <div className="flex items-center border border-gray-200 rounded-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-12 flex items-center justify-center text-lg hover:bg-brand-light transition-colors">−</button>
                  <span className="w-12 h-12 flex items-center justify-center text-sm font-medium border-x border-gray-200">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-12 flex items-center justify-center text-lg hover:bg-brand-light transition-colors">+</button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded-sm ${
                    added
                      ? 'bg-green-500 text-white'
                      : 'bg-brand-black text-white hover:bg-brand-accent'
                  }`}
                >
                  {added ? '✓ Added to Cart' : 'Add to Cart'}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-12 h-12 border rounded-sm flex items-center justify-center transition-all ${
                    wishlisted ? 'border-brand-accent bg-brand-accent text-white' : 'border-gray-200 hover:border-brand-accent'
                  }`}
                  aria-label="Wishlist"
                >
                  <svg className="w-5 h-5" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Shipping info */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                {[
                  { icon: '🚚', text: 'Free shipping on orders over $150' },
                  { icon: '↩️', text: 'Free 30-day returns' },
                  { icon: '🔒', text: 'Secure checkout guaranteed' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-brand-gray">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs: Description / Details / Reviews */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            {['description', 'details', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm capitalize tracking-wider transition-colors border-b-2 ${
                  activeTab === tab ? 'border-brand-black text-brand-dark font-medium' : 'border-transparent text-brand-gray hover:text-brand-dark'
                }`}
              >
                {tab} {tab === 'reviews' && `(${product.reviews})`}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <p className="text-brand-dark leading-relaxed">{product.description}</p>
            </motion.div>
          )}

          {activeTab === 'details' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <svg className="w-4 h-4 text-brand-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-6">
              {reviews.map((review, i) => (
                <div key={i} className="border-b border-gray-100 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-sm">{review.name}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <svg key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'text-brand-accent' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-brand-gray">{review.date}</span>
                  </div>
                  <p className="text-sm text-brand-gray leading-relaxed">{review.text}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-heading mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
