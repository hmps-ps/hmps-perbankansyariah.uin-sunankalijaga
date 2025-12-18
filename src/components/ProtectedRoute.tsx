// ============================================
// FILE: src/components/ProtectedRoute.tsx
// DESKRIPSI: Route guard untuk admin pages
// ============================================

import { Navigate } from 'react-router-dom';
import { checkAdminSession } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute - Mencegah akses halaman admin tanpa login
 * Jika user belum login, redirect ke /admin/login
 * Jika sudah login, render halaman yang diminta
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = checkAdminSession();

  if (!isLoggedIn) {
    console.warn('⚠️ Access denied - not authenticated. Redirecting to login...');
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
