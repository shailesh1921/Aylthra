import { Link } from 'react-router-dom';

// ─── Footer ────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading tracking-[0.2em] mb-4">AYLTHRA</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium clothing for the modern individual. Crafted with care, designed with purpose.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'Pinterest', 'Facebook'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-colors" aria-label={social}>
                  <span className="text-xs">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-6">Shop</h4>
            <ul className="space-y-3">
              {[
                { to: '/shop?category=men', label: 'Men' },
                { to: '/shop?category=women', label: 'Women' },
                { to: '/shop?category=kids', label: 'Kids' },
                { to: '/shop?category=accessories', label: 'Accessories' },
                { to: '/shop', label: 'New Arrivals' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-400 text-sm hover:text-brand-accent transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-6">Help</h4>
            <ul className="space-y-3">
              {['FAQ', 'Shipping & Returns', 'Size Guide', 'Track Order', 'Contact Us'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-400 text-sm hover:text-brand-accent transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Join for 10% off your first order and stay updated.</p>
            <form onSubmit={e => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-gray-900 border border-gray-700 rounded-l-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-brand-accent transition-colors"
              />
              <button type="submit" className="bg-brand-accent px-5 py-3 rounded-r-lg text-sm font-semibold hover:bg-brand-accent-hover transition-colors">
                →
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">© {currentYear} AYLTHRA. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
