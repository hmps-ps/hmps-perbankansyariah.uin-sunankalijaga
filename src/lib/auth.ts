// ============================================
// FILE: src/lib/auth.ts
// DESKRIPSI: Authentication Service dengan Supabase
// ============================================

import { supabase } from './supabase';
import bcryptjs from 'bcryptjs';

/**
 * Login admin dengan username dan password
 * @param username Username admin
 * @param password Password plain text
 * @returns { success: boolean, token?: string, error?: string }
 */
export const loginAdmin = async (
  username: string,
  password: string
): Promise<{ success: boolean; token?: string; error?: string }> => {
  try {
    // 1. Query admin user dari database
    const { data: adminData, error: queryError } = await supabase
      .from('admin_users')
      .select('id, username, password_hash')
      .eq('username', username)
      .eq('is_active', true)
      .single();

    if (queryError || !adminData) {
      console.error('❌ User not found or inactive:', queryError);
      return { success: false, error: 'Username atau password salah' };
    }

    // 2. Compare password dengan hash
    const passwordMatch = await bcryptjs.compare(
      password,
      adminData.password_hash
    );

    if (!passwordMatch) {
      console.error('❌ Password mismatch');
      return { success: false, error: 'Username atau password salah' };
    }

    // 3. Generate JWT token (simple implementation)
    // Format: base64(username.timestamp.random)
    const token = btoa(
      `${adminData.id}.${Date.now()}.${Math.random().toString(36).slice(2)}`
    );

    // 4. Store token dan info admin di localStorage
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_id', adminData.id);
    localStorage.setItem('admin_username', username);
    localStorage.setItem('admin_login_time', new Date().toISOString());

    // 5. Update last_login di database
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminData.id);

    console.log('✅ Login berhasil:', username);
    return { success: true, token };
  } catch (error) {
    console.error('💥 Login error:', error);
    return { success: false, error: 'Terjadi kesalahan saat login' };
  }
};

/**
 * Logout admin - hapus token dan session
 */
export const logoutAdmin = async (): Promise<void> => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_id');
  localStorage.removeItem('admin_username');
  localStorage.removeItem('admin_login_time');
  console.log('✅ Logout berhasil');
};

/**
 * Check apakah admin sudah login
 * @returns { isLoggedIn: boolean, username?: string }
 */
export const checkAdminSession = (): {
  isLoggedIn: boolean;
  username?: string;
} => {
  const token = localStorage.getItem('admin_token');
  const username = localStorage.getItem('admin_username');

  if (!token || !username) {
    return { isLoggedIn: false };
  }

  // Check token expiry (24 hours)
  const loginTime = localStorage.getItem('admin_login_time');
  if (loginTime) {
    const loginDate = new Date(loginTime);
    const now = new Date();
    const hoursDiff =
      (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      console.warn('⚠️ Session expired (24 hours)');
      logoutAdmin();
      return { isLoggedIn: false };
    }
  }

  return { isLoggedIn: true, username };
};

/**
 * Get current admin token
 */
export const getAdminToken = (): string | null => {
  return localStorage.getItem('admin_token');
};

/**
 * Hash password untuk digunakan saat create/update admin
 * NOTE: Ini hanya untuk reference - use on server-side untuk security!
 * @param password Plain text password
 * @param saltRounds bcrypt salt rounds (default 10)
 */
export const hashPassword = async (
  password: string,
  saltRounds: number = 10
): Promise<string> => {
  return await bcryptjs.hash(password, saltRounds);
};

/**
 * Verify password (untuk testing)
 * @param password Plain text password
 * @param hash Password hash
 */
export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcryptjs.compare(password, hash);
};
