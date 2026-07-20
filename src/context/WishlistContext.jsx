import { createContext, useContext, useReducer, useEffect } from 'react';

// ─── Wishlist Context ──────────────────────────────────
const WishlistContext = createContext();

const loadWishlist = () => {
  try {
    const saved = localStorage.getItem('aylthra_wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      if (state.find(i => i.id === action.payload.id)) return state;
      return [...state, action.payload];
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.payload);
    case 'TOGGLE':
      return state.find(i => i.id === action.payload.id)
        ? state.filter(i => i.id !== action.payload.id)
        : [...state, action.payload];
    case 'CLEAR':
      return [];
    default: return state;
  }
};

export function WishlistProvider({ children }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, null, loadWishlist);

  useEffect(() => {
    localStorage.setItem('aylthra_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => dispatch({ type: 'ADD', payload: product });
  const removeFromWishlist = (id) => dispatch({ type: 'REMOVE', payload: id });
  const toggleWishlist = (product) => dispatch({ type: 'TOGGLE', payload: product });
  const isInWishlist = (id) => wishlist.some(i => i.id === id);
  const clearWishlist = () => dispatch({ type: 'CLEAR' });

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
