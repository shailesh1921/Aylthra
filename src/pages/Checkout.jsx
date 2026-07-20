import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

// ─── Checkout Page ─────────────────────────────────────
export default function Checkout() {
  const { cart, subtotal, couponDiscount, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', state: '', zip: '', country: 'India',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
  });

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  const finalTotal = total + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="page-enter max-w-lg mx-auto px-4 py-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>
        <h1 className="text-3xl font-heading mb-4">Order Confirmed!</h1>
        <p className="text-brand-gray mb-2">Thank you for shopping with AYLTHRA.</p>
        <p className="text-sm text-brand-gray mb-8">Order #AYL{Date.now().toString().slice(-6)} — You'll receive a confirmation email shortly.</p>
        <Link to="/shop" className="btn-primary inline-block">Continue Shopping</Link>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="page-enter max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-heading mb-4">Your cart is empty</h1>
        <Link to="/shop" className="btn-primary inline-block">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-heading mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
        {/* Form */}
        <div className="lg:col-span-2">
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-10">
            {['Shipping', 'Payment'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-brand-black text-white' : 'bg-gray-200 text-brand-gray'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className={`text-sm ${step === i + 1 ? 'font-medium text-brand-dark' : 'text-brand-gray'}`}>{s}</span>
                {i === 0 && <div className="w-12 h-px bg-gray-200 mx-2" />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Shipping */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-lg font-heading">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5">Email</label>
                    <input type="email" required value={form.email} onChange={update('email')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" placeholder="you@example.com" />
                  </div>
                  <div></div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5">First Name</label>
                    <input type="text" required value={form.firstName} onChange={update('firstName')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5">Last Name</label>
                    <input type="text" required value={form.lastName} onChange={update('lastName')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium mb-1.5">Address</label>
                    <input type="text" required value={form.address} onChange={update('address')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5">City</label>
                    <input type="text" required value={form.city} onChange={update('city')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5">State</label>
                    <input type="text" required value={form.state} onChange={update('state')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5">ZIP Code</label>
                    <input type="text" required value={form.zip} onChange={update('zip')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5">Country</label>
                    <input type="text" required value={form.country} onChange={update('country')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)} className="btn-primary w-full mt-6 rounded-lg">
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-lg font-heading">Payment Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium mb-1.5">Card Number</label>
                    <input type="text" required value={form.cardNumber} onChange={update('cardNumber')} placeholder="1234 5678 9012 3456" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium mb-1.5">Name on Card</label>
                    <input type="text" required value={form.cardName} onChange={update('cardName')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5">Expiry Date</label>
                    <input type="text" required value={form.cardExpiry} onChange={update('cardExpiry')} placeholder="MM/YY" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5">CVC</label>
                    <input type="text" required value={form.cardCvc} onChange={update('cardCvc')} placeholder="123" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1 rounded-lg">
                    ← Back
                  </button>
                  <button type="submit" className="btn-primary flex-1 rounded-lg">
                    Place Order — ${(finalTotal).toFixed(2)}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-brand-gray mt-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Your payment information is secure and encrypted
                </div>
              </motion.div>
            )}
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-sm font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cart.items.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-12 h-16 rounded bg-brand-light overflow-hidden flex-shrink-0">
                    <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-[10px] text-brand-gray">{item.color} / {item.size} × {item.quantity}</p>
                  </div>
                  <span className="text-xs font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr className="border-gray-100 my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-brand-gray">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              {couponDiscount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>−${couponDiscount.toFixed(2)}</span></div>}
              <div className="flex justify-between"><span className="text-brand-gray">Shipping</span><span>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span></div>
              <hr className="border-gray-100" />
              <div className="flex justify-between font-semibold text-base"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
