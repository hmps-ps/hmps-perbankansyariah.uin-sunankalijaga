-- ============================================
-- MIGRATION: Add logo_url to Story Section
-- ============================================
-- Purpose: Add logo_url field to about_page_content story section
-- This allows editing logo directly in the Story section
-- Logo displays in Home page next to "Tentang Kami" section
-- highlight_number displays in About page next to story text
-- Migration Date: 2025-12-18
-- Status: READY TO RUN IN SUPABASE
-- ============================================

-- ============================================
-- UPDATE STORY SECTION: Add logo_url
-- ============================================
UPDATE public.about_page_content
SET content = content || jsonb_build_object('logo_url', '')
WHERE section_type = 'story'
AND NOT (content ? 'logo_url');

-- Add migration note
UPDATE public.about_page_content
SET notes = 'Added: logo_url field for story section logo editor',
    updated_at = NOW()
WHERE section_type = 'story'
AND (content ? 'logo_url');

-- ============================================
-- VERIFY MIGRATION RESULTS
-- ============================================
-- Run this SELECT query to verify the data was updated correctly:

-- Check STORY section with logo_url
-- SELECT id, section_type, content FROM public.about_page_content WHERE section_type = 'story';

-- ============================================
-- NOTES:
-- ============================================
-- 1. This migration adds logo_url field to story section JSON (nested)
-- 2. Default value is empty string ""
-- 3. Can be edited directly in AdminDashboard Story form
-- 4. URL format: any valid image URL
-- 5. Displays in Home page (sebelah "Tentang Kami") with image preview
-- 6. Migration is idempotent - safe to run multiple times
-- 7. highlight_number field displays in About page next to story text
-- 8. Both fields controlled from same AdminDashboard Story editor form
-- ============================================
