import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// ─── Login / Signup Page ───────────────────────────────
export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/account');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (isSignup && !name) {
      setError('Please enter your name');
      return;
    }

    const result = isSignup ? signup(name, email, password) : login(email, password);
    if (result.success) {
      navigate(isSignup ? '/account' : '/account');
    } else {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="page-enter min-h-screen flex items-center justify-center bg-brand-cream px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="text-2xl font-heading tracking-[0.2em] text-brand-black">AYLTHRA</Link>
          <h1 className="text-2xl font-heading mt-8 mb-2">{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
          <p className="text-sm text-brand-gray">
            {isSignup ? 'Join us and enjoy 10% off your first order' : 'Sign in to access your account'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm space-y-5">
          {isSignup && (
            <div>
              <label className="block text-xs font-medium mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {!isSignup && (
            <div className="flex justify-end">
              <a href="#" className="text-xs text-brand-accent hover:underline">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="btn-primary w-full rounded-lg py-4">
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-white px-4 text-brand-gray">or</span></div>
          </div>

          <button type="button" className="w-full border border-gray-200 rounded-lg py-3 text-sm font-medium hover:bg-brand-light transition-colors flex items-center justify-center gap-2">
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-sm text-brand-gray mt-6">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" onClick={() => { setIsSignup(!isSignup); setError(''); }} className="text-brand-accent font-medium hover:underline">
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
