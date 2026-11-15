import React, { useEffect, useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageCircle } from 'react-icons/fi';
import api from '../utils/api';
export default function ContactSection() {
  const [contact, setContact] = useState(null);
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const [sent, setSent] = useState(false);
  useEffect(() => { api.get('/contact').then(r => setContact(r.data)).catch(()=>{}); }, []);

  const details = contact ? [
    { icon:<FiPhone size={20}/>, label:'Phone', value:contact.phone, href:`tel:${contact.phone}`, hint:'Tap to call', color:'hover:bg-green-700' },
    { icon:<FiMail size={20}/>, label:'Email', value:contact.email, href:`mailto:${contact.email}?subject=Product Enquiry`, hint:'Tap to email', color:'hover:bg-blue-700' },
    { icon:<FiMessageCircle size={20}/>, label:'WhatsApp', value:'Chat with us', href:`https://wa.me/${contact.whatsapp}?text=Hi! I am interested in your furniture.`, hint:'Tap to WhatsApp', color:'hover:bg-green-600', ext:true },
    { icon:<FiClock size={20}/>, label:'Working Hours', value:contact.hours, href:null },
  ] : [];

  return (
    <section id="contact" className="py-24 bg-deep border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title mb-5">Let's Build<br/><em className="text-gold not-italic">Something Remarkable</em></h2>
            <p className="text-cream-dim text-sm leading-relaxed mb-8">Tap any contact below — your phone opens the dialer, email app, or WhatsApp automatically.</p>
            <div className="flex flex-col gap-3 mb-10">
              {details.map((d,i) => d.href ? (
                <a key={i} href={d.href} target={d.ext?'_blank':undefined} rel={d.ext?'noopener noreferrer':undefined}
                  className={`flex items-center gap-4 p-4 bg-wood border border-border group cursor-pointer transition-all duration-300 ${d.color} hover:border-transparent hover:text-white`}>
                  <div className="w-11 h-11 bg-deep border border-border flex items-center justify-center text-gold group-hover:bg-white/10 group-hover:text-white group-hover:border-transparent transition-all flex-shrink-0">{d.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] tracking-[0.25em] uppercase text-gold group-hover:text-white/70">{d.label}</div>
                    <div className="text-sm text-cream group-hover:text-white font-light truncate mt-0.5">{d.value}</div>
                  </div>
                  <div className="text-[9px] tracking-wider uppercase text-muted group-hover:text-white/60 hidden sm:block flex-shrink-0">{d.hint} →</div>
                </a>
              ) : (
                <div key={i} className="flex items-center gap-4 p-4 bg-wood border border-border">
                  <div className="w-11 h-11 bg-deep border border-border flex items-center justify-center text-gold flex-shrink-0">{d.icon}</div>
                  <div><div className="text-[9px] tracking-[0.25em] uppercase text-gold">{d.label}</div><div className="text-sm text-cream font-light mt-0.5">{d.value}</div></div>
                </div>
              ))}
            </div>

            {/* GOOGLE MAP */}
            {contact && (
              <div>
                <div className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold mb-3 flex items-center gap-2"><FiMapPin size={12}/> Store Location</div>
                <div className="border border-border overflow-hidden">
                  <iframe
                    title="The Doorwind Store Location"
                    width="100%" height="240"
                    style={{ border:0, display:'block' }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${contact.lat},${contact.lng}&z=15&output=embed`}
                  />
                </div>
                <a href={`https://maps.google.com/?q=${contact.lat},${contact.lng}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-gold mt-2 hover:text-gold-lt transition-colors">
                  <FiMapPin size={11}/> Open in Google Maps →
                </a>
              </div>
            )}
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="bg-wood border border-border p-12 text-center">
                <div className="text-5xl mb-4">✅</div>
                <div className="font-display text-3xl text-gold mb-2">Message Sent!</div>
                <div className="text-sm text-muted">We'll get back to you within 24 hours.</div>
                <button onClick={() => setSent(false)} className="btn-ghost mt-6 text-[10px] px-6 py-2.5">Send Another →</button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
                <h3 className="font-display text-2xl text-white mb-2">Send an Enquiry</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="form-label">Full Name *</label><input required className="input-field" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
                  <div><label className="form-label">Email *</label><input required type="email" className="input-field" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
                </div>
                <div><label className="form-label">Phone</label><input type="tel" className="input-field" placeholder="+91 00000 00000" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
                <div><label className="form-label">Message *</label><textarea required rows={5} className="input-field resize-none" placeholder="Tell us about your project…" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></div>
                <button type="submit" className="btn-gold justify-center mt-1">Send Enquiry →</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}