import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { coupons } from '../data/products';

// ─── Cart Page ─────────────────────────────────────────
export default function Cart() {
  const { cart, removeItem, updateQuantity, subtotal, couponDiscount, shipping, total, applyCoupon, removeCoupon, clearCart, itemCount } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    const coupon = coupons[code];
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }
    if (subtotal < coupon.minOrder) {
      setCouponError(`Minimum order $${coupon.minOrder} required`);
      return;
    }
    setCouponError('');
    applyCoupon({ ...coupon, code });
    setCouponInput('');
  };

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl lg:text-4xl font-heading mb-2">
        Shopping Cart
      </motion.h1>
      <p className="text-sm text-brand-gray mb-10">{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>

      {cart.items.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto mb-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-xl font-heading mb-2">Your cart is empty</h2>
          <p className="text-sm text-brand-gray mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="btn-primary inline-block">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cart.items.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}-${item.color}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex gap-4 sm:gap-6 p-4 bg-white rounded-lg"
                >
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="w-24 h-32 sm:w-32 sm:h-40 flex-shrink-0 rounded-lg overflow-hidden bg-brand-light">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/product/${item.id}`} className="font-medium text-sm hover:text-brand-accent transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-xs text-brand-gray mt-1">{item.color} / {item.size}</p>
                      </div>
                      <button onClick={() => removeItem(index)} className="p-1 text-brand-gray hover:text-red-500 transition-colors" aria-label="Remove">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-sm">
                        <button onClick={() => updateQuantity(index, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-brand-light">−</button>
                        <span className="w-10 h-8 flex items-center justify-center text-xs border-x border-gray-200">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-brand-light">+</button>
                      </div>
                      <span className="font-semibold text-sm">${item.price * item.quantity}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex justify-between pt-4">
              <Link to="/shop" className="text-sm text-brand-dark hover:text-brand-accent transition-colors">
                ← Continue Shopping
              </Link>
              <button onClick={clearCart} className="text-sm text-brand-gray hover:text-red-500 transition-colors">
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-heading mb-6">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-6">
                {cart.coupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-green-700">{cart.coupon.code}</p>
                      <p className="text-xs text-green-600">{cart.coupon.description}</p>
                    </div>
                    <button onClick={removeCoupon} className="text-green-500 hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value)}
                        placeholder="Coupon code"
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-accent"
                      />
                      <button onClick={handleApplyCoupon} className="bg-brand-black text-white px-4 py-2 text-xs tracking-wider uppercase rounded-lg hover:bg-brand-accent transition-colors">
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                  </div>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-gray">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>−${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-brand-gray">Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-brand-accent">Free shipping on orders over $150</p>
                )}
                <hr className="border-gray-100" />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>${(total + shipping).toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full text-center mt-6 bg-brand-black text-white py-4 text-xs tracking-widest uppercase font-semibold hover:bg-brand-accent transition-colors rounded-lg"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
