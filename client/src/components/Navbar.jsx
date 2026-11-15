import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [{ label:'Products', href:'/#products' },{ label:'About', href:'/#about' },{ label:'Contact', href:'/#contact' }];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-ink/95 backdrop-blur-lg border-b border-border h-16' : 'h-20'}`}>
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-semibold tracking-widest text-white leading-none">
          THE <span className="text-gold">DOOR</span>WIND
          <span className="block font-body text-[8px] tracking-[0.4em] text-muted uppercase mt-1 font-normal">Furniture Manufacturing</span>
        </Link>
        <ul className="hidden md:flex items-center gap-10">
          {links.map(l => <li key={l.label}><a href={l.href} className="text-xs font-light tracking-widest uppercase text-muted hover:text-cream transition-colors">{l.label}</a></li>)}
        </ul>
        <a href="/#contact" className="hidden md:inline-flex btn-gold text-[10px] px-6 py-2.5">Get a Quote</a>
        <button className="md:hidden text-cream text-xl p-1" onClick={() => setOpen(!open)}>{open ? <FiX/> : <FiMenu/>}</button>
      </div>
      {open && (
        <div className="md:hidden bg-ink/98 backdrop-blur border-b border-border px-6 py-5 flex flex-col gap-4">
          {links.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-sm tracking-widest uppercase text-cream-dim">{l.label}</a>)}
          <a href="/#contact" onClick={() => setOpen(false)} className="btn-gold self-start text-[10px] px-5 py-2.5 mt-1">Get a Quote</a>
        </div>
      )}
    </nav>
  );
}