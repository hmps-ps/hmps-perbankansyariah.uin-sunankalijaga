-- ============================================
-- MIGRATION: Add highlight_number to Story Section
-- ============================================
-- Purpose: Add highlight_number field to about_page_content story section
-- This allows displaying a large gradient number (e.g., "8.0", "100+") 
-- next to the story text in About page
-- Migration Date: 2025-12-18
-- Status: READY TO RUN IN SUPABASE
-- ============================================

-- ============================================
-- UPDATE STORY SECTION: Add highlight_number
-- ============================================
UPDATE public.about_page_content
SET content = content || jsonb_build_object('highlight_number', '8.0')
WHERE section_type = 'story'
AND NOT (content ? 'highlight_number');

-- Add migration note
UPDATE public.about_page_content
SET notes = 'Added: highlight_number field for story display',
    updated_at = NOW()
WHERE section_type = 'story'
AND (content ? 'highlight_number');

-- ============================================
-- VERIFY MIGRATION RESULTS
-- ============================================
-- Run this SELECT query to verify the data was updated correctly:

-- Check STORY section with highlight_number
-- SELECT id, section_type, content FROM public.about_page_content WHERE section_type = 'story';

-- ============================================
-- NOTES:
-- ============================================
-- 1. This migration adds highlight_number field to story section JSON
-- 2. Default value is "8.0" but can be edited in AdminDashboard
-- 3. Supported formats: "8.0", "100+", "8 Tahun", etc (any string)
-- 4. The field is optional - story works fine without it
-- 5. The number displays with animated shimmer gradient effect
-- 6. Migration is idempotent - safe to run multiple times
-- ============================================
