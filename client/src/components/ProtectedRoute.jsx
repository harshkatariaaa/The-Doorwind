import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-ink flex items-center justify-center"><div className="font-display text-2xl text-gold">Loading…</div></div>;
  return admin ? children : <Navigate to="/admin" replace />;
}