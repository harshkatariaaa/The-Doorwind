import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem('doorwind_token')) {
      api.get('/auth/me').then(r => setAdmin(r.data.admin)).catch(() => localStorage.removeItem('doorwind_token')).finally(() => setLoading(false));
    } else setLoading(false);
  }, []);
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('doorwind_token', res.data.token);
    setAdmin(res.data.admin);
  };
  const logout = () => { localStorage.removeItem('doorwind_token'); setAdmin(null); };
  return <AuthContext.Provider value={{ admin, loading, login, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);