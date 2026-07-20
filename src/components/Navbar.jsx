import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

// ─── Navbar ────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setSearchOpen(false); }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/shop?category=men', label: 'Men' },
    { to: '/shop?category=women', label: 'Women' },
    { to: '/shop?category=kids', label: 'Kids' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Promo Banner */}
      <div className="bg-brand-black text-white text-center py-2 text-xs tracking-widest font-body">
        FREE SHIPPING ON ORDERS OVER $150 &nbsp;|&nbsp; USE CODE <span className="text-brand-accent font-semibold">WELCOME10</span> FOR 10% OFF
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 -ml-2" aria-label="Menu">
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-brand-black transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-brand-black transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-brand-black transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>

            {/* Logo */}
            <Link to="/" className="text-2xl lg:text-3xl font-heading font-bold tracking-[0.2em] text-brand-black">
              AYLTHRA
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200 hover:text-brand-accent ${
                    location.pathname === link.to ? 'text-brand-accent' : 'text-brand-dark'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search */}
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:text-brand-accent transition-colors" aria-label="Search">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="p-2 hover:text-brand-accent transition-colors relative" aria-label="Wishlist">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* User */}
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/account" className="p-2 hover:text-brand-accent transition-colors" aria-label="Account">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <Link to="/login" className="p-2 hover:text-brand-accent transition-colors hidden sm:block" aria-label="Login">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}

              {/* Cart */}
              <Link to="/cart" className="p-2 hover:text-brand-accent transition-colors relative" aria-label="Cart">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-4">
                <form onSubmit={e => { e.preventDefault(); if(searchQuery.trim()) window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`; setSearchOpen(false); }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-brand-light rounded-lg px-4 py-3 text-sm font-body focus:ring-2 focus:ring-brand-accent"
                    autoFocus
                  />
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 w-80 h-full bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-heading font-bold tracking-[0.2em]">AYLTHRA</span>
                  <button onClick={() => setMobileOpen(false)} className="p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  {navLinks.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`py-3 px-3 text-sm tracking-[0.15em] uppercase font-medium rounded-lg transition-colors ${
                        location.pathname === link.to ? 'bg-brand-light text-brand-accent' : 'hover:bg-brand-light'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="my-3 border-gray-100" />
                  {isAuthenticated ? (
                    <>
                      <Link to="/account" className="py-3 px-3 text-sm tracking-[0.15em] uppercase hover:bg-brand-light rounded-lg">
                        My Account
                      </Link>
                      <button onClick={logout} className="py-3 px-3 text-sm tracking-[0.15em] uppercase text-brand-gray hover:bg-brand-light rounded-lg text-left">
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link to="/login" className="py-3 px-3 text-sm tracking-[0.15em] uppercase hover:bg-brand-light rounded-lg">
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
