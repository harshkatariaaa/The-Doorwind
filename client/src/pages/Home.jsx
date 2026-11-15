import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ContactSection from '../components/ContactSection';
import { FiSearch } from 'react-icons/fi';
import api from '../utils/api';
 
const CATEGORIES = ['All', 'Doors', 'Furniture', 'Windows', 'Storage', 'Custom'];
 
export default function Home() {
  const [products, setProducts]   = useState([]);
  const [contact,  setContact]    = useState(null);
  const [loading,  setLoading]    = useState(true);
  const [category, setCategory]   = useState('All');
  const [search,   setSearch]     = useState('');
  const [query,    setQuery]      = useState('');
 
  useEffect(() => {
    api.get('/contact').then(r => setContact(r.data)).catch(() => {});
  }, []);
 
  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category !== 'All') params.category = category;
    if (query)               params.search   = query;
 
    api.get('/products', { params })
      .then(r => setProducts(r.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, query]);
 
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };
 
  // Marquee strip items
  const marqueeItems = ['Premium Furniture','Custom Doors','Wardrobes','Window Frames','Bespoke Commissions','Solid Hardwood','Hand Crafted','Since 2010'];
 
  return (
    <>
      <Hero />
 
      {/* Marquee Strip */}
      <div className="bg-gold border-y border-gold-dim py-3 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite' }}>
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-8 text-[11px] font-medium tracking-[0.28em] uppercase text-ink">
              {item}
              <span className="w-1 h-1 rounded-full bg-ink/40 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
 
      {/* Products Section */}
      <section id="products" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="section-tag">Our Products</div>
              <h2 className="section-title">
                The <em className="text-gold not-italic">Collection</em>
              </h2>
            </div>
 
            {/* Search */}
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products…"
                className="input-field w-52 md:w-64 py-2.5 text-sm"
              />
              <button type="submit"
                className="bg-gold text-ink px-4 hover:bg-gold-lt transition-colors flex items-center">
                <FiSearch size={16} />
              </button>
            </form>
          </div>
 
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => { setCategory(c); setQuery(''); setSearch(''); }}
                className={`px-4 py-2 text-[10px] font-medium tracking-[0.18em] uppercase border
                            transition-all duration-200
                            ${category === c
                              ? 'bg-gold border-gold text-ink'
                              : 'bg-transparent border-border text-muted hover:border-gold hover:text-cream'}`}>
                {c}
              </button>
            ))}
          </div>
 
          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-deep border border-border animate-pulse">
                  <div className="aspect-[4/3] bg-wood" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-wood rounded w-3/4" />
                    <div className="h-3 bg-wood rounded w-full" />
                    <div className="h-3 bg-wood rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4 opacity-30">🪵</div>
              <div className="font-display text-3xl text-muted mb-2">No products found</div>
              <p className="text-sm text-muted/60">
                {query ? `No results for "${query}"` : 'No products in this category yet.'}
              </p>
              <button onClick={() => { setCategory('All'); setQuery(''); setSearch(''); }}
                className="btn-ghost mt-6 text-[10px] px-6 py-2.5">
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(p => (
                <ProductCard key={p._id} product={p} contact={contact} />
              ))}
            </div>
          )}
        </div>
      </section>
 
      {/* About Section */}
      <section id="about" className="py-24 bg-deep border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="relative h-80 md:h-[480px]">
              <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-wood border border-border flex items-center justify-center">
                <span className="font-display text-[100px] text-gold/10 select-none">DW</span>
              </div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-gold-dim to-gold flex flex-col items-center justify-center gap-1">
                <div className="font-display text-5xl font-light text-ink leading-none">12+</div>
                <div className="text-[10px] tracking-widest uppercase text-ink/60">Years of Craft</div>
              </div>
            </div>
            {/* Content */}
            <div>
              <div className="section-tag">Our Story</div>
              <h2 className="section-title mb-6">
                Built on Wood,<br/>
                <em className="text-gold not-italic">Grown on Trust</em>
              </h2>
              <p className="text-cream-dim text-sm leading-relaxed mb-4">
                THE DOORWIND started in a small workshop with one simple belief: furniture
                should be made to last. Over twelve years, we've grown from a local carpentry
                unit into a full-scale manufacturer trusted by homeowners, interior designers,
                and builders alike.
              </p>
              <p className="text-cream-dim text-sm leading-relaxed mb-8">
                Now we're expanding — bringing our workshop-quality craftsmanship online so
                clients anywhere can commission, customise, and receive premium furniture
                directly from our factory floor.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[['Solid Hardwood','Only quality timber'],['Hand Finished','Not mass produced'],['On-Time Delivery','Committed schedules'],['Full Warranty','2-year guarantee']].map(([t,s]) => (
                  <div key={t} className="p-4 bg-wood border border-border border-l-2 border-l-gold">
                    <div className="font-display text-base text-white">{t}</div>
                    <div className="text-[11px] text-muted mt-0.5">{s}</div>
                  </div>
                ))}
              </div>
              <a href="/#contact" className="btn-gold">Work With Us →</a>
            </div>
          </div>
        </div>
      </section>
 
      <ContactSection />
    </>
  );
}