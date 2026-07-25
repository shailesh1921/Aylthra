import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Bookmark, Sparkles, Send, Paperclip, 
  Search, ArrowRight, Bell, User, Sliders, 
  ArrowLeft, ShoppingBag, Check, Star 
} from 'lucide-react';

// ─── CSS Variables & Styling Tokens ────────────────────
const STYLE_TOKENS = {
  bgFrom: 'var(--aylthra-hero-bg-from, #fdeceb)',       // blush pink
  bgVia: 'var(--aylthra-hero-bg-via, #fdf8f4)',        // warm cream
  bgTo: 'var(--aylthra-hero-bg-to, #f7ded3)',          // light terracotta
  accent: 'var(--aylthra-hero-accent, #c9a96e)',        // gold/champagne accent
  accentHover: 'var(--aylthra-hero-accent-hover, #b8944f)',
  dark: '#1a1a1a',
  gray: '#6b7280',
  light: '#f5f5f5',
};

// Custom keyframes style block to inject directly
const ANIMATIONS_CSS = `
  @keyframes float-slow {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0px); }
  }
  @keyframes float-delayed {
    0% { transform: translateY(0px); }
    50% { transform: translateY(12px); }
    100% { transform: translateY(0px); }
  }
  @keyframes fade-in-up {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes ripple {
    0% { transform: scale(0.95); opacity: 0.5; }
    50% { transform: scale(1.05); opacity: 0.8; }
    100% { transform: scale(0.95); opacity: 0.5; }
  }
  .animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
  }
  .animate-float-delayed {
    animation: float-delayed 6.5s ease-in-out infinite;
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-ripple {
    animation: ripple 3s ease-in-out infinite;
  }
`;

