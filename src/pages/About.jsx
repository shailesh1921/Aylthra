import { motion } from 'framer-motion';

// ─── About Page ────────────────────────────────────────
export default function About() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&h=600&fit=crop"
          alt="About AYLTHRA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-brand-accent mb-3">Our Story</p>
            <h1 className="text-4xl lg:text-5xl font-heading">About AYLTHRA</h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-heading mb-6">Fashion With Purpose</h2>
          <p className="text-brand-gray leading-relaxed mb-4">
            AYLTHRA was born from a simple belief: premium clothing should be accessible, sustainable, and designed to make you feel confident. We curate collections that blend timeless elegance with modern sensibility.
          </p>
          <p className="text-brand-gray leading-relaxed mb-4">
            Every piece in our collection is thoughtfully sourced from the finest materials — Italian wool, Mongolian cashmere, organic cotton. We partner with artisans and manufacturers who share our commitment to quality and ethical production.
          </p>
          <p className="text-brand-gray leading-relaxed">
            Founded in 2024, AYLTHRA has grown from a small studio to a brand trusted by thousands. But our mission remains the same: to help you build a wardrobe that's authentically yours.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: '🌿',
                title: 'Sustainability',
                text: "We use organic and recycled materials wherever possible. Our packaging is 100% recyclable, and we are working towards carbon-neutral operations.",
              },
              {
                icon: '✂️',
                title: 'Craftsmanship',
                text: 'Every garment is crafted with meticulous attention to detail. From stitching to finishing, we ensure each piece meets our exacting quality standards.',
              },
              {
                icon: '🤝',
                title: 'Ethical Production',
                text: 'We partner with factories that provide fair wages and safe working conditions. Transparency is at the heart of everything we do.',
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="text-4xl block mb-4">{value.icon}</span>
                <h3 className="text-xl font-heading mb-3">{value.title}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-brand-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: '50K+', label: 'Happy Customers' },
              { number: '200+', label: 'Products' },
              { number: '15', label: 'Countries' },
              { number: '4.8', label: 'Average Rating' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl lg:text-4xl font-heading text-brand-accent mb-1">{stat.number}</p>
                <p className="text-xs tracking-wider uppercase text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
