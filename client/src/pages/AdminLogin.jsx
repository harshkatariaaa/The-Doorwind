import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login }             = useAuth();
  const navigate              = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in both fields');
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">

      {/* Background pattern */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 48px,#c8953a 48px,#c8953a 49px),' +
            'repeating-linear-gradient(90deg,transparent,transparent 48px,#c8953a 48px,#c8953a 49px)'
        }}
      />

      <div className="w-full max-w-sm relative z-10">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="font-display text-4xl font-semibold tracking-widest text-white mb-1">
            THE <span className="text-gold">DOOR</span>WIND
          </div>
          <div className="text-[9px] tracking-[0.45em] uppercase text-muted">
            Admin Panel
          </div>
        </div>

        {/* Card */}
        <div className="bg-deep border border-border p-8">

          {/* Gold top bar */}
          <div className="h-0.5 bg-gradient-to-r from-gold-dim via-gold to-gold-dim -mx-8 -mt-8 mb-8" />

          <h2 className="font-display text-2xl font-light text-white mb-1 text-center">
            Sign In
          </h2>
          <p className="text-[11px] tracking-wider text-muted text-center mb-8 uppercase">
            Enter your admin credentials
          </p>

          <form onSubmit={submit} className="flex flex-col gap-5" noValidate>

            {/* Email */}
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                autoComplete="email"
                className="input-field"
                placeholder="admin@thedoorwind.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="input-field pr-12"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-gold transition-colors text-[11px] tracking-widest uppercase"
                  tabIndex={-1}
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Signing in…
                </span>
              ) : (
                'Sign In →'
              )}
            </button>
          </form>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-muted/40 mt-6 leading-relaxed">
          First time? Run{' '}
          <code className="text-gold/70 font-mono">
            POST /api/auth/seed
          </code>{' '}
          to create the admin account.
        </p>

        {/* Back to site link */}
        <div className="text-center mt-4">
          <a href="/" className="text-[10px] tracking-widest uppercase text-muted/50 hover:text-gold transition-colors">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}