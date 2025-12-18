-- ============================================
-- MIGRATION: Create Admin Users Table
-- ============================================
-- Purpose: Store admin credentials with hashed passwords
-- Migration Date: 2025-12-18
-- Status: READY TO RUN IN SUPABASE
-- ============================================

-- ============================================
-- CREATE ADMIN USERS TABLE
-- ============================================
DROP TABLE IF EXISTS public.admin_users CASCADE;

CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster username lookups
CREATE INDEX idx_admin_users_username ON public.admin_users(username);

-- ============================================
-- INSERT DEFAULT ADMIN USER
-- ============================================
-- Password: dyasforhmps2025
-- Username: dyas
-- Note: Password is hashed using bcrypt (cost 10)
-- CORRECT Hash: $2b$10$/huiOTwY.6AC3nZnr5mnJ.t/ph.Vhl.ZrOkgofG8U756hiVDnYuz6

INSERT INTO public.admin_users (username, password_hash, email, is_active)
VALUES (
  'dyas',
  '$2b$10$/huiOTwY.6AC3nZnr5mnJ.t/ph.Vhl.ZrOkgofG8U756hiVDnYuz6',
  'dyas@hmpsperbankansy ariah.id',
  true
)
ON CONFLICT (username) DO NOTHING;

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DROP EXISTING POLICIES (if any)
-- ============================================
DROP POLICY IF EXISTS "Allow public to read admin_users for login" ON public.admin_users;
DROP POLICY IF EXISTS "Allow public login query" ON public.admin_users;
DROP POLICY IF EXISTS "Prevent unauthorized modifications" ON public.admin_users;
DROP POLICY IF EXISTS "Prevent unauthorized deletions" ON public.admin_users;

-- ============================================
-- CREATE NEW RLS POLICIES
-- ============================================
-- Policy 1: Allow public to read for login
CREATE POLICY "Allow public to read admin_users for login"
  ON public.admin_users
  FOR SELECT
  USING (is_active = true);

-- Policy 2: Prevent unauthorized modifications
CREATE POLICY "Prevent unauthorized modifications"
  ON public.admin_users
  FOR UPDATE
  USING (false);

-- Policy 3: Prevent unauthorized deletions
CREATE POLICY "Prevent unauthorized deletions"
  ON public.admin_users
  FOR DELETE
  USING (false);

-- ============================================
-- VERIFY DATA
-- ============================================
SELECT 'Admin table created successfully' AS status;
SELECT * FROM public.admin_users WHERE username = 'dyas';

