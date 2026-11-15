import React, { useEffect, useState } from 'react';

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const cards = [
    { icon: '🚪', title: 'Custom Doors',    sub: 'Entrances & Interior' },
    { icon: '🛋️', title: 'Sofas & Seating', sub: 'Living Room Sets'     },
    { icon: '🪟', title: 'Window Frames',   sub: 'Wooden & Composite'   },
    { icon: '🗄️', title: 'Wardrobes',       sub: 'Storage Solutions'    },
  ];

  const stats = [
    { num: '12', suffix: '+', label: 'Years of Craft'       },
    { num: '800', suffix: '+', label: 'Pieces Delivered'    },
    { num: '98',  suffix: '%', label: 'Client Satisfaction' },
  ];

  return (
    <section
      id="home"
      className="min-h-screen grid md:grid-cols-2 overflow-hidden"
      style={{ paddingTop: 'var(--nav-h, 80px)' }}
    >
      {/* ── LEFT COLUMN ─────────────────────────── */}
      <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16 relative z-10">

        {/* Eyebrow */}
        <div
          className={`flex items-center gap-3 text-gold text-[10px] font-medium
                      tracking-[0.38em] uppercase mb-8 transition-all duration-700
                      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="block w-7 h-px bg-gold flex-shrink-0" />
          Est. Since 2010 — Crafted with Pride
        </div>

        {/* Headline */}
        <h1
          className={`font-display font-light leading-none text-white mb-8
                      transition-all duration-700
                      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{
            fontSize: 'clamp(54px, 7vw, 100px)',
            transitionDelay: '350ms',
          }}
        >
          Where{' '}
          <em className="not-italic text-gold">Craft</em>
          <br />
          Meets Design.
        </h1>

        {/* Description */}
        <p
          className={`text-cream-dim text-[15px] max-w-md leading-relaxed mb-10
                      transition-all duration-700
                      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '500ms' }}
        >
          THE DOORWIND manufactures premium wood furniture — from bespoke doors
          and wardrobes to statement sofas. Every piece is handcrafted to order,
          built to last a lifetime.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap gap-4 mb-14 transition-all duration-700
                      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '650ms' }}
        >
          <a href="/#products" className="btn-gold">
            View Products →
          </a>
          <a href="/#contact" className="btn-ghost">
            Request a Quote
          </a>
        </div>

        {/* Stats row */}
        <div
          className={`flex flex-wrap gap-10 pt-10 border-t border-border
                      transition-all duration-700
                      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '800ms' }}
        >
          {stats.map(({ num, suffix, label }) => (
            <div key={label}>
              <div className="font-display text-4xl lg:text-5xl font-light text-white leading-none">
                {num}
                <span className="text-gold">{suffix}</span>
              </div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-muted mt-2">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT COLUMN ────────────────────────── */}
      <div className="relative hidden md:block overflow-hidden">

        {/* Background base */}
        <div className="absolute inset-0 bg-gradient-to-br from-wood to-ink" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 48px,#c8953a 48px,#c8953a 49px),' +
              'repeating-linear-gradient(90deg,transparent,transparent 48px,#c8953a 48px,#c8953a 49px)',
          }}
        />

        {/* Large watermark letters */}
        <div
          className="absolute inset-0 flex items-center justify-center
                     font-display font-semibold leading-none select-none pointer-events-none"
          style={{ fontSize: '220px', color: 'rgba(200,149,58,0.05)' }}
        >
          DW
        </div>

        {/* Product cards grid */}
        <div
          className={`absolute inset-0 grid grid-cols-2 gap-0.5 p-5
                      transition-opacity duration-1000
                      ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '900ms' }}
        >
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="group relative bg-wood/70 border border-border
                         backdrop-blur-sm flex flex-col justify-end p-6
                         overflow-hidden transition-all duration-400
                         hover:bg-surface/90 hover:border-gold-dim cursor-default"
            >
              {/* Hover shimmer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  background:
                    'linear-gradient(135deg, transparent 50%, rgba(200,149,58,0.07))',
                }}
              />

              {/* Number watermark */}
              <div
                className="absolute top-4 right-5 font-display font-light text-gold/10
                           group-hover:text-gold/18 transition-colors duration-400"
                style={{ fontSize: '56px', lineHeight: 1 }}
              >
                0{i + 1}
              </div>

              <div className="relative z-10">
                <div className="text-3xl mb-3 opacity-70 group-hover:opacity-90 transition-opacity">
                  {card.icon}
                </div>
                <div className="font-display text-lg font-light text-cream leading-tight mb-0.5">
                  {card.title}
                </div>
                <div className="text-[10px] tracking-[0.18em] uppercase text-muted
                               group-hover:text-cream-dim transition-colors duration-300">
                  {card.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(26,20,16,0.6) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* ── SCROLL HINT ─────────────────────────── */}
      <div
        className={`absolute bottom-8 left-8 md:left-20 hidden md:flex items-center gap-4
                    text-[10px] tracking-[0.28em] uppercase text-muted z-20
                    transition-all duration-700
                    ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '1200ms' }}
      >
        <div className="relative w-12 h-px bg-border overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gold"
            style={{
              width: '100%',
              transform: visible ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 1s ease 1.4s',
            }}
          />
        </div>
        Scroll to explore
      </div>
    </section>
  );
}