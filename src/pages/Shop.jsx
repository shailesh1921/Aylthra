import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';

// ─── Shop Page ─────────────────────────────────────────
const CATEGORIES = ['all', 'men', 'women', 'kids', 'accessories'];
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Top Rated', value: 'rating' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilters, setMobileFilters] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get filters from URL
  const category = searchParams.get('category') || 'all';
  const search = searchParams.get('search') || '';
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

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

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...productsList];

    // Category filter
    if (category !== 'all') {
      result = result.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.subcategory?.toLowerCase().includes(q)
      );
    }

    // Price filter
    result = result.filter(p => Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1]);

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes?.some(s => selectedSizes.includes(s)));
    }

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors?.some(c => selectedColors.includes(c)));
    }

    // Sort
    switch (sortBy) {
      case 'price_asc': result.sort((a, b) => Number(a.price) - Number(b.price)); break;
      case 'price_desc': result.sort((a, b) => Number(b.price) - Number(a.price)); break;
      case 'newest': result.sort((a, b) => Number(b.id) - Number(a.id)); break;
      case 'rating': result.sort((a, b) => Number(b.rating) - Number(a.rating)); break;
      default: break;
    }

    return result;
  }, [productsList, category, search, sortBy, priceRange, selectedSizes, selectedColors]);

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') params.delete('category');
    else params.set('category', cat);
    setSearchParams(params);
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const toggleColor = (color) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const clearFilters = () => {
    setCategory('all');
    setSearchParams({});
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 5000]);
    setSortBy('featured');
  };

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`block w-full text-left text-sm capitalize py-1.5 transition-colors ${
                category === cat ? 'text-brand-accent font-medium' : 'text-brand-dark hover:text-brand-accent'
              }`}
            >
              {cat} <span className="text-brand-gray text-xs ml-1">
                ({cat === 'all' ? productsList.length : productsList.filter(p => p.category?.toLowerCase() === cat.toLowerCase()).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={e => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-brand-accent"
          />
          <p className="text-sm text-brand-gray">Up to ₹{priceRange[1]}</p>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1.5 text-xs border rounded-sm transition-all ${
                selectedSizes.includes(size)
                  ? 'border-brand-black bg-brand-black text-white'
                  : 'border-gray-200 hover:border-brand-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4">Color</h3>
        <div className="flex flex-wrap gap-2">
          {['Black', 'White', 'Navy', 'Grey', 'Beige', 'Camel', 'Red', 'Green'].map(color => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={`px-3 py-1.5 text-xs border rounded-sm transition-all ${
                selectedColors.includes(color)
                  ? 'border-brand-black bg-brand-black text-white'
                  : 'border-gray-200 hover:border-brand-black'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      <button onClick={clearFilters} className="text-xs text-brand-gray underline hover:text-brand-dark transition-colors">
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl lg:text-4xl font-heading mb-2">
          {search ? `Results for "${search}"` : category === 'all' ? 'All Products' : `${category.charAt(0).toUpperCase() + category.slice(1)}`}
        </motion.h1>
        <p className="text-sm text-brand-gray">{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <FilterSidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort Bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <button
              onClick={() => setMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
            <div className="flex items-center gap-3 ml-auto">
              <label className="text-xs text-brand-gray hidden sm:block">Sort by:</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-sm bg-transparent border border-gray-200 rounded-lg px-3 py-2 focus:border-brand-accent cursor-pointer"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg font-heading mb-2">No products found</p>
              <p className="text-sm text-brand-gray mb-6">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="btn-primary">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilters && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileFilters(false)} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 w-80 h-full bg-white z-50 lg:hidden shadow-2xl p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-heading font-bold tracking-wider">Filters</h3>
              <button onClick={() => setMobileFilters(false)} className="p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterSidebar />
          </motion.div>
        </>
      )}
    </div>
  );
}
