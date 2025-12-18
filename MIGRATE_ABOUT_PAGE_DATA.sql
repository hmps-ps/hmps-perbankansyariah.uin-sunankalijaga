-- ============================================
-- MIGRATION: Fix About Page Data Structure
-- ============================================
-- Purpose: Restructure about_page_content to use semantic field names
-- Migration Date: 2025-12-18
-- Status: READY TO RUN IN SUPABASE
--
-- This migration updates the JSON structure from:
--   { items: [...] }
-- To:
--   { stats: [...] }, { mission: [...] }, { values: [...] }
--
-- After running this, update your code to use the new structure
-- ============================================

-- ============================================
-- STEP 1: Update STATS section
-- ============================================
UPDATE public.about_page_content
SET content = jsonb_set(
  content,
  '{stats}',
  content->'items'
) || jsonb_build_object('title', 'Statistik')
WHERE section_type = 'stats'
AND content ? 'items'
AND NOT (content ? 'stats');

-- Add migration note
UPDATE public.about_page_content
SET notes = 'Migrated: items → stats field',
    updated_at = NOW()
WHERE section_type = 'stats';

-- ============================================
-- STEP 2: Update MISSION section
-- ============================================
-- Keep mission items as array but rename from 'items' to 'mission'
UPDATE public.about_page_content
SET content = jsonb_set(
  content,
  '{mission}',
  content->'items'
) || jsonb_build_object('title', 'Misi Kami')
WHERE section_type = 'mission'
AND content ? 'items'
AND NOT (content ? 'mission');

-- Add migration note
UPDATE public.about_page_content
SET notes = 'Migrated: items → mission field',
    updated_at = NOW()
WHERE section_type = 'mission';

-- ============================================
-- STEP 3: Update VALUES section
-- ============================================
UPDATE public.about_page_content
SET content = jsonb_set(
  content,
  '{values}',
  content->'items'
) || jsonb_build_object('title', 'Nilai Inti Kami')
WHERE section_type = 'values'
AND content ? 'items'
AND NOT (content ? 'values');

-- Add migration note
UPDATE public.about_page_content
SET notes = 'Migrated: items → values field',
    updated_at = NOW()
WHERE section_type = 'values';

-- ============================================
-- STEP 4: Verify migration results
-- ============================================
-- Run these SELECT queries to verify the data was migrated correctly:

-- Check STATS
-- SELECT id, section_type, content FROM public.about_page_content WHERE section_type = 'stats';

-- Check MISSION
-- SELECT id, section_type, content FROM public.about_page_content WHERE section_type = 'mission';

-- Check VALUES
-- SELECT id, section_type, content FROM public.about_page_content WHERE section_type = 'values';

-- ============================================
-- NOTES:
-- ============================================
-- 1. This migration transforms the JSON structure to be more semantic
-- 2. Each section now uses its own field name instead of generic "items"
-- 3. Old "items" field is NOT deleted (can be added to WHERE clause if needed)
-- 4. All migrations include a title field for consistency
-- 5. All changes are idempotent - safe to run multiple times
-- ============================================
