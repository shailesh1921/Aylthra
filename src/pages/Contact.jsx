import { useState } from 'react';
import { motion } from 'framer-motion';

// ─── Contact Page ──────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="bg-brand-black py-20 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs tracking-[0.3em] uppercase text-brand-accent mb-3">Get In Touch</p>
          <h1 className="text-4xl lg:text-5xl font-heading">Contact Us</h1>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-heading mb-6">We'd Love to Hear From You</h2>
            <p className="text-brand-gray text-sm leading-relaxed mb-10">
              Whether you have a question about our products, sizing, orders, or anything else — our team is here to help.
            </p>

            <div className="space-y-6">
              {[
                { icon: '📍', label: 'Visit Us', value: '123 Fashion Street, Mumbai, India' },
                { icon: '📧', label: 'Email Us', value: 'hello@aylthra.com' },
                { icon: '📞', label: 'Call Us', value: '+91 98765 43210' },
                { icon: '🕐', label: 'Hours', value: 'Mon-Sat: 10AM - 8PM IST' },
              ].map(item => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-medium text-sm mb-0.5">{item.label}</p>
                    <p className="text-sm text-brand-gray">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {sent ? (
              <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading mb-2">Message Sent!</h3>
                <p className="text-sm text-brand-gray">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5">Name</label>
                    <input type="text" required value={form.name} onChange={update('name')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5">Email</label>
                    <input type="email" required value={form.email} onChange={update('email')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5">Subject</label>
                  <input type="text" required value={form.subject} onChange={update('subject')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5">Message</label>
                  <textarea required value={form.message} onChange={update('message')} rows={5} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-brand-accent resize-none" placeholder="Tell us more..." />
                </div>
                <button type="submit" className="btn-primary w-full rounded-lg py-4">
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
