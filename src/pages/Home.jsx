import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { collections } from '../data/products';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';

// ─── Home Page ─────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } })
};

export default function Home() {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        if (error) throw error;
        setProductsList(data || []);
      } catch (err) {
        console.error('Error fetching products:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const trendingProducts = productsList.filter(p => p.badge === 'Bestseller' || p.badge === 'Trending' || Number(p.rating) >= 4.7);
  const newArrivals = productsList.filter(p => p.badge === 'New');
  const mensPicks = productsList.filter(p => p.category?.toLowerCase() === 'men').slice(0, 4);
  const womensPicks = productsList.filter(p => p.category?.toLowerCase() === 'women').slice(0, 4);

  return (
    <div className="page-enter">
      {/* ── Hero Section ──────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-brand-black">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&h=900&fit=crop"
          alt="AYLTHRA Collection"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 text-brand-accent"
          >
            New Collection 2026
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 max-w-4xl leading-tight"
          >
            Redefine Your
            <br />
            <em className="font-normal">Style</em>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-sm sm:text-base text-gray-300 mb-8 max-w-lg"
          >
            Discover curated collections of premium clothing designed for the modern individual.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex gap-4"
          >
            <Link to="/shop" className="bg-white text-brand-black px-8 py-3.5 text-xs tracking-widest uppercase font-semibold hover:bg-brand-accent hover:text-white transition-all duration-300">
              Shop Now
            </Link>
            <Link to="/about" className="border-2 border-white text-white px-8 py-3.5 text-xs tracking-widest uppercase font-semibold hover:bg-white hover:text-brand-black transition-all duration-300">
              Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Category Cards ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            { name: 'Men', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&h=600&fit=crop', link: '/shop?category=men' },
            { name: 'Women', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&h=600&fit=crop', link: '/shop?category=women' },
            { name: 'Kids', image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&h=600&fit=crop', link: '/shop?category=kids' },
            { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop', link: '/shop?category=accessories' },
          ].map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={cat.link} className="group relative block aspect-[3/4] overflow-hidden rounded-lg">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg sm:text-xl tracking-[0.2em] uppercase font-heading">{cat.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Collections Banner ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to="/shop" className="group relative block h-72 overflow-hidden rounded-lg">
                <img src={col.image} alt={col.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-heading mb-1">{col.title}</h3>
                  <p className="text-gray-300 text-sm">{col.subtitle}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Trending Products ────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-brand-accent mb-2">Curated For You</p>
              <h2 className="text-3xl lg:text-4xl font-heading">Trending Now</h2>
            </div>
            <Link to="/shop" className="hidden sm:block text-sm tracking-wider uppercase text-brand-dark hover:text-brand-accent transition-colors font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {trendingProducts.slice(0, 8).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <Link to="/shop" className="sm:hidden block text-center mt-8 text-sm tracking-wider uppercase font-medium hover:text-brand-accent transition-colors">
            View All Products →
          </Link>
        </div>
      </section>

      {/* ── Split Banner ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Men's Edit */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/shop?category=men" className="group relative block h-96 lg:h-[500px] overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&h=600&fit=crop" alt="Men's Collection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                <h3 className="text-white text-3xl lg:text-4xl font-heading mb-2">Men's Edit</h3>
                <p className="text-gray-300 text-sm mb-4">Tailored essentials for the modern man</p>
                <span className="inline-block border-b-2 border-white text-white text-xs tracking-widest uppercase pb-1 group-hover:border-brand-accent group-hover:text-brand-accent transition-colors">
                  Shop Men →
                </span>
              </div>
            </Link>
          </motion.div>
          {/* Women's Edit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/shop?category=women" className="group relative block h-96 lg:h-[500px] overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop" alt="Women's Collection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                <h3 className="text-white text-3xl lg:text-4xl font-heading mb-2">Women's Edit</h3>
                <p className="text-gray-300 text-sm mb-4">Effortless elegance for every occasion</p>
                <span className="inline-block border-b-2 border-white text-white text-xs tracking-widest uppercase pb-1 group-hover:border-brand-accent group-hover:text-brand-accent transition-colors">
                  Shop Women →
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $150' },
              { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
              { icon: '🔒', title: 'Secure Payment', desc: '100% protected checkout' },
              { icon: '💬', title: '24/7 Support', desc: 'We\'re here to help' },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="text-3xl mb-4 block">{feat.icon}</span>
                <h4 className="font-body font-semibold text-sm mb-1">{feat.title}</h4>
                <p className="text-brand-gray text-xs">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ───────────────────────────── */}
      <section className="bg-brand-black py-20">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-heading text-white mb-4">Stay In The Loop</h2>
          <p className="text-gray-400 text-sm mb-8">Subscribe for exclusive access to new collections, sales, and style inspiration.</p>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-brand-accent transition-colors"
            />
            <button type="submit" className="bg-brand-accent text-white px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:bg-brand-accent-hover transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
