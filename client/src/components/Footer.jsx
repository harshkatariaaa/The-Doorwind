import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail } from 'react-icons/fi';
export default function Footer() {
  return (
    <footer className="bg-ink border-t border-border pt-14 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-2xl font-semibold tracking-widest text-white mb-1">THE <span className="text-gold">DOOR</span>WIND</div>
            <div className="text-[9px] tracking-[0.4em] uppercase text-muted mb-4">Furniture Manufacturing</div>
            <p className="text-xs text-muted leading-relaxed max-w-[220px]">Crafting premium wood furniture since 2010. Every piece leaves our workshop with a promise to last.</p>
          </div>
          <div>
            <div className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold mb-5">Quick Links</div>
            <ul className="flex flex-col gap-3">
              {['Home','Products','About','Contact'].map(l => <li key={l}><a href={l==='Home'?'/':'/#'+l.toLowerCase()} className="text-sm text-muted hover:text-cream transition-colors flex items-center gap-2"><span className="text-border">—</span>{l}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold mb-5">Services</div>
            <ul className="flex flex-col gap-3">
              {['Custom Doors','Furniture Sets','Wardrobes','Window Frames'].map(s => <li key={s}><a href="/#products" className="text-sm text-muted hover:text-cream transition-colors flex items-center gap-2"><span className="text-border">—</span>{s}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold mb-5">Contact</div>
            <div className="flex flex-col gap-3">
              <a href="tel:+919800000000" className="flex items-center gap-3 text-sm text-muted hover:text-gold transition-colors"><FiPhone size={13} className="text-gold flex-shrink-0"/>+91 98000 00000</a>
              <a href="mailto:hello@thedoorwind.com" className="flex items-center gap-3 text-sm text-muted hover:text-gold transition-colors break-all"><FiMail size={13} className="text-gold flex-shrink-0"/>hello@thedoorwind.com</a>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-xs text-muted">© {new Date().getFullYear()} The Doorwind. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-muted hover:text-gold">Privacy Policy</a>
            <Link to="/admin" className="text-xs text-border hover:text-muted">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}