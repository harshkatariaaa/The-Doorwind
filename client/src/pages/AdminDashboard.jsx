import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiLogOut, FiUpload, FiX } from 'react-icons/fi';
 
const API = process.env.REACT_APP_API_URL || '';
const CATS = ['Doors','Furniture','Windows','Storage','Custom'];
const EMPTY = { name:'', description:'', price:'', category:'Furniture', material:'Solid Wood', dimensions:'', finish:'Natural', inStock:true, isFeatured:false, isVisible:true };
 
export default function AdminDashboard() {
  const { admin, logout }   = useAuth();
  const navigate             = useNavigate();
  const fileRef              = useRef();
 
  const [products, setProducts]   = useState([]);
  const [loading,  setLoading]    = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [editing,  setEditing]    = useState(null); // product being edited
  const [form,     setForm]       = useState(EMPTY);
  const [files,    setFiles]      = useState([]);   // new image files
  const [previews, setPreviews]   = useState([]);
  const [saving,   setSaving]     = useState(false);
  const [deleting, setDeleting]   = useState(null);
 
  const load = () => {
    setLoading(true);
    api.get('/products/admin/all')
      .then(r => setProducts(r.data))
      .catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false));
  };
 
  useEffect(() => { load(); }, []);
 
  // Image preview generation
  useEffect(() => {
    const urls = files.map(f => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach(u => URL.revokeObjectURL(u));
  }, [files]);
 
  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setFiles([]);
    setShowForm(true);
  };
 
  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name, description: p.description, price: p.price,
      category: p.category, material: p.material || '',
      dimensions: p.dimensions || '', finish: p.finish || '',
      inStock: p.inStock, isFeatured: p.isFeatured, isVisible: p.isVisible
    });
    setFiles([]);
    setShowForm(true);
  };
 
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length + files.length > 5) {
      toast.error('Max 5 images per product');
      return;
    }
    setFiles(prev => [...prev, ...selected]);
  };
 
  const removeNewFile = (i) => {
    setFiles(prev => prev.filter((_, idx) => idx !== i));
  };
 
  const save = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      toast.error('Name, price and category are required');
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      files.forEach(f => fd.append('images', f));
 
      if (editing) {
        await api.put(`/products/${editing._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Product updated!');
      } else {
        await api.post('/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Product added!');
      }
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };
 
  const toggleVisibility = async (p) => {
    try {
      await api.put(`/products/${p._id}`, { isVisible: !p.isVisible });
      setProducts(prev => prev.map(x => x._id === p._id ? {...x, isVisible: !x.isVisible} : x));
      toast.success(p.isVisible ? 'Product hidden' : 'Product visible');
    } catch { toast.error('Failed to update'); }
  };
 
  const deleteProduct = async (p) => {
    if (!window.confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    setDeleting(p._id);
    try {
      await api.delete(`/products/${p._id}`);
      toast.success('Product deleted');
      setProducts(prev => prev.filter(x => x._id !== p._id));
    } catch { toast.error('Delete failed'); }
    finally { setDeleting(null); }
  };
 
  const doLogout = () => { logout(); navigate('/admin'); };
 
  const stats = [
    { label: 'Total Products',   value: products.length },
    { label: 'Visible',          value: products.filter(p => p.isVisible).length },
    { label: 'Featured',         value: products.filter(p => p.isFeatured).length },
    { label: 'Out of Stock',     value: products.filter(p => !p.inStock).length },
  ];
 
  return (
    <div className="min-h-screen bg-ink">
      {/* Top bar */}
      <header className="bg-deep border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="font-display text-lg font-semibold tracking-widest text-white">
            THE <span className="text-gold">DOOR</span>WIND — Admin
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted hidden sm:block">{admin?.email}</span>
            <button onClick={doLogout}
              className="flex items-center gap-2 text-xs text-muted hover:text-gold transition-colors">
              <FiLogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>
 
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {stats.map(s => (
            <div key={s.label} className="bg-deep border border-border p-5">
              <div className="font-display text-4xl font-light text-gold leading-none">{s.value}</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
 
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-3xl font-light text-white">Products</h2>
          <button onClick={openCreate} className="btn-gold text-[10px] px-5 py-2.5 flex items-center gap-2">
            <FiPlus size={14} /> Add Product
          </button>
        </div>
 
        {/* Products Table */}
        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-deep border border-border h-16 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-deep border border-border">
            <div className="text-4xl mb-3 opacity-20">🪵</div>
            <div className="text-muted">No products yet. Add your first one!</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {['Image','Name','Category','Price','Status','Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-[10px] tracking-[0.2em] uppercase text-muted font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id} className={`border-b border-border/50 transition-colors hover:bg-deep/50
                                              ${!p.isVisible ? 'opacity-50' : ''}`}>
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 bg-wood border border-border overflow-hidden flex items-center justify-center">
                        {p.images?.[0]
                          ? <img src={`${API}/uploads/${p.images[0]}`} alt={p.name}
                                 className="w-full h-full object-cover" />
                          : <span className="text-xl opacity-30">🪵</span>
                        }
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-cream">{p.name}</div>
                      <div className="text-xs text-muted truncate max-w-[200px]">{p.description}</div>
                      {p.isFeatured && <span className="text-[9px] bg-gold text-ink px-1.5 py-0.5 mt-1 inline-block tracking-wider uppercase">Featured</span>}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs text-gold border border-gold-dim px-2 py-0.5 tracking-wider">{p.category}</span>
                    </td>
                    <td className="py-3 px-4 font-display text-xl text-white">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1">
                        <span className={`text-[9px] tracking-widest uppercase px-2 py-0.5 w-fit
                          ${p.isVisible ? 'bg-green-900/40 text-green-400' : 'bg-border text-muted'}`}>
                          {p.isVisible ? 'Visible' : 'Hidden'}
                        </span>
                        <span className={`text-[9px] tracking-widest uppercase px-2 py-0.5 w-fit
                          ${p.inStock ? 'bg-blue-900/40 text-blue-400' : 'bg-red-900/40 text-red-400'}`}>
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(p)} title="Edit"
                          className="w-8 h-8 flex items-center justify-center text-muted
                                     hover:text-gold hover:bg-wood border border-transparent
                                     hover:border-border transition-all">
                          <FiEdit2 size={13} />
                        </button>
                        <button onClick={() => toggleVisibility(p)} title={p.isVisible ? 'Hide' : 'Show'}
                          className="w-8 h-8 flex items-center justify-center text-muted
                                     hover:text-gold hover:bg-wood border border-transparent
                                     hover:border-border transition-all">
                          {p.isVisible ? <FiEyeOff size={13} /> : <FiEye size={13} />}
                        </button>
                        <button onClick={() => deleteProduct(p)} title="Delete"
                          disabled={deleting === p._id}
                          className="w-8 h-8 flex items-center justify-center text-muted
                                     hover:text-red-400 hover:bg-wood border border-transparent
                                     hover:border-border transition-all disabled:opacity-40">
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
 
      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="w-full max-w-2xl bg-deep border border-border">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="font-display text-2xl text-white">
                {editing ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-muted hover:text-cream transition-colors">
                <FiX size={20} />
              </button>
            </div>
 
            <form onSubmit={save} className="p-6 flex flex-col gap-5">
              {/* Name & Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Product Name *</label>
                  <input required className="input-field" placeholder="e.g. Grand Teak Door"
                         value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label className="form-label">Price (₹) *</label>
                  <input required type="number" min="0" className="input-field" placeholder="e.g. 15000"
                         value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                </div>
              </div>
 
              {/* Category */}
              <div>
                <label className="form-label">Category *</label>
                <select className="input-field" value={form.category}
                        onChange={e => setForm({...form, category: e.target.value})}>
                  {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
 
              {/* Description */}
              <div>
                <label className="form-label">Description *</label>
                <textarea required rows={3} className="input-field resize-none"
                          placeholder="Describe the product — material, finish, features…"
                          value={form.description}
                          onChange={e => setForm({...form, description: e.target.value})} />
              </div>
 
              {/* Material / Dimensions / Finish */}
              <div className="grid grid-cols-3 gap-4">
                {[['material','Material','Solid Wood'],['dimensions','Dimensions','e.g. 84" x 36"'],['finish','Finish','Natural']].map(([k,l,p]) => (
                  <div key={k}>
                    <label className="form-label">{l}</label>
                    <input className="input-field" placeholder={p}
                           value={form[k]} onChange={e => setForm({...form, [k]: e.target.value})} />
                  </div>
                ))}
              </div>
 
              {/* Toggles */}
              <div className="flex flex-wrap gap-6">
                {[['inStock','In Stock'],['isFeatured','Featured'],['isVisible','Visible']].map(([k,l]) => (
                  <label key={k} className="flex items-center gap-2 cursor-pointer">
                    <div className={`w-10 h-5 rounded-full relative transition-colors
                                    ${form[k] ? 'bg-gold' : 'bg-border'}`}
                         onClick={() => setForm({...form, [k]: !form[k]})}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all
                                      ${form[k] ? 'left-5' : 'left-0.5'}`} />
                    </div>
                    <span className="text-xs text-cream-dim tracking-wider">{l}</span>
                  </label>
                ))}
              </div>
 
              {/* Image upload */}
              <div>
                <label className="form-label">Product Images (max 5)</label>
 
                {/* Existing images */}
                {editing?.images?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {editing.images.map((img, i) => (
                      <div key={i} className="relative w-16 h-16 border border-border overflow-hidden">
                        <img src={`${API}/uploads/${img}`} alt="" className="w-full h-full object-cover" />
                        <span className="absolute top-0.5 right-0.5 text-[8px] text-muted bg-ink/80 px-1">saved</span>
                      </div>
                    ))}
                  </div>
                )}
 
                {/* New file previews */}
                {previews.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {previews.map((url, i) => (
                      <div key={i} className="relative w-16 h-16 border border-gold-dim overflow-hidden">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeNewFile(i)}
                          className="absolute top-0.5 right-0.5 bg-ink/80 text-cream rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
 
                <button type="button" onClick={() => fileRef.current.click()}
                  className="btn-ghost text-[10px] px-5 py-2.5 flex items-center gap-2">
                  <FiUpload size={13} /> Upload Images
                </button>
                <input ref={fileRef} type="file" multiple accept="image/*" className="hidden"
                       onChange={handleFileChange} />
                <p className="text-[10px] text-muted mt-2">JPG, PNG or WebP — max 5MB each</p>
              </div>
 
              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-border">
                <button type="submit" disabled={saving} className="btn-gold flex-1 justify-center disabled:opacity-50">
                  {saving ? 'Saving…' : (editing ? 'Update Product' : 'Add Product')} →
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-ghost px-6">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}