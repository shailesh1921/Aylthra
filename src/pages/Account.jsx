import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// ─── Account Page ─────────────────────────────────────
export default function Account() {
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount, subtotal } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-heading mb-2">My Account</h1>
        <p className="text-sm text-brand-gray">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-2">
          {[
            { label: 'Dashboard', active: true },
            { label: 'Orders', link: '#' },
            { label: 'Addresses', link: '#' },
            { label: 'Settings', link: '#' },
          ].map(item => (
            <button
              key={item.label}
              className={`block w-full text-left px-4 py-3 text-sm rounded-lg transition-colors ${
                item.active ? 'bg-brand-black text-white font-medium' : 'hover:bg-brand-light'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => { logout(); navigate('/'); }} className="block w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            Sign Out
          </button>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-3xl font-heading text-brand-accent mb-1">{itemCount}</p>
              <p className="text-xs text-brand-gray tracking-wider uppercase">Items in Cart</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-3xl font-heading text-brand-accent mb-1">{wishlist.length}</p>
              <p className="text-xs text-brand-gray tracking-wider uppercase">Wishlist Items</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-3xl font-heading text-brand-accent mb-1">0</p>
              <p className="text-xs text-brand-gray tracking-wider uppercase">Orders</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-heading mb-4">Profile Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-brand-gray mb-1">Name</p>
                <p className="text-sm font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-xs text-brand-gray mb-1">Email</p>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-brand-gray mb-1">Member Since</p>
                <p className="text-sm font-medium">{new Date(user.joined).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/shop" className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="font-heading mb-1">Continue Shopping</h4>
              <p className="text-xs text-brand-gray">Browse our latest collections →</p>
            </Link>
            <Link to="/wishlist" className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="font-heading mb-1">View Wishlist</h4>
              <p className="text-xs text-brand-gray">{wishlist.length} saved items →</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