export default function Hero() {
  const [activeScreen, setActiveScreen] = useState('feed'); // 'feed' (Screen 1) or 'detail' (Screen 2)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('beige');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Lazy load image state helper
  const [imgLoaded, setImgLoaded] = useState({
    blazer: false,
    coat: false,
    dress: false,
  });

  const handleImageLoad = (key) => {
    setImgLoaded(prev => ({ ...prev, [key]: true }));
  };

  return (
    <div 
      style={{
        background: `linear-gradient(135deg, ${STYLE_TOKENS.bgFrom} 0%, ${STYLE_TOKENS.bgVia} 50%, ${STYLE_TOKENS.bgTo} 100%)`,
        fontFamily: "'Inter', sans-serif"
      }}
      className="relative w-full min-h-screen overflow-hidden py-6 sm:py-8 px-4 sm:px-8 lg:px-16 flex flex-col justify-between"
    >
      {/* Injecting CSS Animations */}
      <style dangerouslySetInnerHTML={{ __html: ANIMATIONS_CSS }} />

      {/* Repeating Tactile Dot Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none z-[1]"
        style={{
          backgroundImage: 'radial-gradient(#1a1a1a 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Large Oversized Background Watermark */}
      <div 
        style={{
          fontFamily: "'Anton', sans-serif",
          letterSpacing: '-0.02em',
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[2] text-[#1a1a1a]/[0.02] text-[18vw] font-black uppercase whitespace-nowrap"
      >
        AYLTHRA
      </div>

      {/* ── TOP BAR ── */}
      <header className="relative w-full flex items-center justify-between z-[20] border-b border-black/[0.05] pb-4 animate-fade-in-up">
        {/* Left Side branding */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1a1a1a] flex items-center justify-center rounded-lg shadow-md hover:bg-black/90 transition-colors">
              <span className="text-white font-bold text-sm tracking-wider">A</span>
            </div>
            <span 
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-xl sm:text-2xl font-bold tracking-[0.1em] text-[#1a1a1a] hover:text-[#c9a96e] transition-colors"
            >
              AYLTHRA
            </span>
          </Link>

          {/* Status badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#eaf7ee] px-2.5 py-1 rounded-full border border-[#cbeed4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] animate-ripple" />
            <span className="text-[10px] uppercase font-bold text-[#1e7e34] tracking-wider">Shop Live</span>
          </div>

          {/* Minimal Interaction Tags */}
          <div className="hidden md:flex items-center gap-1 ml-4 border-l border-black/10 pl-4">
            <button 
              onClick={() => setIsLiked(!isLiked)} 
              className={`p-2 rounded-full hover:bg-black/5 transition-colors ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
              aria-label="Like Brand"
            >
              <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)} 
              className={`p-2 rounded-full hover:bg-black/5 transition-colors ${isBookmarked ? 'text-[#c9a96e]' : 'text-gray-500'}`}
              aria-label="Bookmark Brand"
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Right Side CTA */}
        <Link 
          to="/shop" 
          style={{ backgroundColor: STYLE_TOKENS.dark }}
          className="px-6 py-2.5 rounded-full text-white text-xs font-semibold tracking-wider uppercase hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md flex items-center gap-2"
        >
          <span>Shop Collection</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* ── HERO CORE LAYOUT ── */}
      <main className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-8 sm:my-12 z-[10] flex-1">
        
        {/* ================= LEFT FLOATING CARD (Layered Behind) ================= */}
        <div className="lg:col-span-3 hidden lg:flex flex-col items-end justify-center animate-float-delayed z-[5]">
          <div 
            className="w-full max-w-[240px] rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md border border-white/50 shadow-lg rotate-[2deg] opacity-75 hover:opacity-95 hover:scale-105 hover:-rotate-[1deg] hover:shadow-2xl transition-all duration-500 group select-none pointer-events-auto"
          >
            {/* Image Box */}
            <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden">
              {/* Blur-up placeholder */}
              {!imgLoaded.dress && (
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ead7d7] to-[#ebdbe5] animate-pulse" />
              )}
              <img 
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=650&fit=crop" 
                alt="Floral Summer Dress"
                onLoad={() => handleImageLoad('dress')}
                className={`w-full h-full object-cover transition-opacity duration-700 ${imgLoaded.dress ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
              />
              <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm text-black">
                Trending
              </span>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-white/40">
              <h4 className="text-xs font-semibold tracking-wide uppercase text-[#1a1a1a]">Floral Summer Dress</h4>
              <p className="text-xs text-brand-gray mt-1">Sizes XS–L • 1 Color</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs font-bold text-[#1a1a1a]">₹1,599</span>
                <span className="text-[10px] text-gray-500 border border-gray-200 rounded px-1.5 py-0.5 bg-white/50 font-medium">Free Return</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CENTER: PHONE MOCKUP (Focal Point) ================= */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center animate-fade-in-up">
          
          {/* Screen mode selector pills */}
          <div className="flex bg-black/[0.04] p-1 rounded-full border border-black/5 mb-6 z-[30]">
            <button 
              onClick={() => setActiveScreen('feed')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeScreen === 'feed' 
                  ? 'bg-white text-[#1a1a1a] shadow-sm' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Arrivals Feed
            </button>
            <button 
              onClick={() => setActiveScreen('detail')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeScreen === 'detail' 
                  ? 'bg-white text-[#1a1a1a] shadow-sm' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Product view
            </button>
          </div>

          {/* Device Wrapper */}
          <div 
            onClick={() => setActiveScreen(prev => prev === 'feed' ? 'detail' : 'feed')}
            className="relative w-full max-w-[310px] sm:max-w-[330px] aspect-[9/18.5] bg-[#1a1a1a] rounded-[48px] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-4 border-[#2b2b2b] cursor-pointer hover:scale-[1.03] rotate-[-1.5deg] hover:rotate-0 hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.4)] transition-all duration-500 group select-none"
          >
            {/* Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-[30] flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-[#111] border border-gray-900 mr-2" />
              <span className="w-12 h-1 bg-[#222] rounded-full" />
            </div>

            {/* Side Buttons (Visual mock) */}
            <div className="absolute -left-[6px] top-28 w-[2.5px] h-10 bg-[#333] rounded-r" />
            <div className="absolute -left-[6px] top-40 w-[2.5px] h-12 bg-[#333] rounded-r" />
            <div className="absolute -left-[6px] top-56 w-[2.5px] h-12 bg-[#333] rounded-r" />
            <div className="absolute -right-[6px] top-36 w-[2.5px] h-16 bg-[#333] rounded-l" />

            {/* Screen Inner Glass */}
            <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-white flex flex-col justify-between">
              
              {/* Glass Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 pointer-events-none z-[25]" />

              {/* ───────────────── SCREEN 1: NEW ARRIVALS FEED ───────────────── */}
              {activeScreen === 'feed' ? (
                <div className="w-full h-full flex flex-col justify-between overflow-y-auto px-4 pt-8 pb-4 scrollbar-none">
                  
                  {/* Mock Screen Header */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                    <h3 className="text-sm font-bold tracking-tight text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      New Arrivals
                    </h3>
                    <div className="flex gap-2.5 text-gray-700">
                      <Bell className="w-4 h-4 hover:text-[#c9a96e] transition-colors" />
                      <User className="w-4 h-4 hover:text-[#c9a96e] transition-colors" />
                    </div>
                  </div>

                  {/* Search and Filters Bar */}
                  <div className="flex gap-2 mb-3">
                    <div className="flex-1 bg-gray-100 rounded-lg flex items-center px-2.5 py-1.5 border border-gray-200">
                      <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
                      <input 
                        type="text" 
                        placeholder="Search items..." 
                        disabled
                        className="bg-transparent text-xs w-full outline-none text-gray-700 placeholder-gray-400 font-normal"
                      />
                    </div>
                    <button className="p-2 bg-gray-100 rounded-lg border border-gray-200 text-[#1a1a1a]">
                      <Sliders className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Scrollable feed products */}
                  <div className="space-y-3 flex-1 overflow-y-auto scrollbar-none pr-[1px]">
                    
                    {/* Card 1: Linen Blazer */}
                    <div className="rounded-xl overflow-hidden border border-gray-100 bg-[#fafafa] hover:shadow-md transition-all duration-300 group/card">
                      <div className="relative aspect-[4/3] bg-gray-200">
                        {!imgLoaded.blazer && (
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#ead7d7] to-[#ebdbe5] animate-pulse" />
                        )}
                        <img 
                          src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=450&h=338&fit=crop" 
                          alt="Linen Casual Blazer"
                          onLoad={() => handleImageLoad('blazer')}
                          className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded.blazer ? 'opacity-100' : 'opacity-0'}`}
                          loading="lazy"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-[#1a1a1a] text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                          New
                        </span>
                      </div>
                      <div className="p-3">
                        <h4 className="text-xs font-bold text-gray-900 group-hover/card:text-[#c9a96e] transition-colors">Linen Casual Blazer</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs font-bold text-gray-900">₹2,999</span>
                          <span className="text-[9px] text-gray-500 font-medium">Sizes M–XL • 3 Colors</span>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Beige Trench Coat */}
                    <div className="rounded-xl overflow-hidden border border-gray-100 bg-[#fafafa] hover:shadow-md transition-all duration-300 group/card">
                      <div className="relative aspect-[4/3] bg-gray-200">
                        {!imgLoaded.coat && (
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#ead7d7] to-[#ebdbe5] animate-pulse" />
                        )}
                        <img 
                          src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=450&h=338&fit=crop" 
                          alt="Beige Trench Coat"
                          onLoad={() => handleImageLoad('coat')}
                          className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded.coat ? 'opacity-100' : 'opacity-0'}`}
                          loading="lazy"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-[#c9a96e] text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                          Trending
                        </span>
                      </div>
                      <div className="p-3">
                        <h4 className="text-xs font-bold text-gray-900 group-hover/card:text-[#c9a96e] transition-colors">Beige Trench Coat</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs font-bold text-gray-900">₹3,499</span>
                          <span className="text-[9px] text-gray-500 font-medium">Sizes S–L • Free Return</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                /* ───────────────── SCREEN 2: PRODUCT DETAIL SCREEN ───────────────── */
                <div className="w-full h-full flex flex-col justify-between pt-8 pb-3 bg-white relative">
                  
                  {/* Product Header / Back control */}
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveScreen('feed'); }}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 text-gray-700" />
                    </button>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">Couture Detail</span>
                    <ShoppingBag className="w-4 h-4 text-gray-700 hover:text-[#c9a96e] transition-colors" />
                  </div>

                  {/* Content Container */}
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-none">
                    {/* Big Image Showcase */}
                    <div className="relative aspect-[3/3.2] bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                      <img 
                        src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=530&fit=crop" 
                        alt="Linen Blazer Detail"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 right-3 bg-[#eaf7ee] text-[#1e7e34] border border-[#cbeed4] text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                        In Stock
                      </span>
                    </div>

                    {/* Name & price metadata */}
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-base font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                          Linen Casual Blazer
                        </h4>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-bold text-gray-900">4.8</span>
                        </div>
                      </div>
                      <p className="text-xs text-brand-gray mt-0.5">Premium tailored collection</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-base font-bold text-gray-900">₹2,999</span>
                        <span className="text-xs text-gray-400 line-through">₹3,499</span>
                        <span className="text-[10px] text-green-600 font-bold bg-green-50 border border-green-100 rounded px-1.5">15% OFF</span>
                      </div>
                    </div>

                    {/* Color swatches */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-2">Select Color</span>
                      <div className="flex gap-2.5">
                        {[
                          { id: 'beige', hex: '#d2b48c' },
                          { id: 'slate', hex: '#7b8c9d' },
                          { id: 'olive', hex: '#5b6951' },
                          { id: 'navy', hex: '#1d2731' }
                        ].map(c => (
                          <button
                            key={c.id}
                            onClick={(e) => { e.stopPropagation(); setSelectedColor(c.id); }}
                            style={{ backgroundColor: c.hex }}
                            className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                              selectedColor === c.id ? 'border-brand-black scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                            }`}
                          >
                            {selectedColor === c.id && (
                              <Check className={`w-3.5 h-3.5 ${c.id === 'beige' ? 'text-black' : 'text-white'}`} strokeWidth={3} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size Selector pills */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-2">Select Size</span>
                      <div className="flex gap-2">
                        {['XS', 'S', 'M', 'L', 'XL'].map(sz => (
                          <button
                            key={sz}
                            onClick={(e) => { e.stopPropagation(); setSelectedSize(sz); }}
                            className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center border transition-all ${
                              selectedSize === sz
                                ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white shadow-sm'
                                : 'border-gray-200 hover:border-[#1a1a1a] text-gray-700 bg-gray-50'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Sticky Footer Add to bag button */}
                  <div className="border-t border-gray-100 px-4 pt-3 bg-white/95 backdrop-blur-md">
                    <button 
                      onClick={(e) => { e.stopPropagation(); alert('Item added to bag!'); }}
                      className="w-full bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>

        {/* ================= RIGHT FLOATING PANEL (AI Assistant & Stats) ================= */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-center z-[15]">
          
          {/* Glassmorphic AI Assistant panel */}
          <div className="animate-float-slow bg-white/40 backdrop-blur-lg border border-white/50 p-6 rounded-3xl shadow-xl flex flex-col gap-4">
            
            {/* AI Assistant header */}
            <div className="flex items-center gap-2 border-b border-black/[0.05] pb-3">
              <div className="w-7 h-7 bg-[#c9a96e] rounded-full flex items-center justify-center shadow-inner">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">Ask Aylthra Stylist</h4>
                <p className="text-[10px] text-gray-500 font-medium">Virtual Wardrobe Assistant</p>
              </div>
            </div>

            {/* AI Search input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) alert(`Stylist suggestion for: "${searchQuery}"`); setSearchQuery(''); }}
              className="relative w-full"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Find style matches for beige..."
                className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full py-3.5 pl-4 pr-12 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/30 transition-all shadow-sm"
              />
              <button 
                type="submit"
                style={{ backgroundColor: STYLE_TOKENS.dark }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full text-white hover:opacity-95 transition-opacity"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>

            {/* Quick Actions buttons underneath */}
            <div className="flex gap-2">
              <button 
                onClick={() => alert('Camera upload is simulated.')}
                className="flex-1 bg-white/70 hover:bg-white border border-gray-200/60 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-[10px] font-bold text-gray-700 uppercase tracking-wider transition-colors shadow-sm"
              >
                <Paperclip className="w-3.5 h-3.5 text-gray-500" />
                <span>Attach Outfit</span>
              </button>
              <button 
                onClick={() => window.location.href = '/shop'}
                className="flex-1 bg-white/70 hover:bg-white border border-gray-200/60 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-[10px] font-bold text-gray-700 uppercase tracking-wider transition-colors shadow-sm"
              >
                <Search className="w-3.5 h-3.5 text-gray-500" />
                <span>Search Shop</span>
              </button>
            </div>
          </div>

          {/* Stat Insight Grid (3 horizontal/stacked rows) */}
          <div className="space-y-3">
            {[
              {
                title: 'Style Match rate',
                value: '98%',
                desc: 'Top compatibility for you',
                sparkline: 'M0 20 Q15 5 30 15 T60 5 T100 12',
                color: '#34c759'
              },
              {
                title: 'Restock Scarce rate',
                value: '1.4%',
                desc: 'Limited stock remaining',
                sparkline: 'M0 10 Q15 25 30 10 T60 22 T100 15',
                color: '#ff3b30'
              },
              {
                title: 'Wishlist to Cart conversion',
                value: '84%',
                desc: 'High customer conversion',
                sparkline: 'M0 25 L20 20 L40 10 L60 15 L80 5 L100 2',
                color: '#c9a96e'
              }
            ].map((stat, i) => (
              <div 
                key={i}
                className="bg-white/30 backdrop-blur-md border border-white/40 p-4 rounded-2xl flex items-center justify-between shadow-sm hover:bg-white/50 hover:shadow-md hover:scale-[1.01] transition-all duration-300"
              >
                <div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block">{stat.title}</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl font-bold text-[#1a1a1a]">{stat.value}</span>
                    <span className="text-[9px] text-[#6b7280] font-medium">{stat.desc}</span>
                  </div>
                </div>
                {/* SVG sparkline chart */}
                <div className="w-16 h-8">
                  <svg className="w-full h-full" viewBox="0 0 100 30" fill="none">
                    <path 
                      d={stat.sparkline} 
                      stroke={stat.color} 
                      strokeWidth="2.25" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

        </div>

      </main>

      {/* ── FOOTER CREDIT ── */}
      <footer className="relative w-full text-center py-2 z-[20] border-t border-black/[0.05] animate-fade-in-up mt-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/60">
          Aylthra Couture © 2026 • Designed for Premium Showcases
        </p>
      </footer>
    </div>
  );
}
