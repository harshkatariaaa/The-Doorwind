import React, { useState } from 'react';
import { FiPhone, FiMail, FiTag } from 'react-icons/fi';
export default function ProductCard({ product, contact }) {
  const [idx, setIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const imgSrc = product.images?.length > 0 ? `/uploads/${product.images[idx]}` : null;
  return (
    <div className="bg-deep border border-border hover:border-gold-dim transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 group flex flex-col">
      <div className="relative overflow-hidden aspect-[4/3] bg-wood flex items-center justify-center">
        {imgSrc ? <img src={imgSrc} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/> : <div className="text-6xl opacity-20">🪵</div>}
        {product.images?.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {product.images.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i===idx?'bg-gold w-3':'bg-white/40 w-1.5'}`}/>)}
          </div>
        )}
        <div className="absolute top-3 right-3 bg-ink/80 text-[9px] tracking-widest uppercase text-gold px-2 py-1 flex items-center gap-1"><FiTag size={9}/>{product.category}</div>
        {product.isFeatured && <span className="absolute top-3 left-3 bg-gold text-ink text-[9px] font-medium tracking-widest uppercase px-2 py-0.5">Featured</span>}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-2xl font-light text-white mb-1">{product.name}</h3>
        <p className={`text-muted text-xs leading-relaxed mb-3 ${expanded?'':'line-clamp-2'}`}>{product.description}</p>
        {product.description?.length > 80 && <button onClick={() => setExpanded(!expanded)} className="text-gold text-[10px] tracking-widest uppercase mb-3 self-start">{expanded?'Less ↑':'More ↓'}</button>}
        {[['Material',product.material],['Finish',product.finish],['Dimensions',product.dimensions]].filter(([,v])=>v).length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[['Material',product.material],['Finish',product.finish],['Dimensions',product.dimensions]].filter(([,v])=>v).map(([k,v])=>(
              <div key={k} className="bg-wood/60 border border-border/50 px-3 py-2">
                <div className="text-[9px] tracking-[0.2em] uppercase text-gold mb-0.5">{k}</div>
                <div className="text-xs text-cream-dim">{v}</div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
          <div>
            <div className="text-[9px] tracking-widest uppercase text-muted">Starting from</div>
            <div className="font-display text-3xl font-light text-gold leading-none mt-0.5">₹{product.price.toLocaleString('en-IN')}</div>
          </div>
          {contact && (
            <div className="flex gap-2">
              <a href={`tel:${contact.phone}`} title="Call us" className="w-10 h-10 bg-wood border border-border flex items-center justify-center text-gold hover:bg-gold hover:text-ink hover:border-gold transition-all"><FiPhone size={15}/></a>
              <a href={`mailto:${contact.email}?subject=Enquiry: ${product.name}`} title="Email us" className="w-10 h-10 bg-wood border border-border flex items-center justify-center text-gold hover:bg-gold hover:text-ink hover:border-gold transition-all"><FiMail size={15}/></a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}