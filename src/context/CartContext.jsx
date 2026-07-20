import { createContext, useContext, useReducer, useEffect } from 'react';

// ─── Cart Context ─────────────────────────────────────
const CartContext = createContext();

// Load cart from localStorage
const loadCart = () => {
  try {
    const saved = localStorage.getItem('aylthra_cart');
    return saved ? JSON.parse(saved) : { items: [], coupon: null };
  } catch { return { items: [], coupon: null }; }
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        i => i.id === action.payload.id && i.size === action.payload.size && i.color === action.payload.color
      );
      if (existing) {
        return { ...state, items: state.items.map(i =>
          i.id === existing.id && i.size === existing.size && i.color === existing.color
            ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
            : i
        )};
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((_, idx) => idx !== action.payload) };
    case 'UPDATE_QUANTITY':
      return { ...state, items: state.items.map((item, idx) =>
        idx === action.payload.index ? { ...item, quantity: Math.max(1, action.payload.quantity) } : item
      )};
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };
    case 'CLEAR_CART':
      return { items: [], coupon: null };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, null, loadCart);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('aylthra_cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (product, size, color, qty = 1) =>
    dispatch({ type: 'ADD_ITEM', payload: { ...product, size, color, quantity: qty } });

  const removeItem = (index) => dispatch({ type: 'REMOVE_ITEM', payload: index });
  const updateQuantity = (index, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } });
  const applyCoupon = (coupon) => dispatch({ type: 'APPLY_COUPON', payload: coupon });
  const removeCoupon = () => dispatch({ type: 'REMOVE_COUPON' });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  // Computed values
  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const couponDiscount = cart.coupon
    ? cart.coupon.type === 'percent'
      ? Math.round(subtotal * cart.coupon.discount / 100)
      : Math.min(cart.coupon.discount, subtotal)
    : 0;

  const total = Math.max(0, subtotal - couponDiscount);
  const shipping = subtotal > 150 ? 0 : 12;

  return (
    <CartContext.Provider value={{
      cart, addItem, removeItem, updateQuantity,
      applyCoupon, removeCoupon, clearCart,
      itemCount, subtotal, couponDiscount, total, shipping
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
