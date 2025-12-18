-- ============================================
-- ABOUT PAGE CMS - SQL SCRIPT UNTUK SUPABASE
-- ============================================
-- Run semua SQL ini di Supabase SQL Editor
-- ============================================

-- TABEL 1: ABOUT PAGE CONTENT (Main content storage)
CREATE TABLE IF NOT EXISTS public.about_page_content (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  section_type VARCHAR(50) NOT NULL, -- 'hero', 'story', 'stats', 'vision', 'mission', 'values', 'cta'
  section_name VARCHAR(255) NOT NULL, -- Display name
  content JSONB NOT NULL DEFAULT '{}', -- Flexible JSON structure
  is_published BOOLEAN DEFAULT FALSE,
  version INT DEFAULT 1,
  status VARCHAR(50) DEFAULT 'draft', -- 'draft' or 'published'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP,
  created_by VARCHAR(255),
  updated_by VARCHAR(255),
  notes TEXT
);

-- TABEL 2: ABOUT PAGE REVISIONS (Version control & audit log)
CREATE TABLE IF NOT EXISTS public.about_page_revisions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  content_id BIGINT REFERENCES public.about_page_content(id) ON DELETE CASCADE,
  section_type VARCHAR(50),
  old_content JSONB,
  new_content JSONB,
  change_summary TEXT,
  change_type VARCHAR(50), -- 'create', 'update', 'delete', 'publish'
  changed_by VARCHAR(255),
  changed_at TIMESTAMP DEFAULT NOW(),
  reason TEXT
);

-- TABEL 3: ABOUT PAGE SETTINGS (Global configuration)
CREATE TABLE IF NOT EXISTS public.about_page_settings (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  auto_publish BOOLEAN DEFAULT FALSE,
  draft_enabled BOOLEAN DEFAULT TRUE,
  show_version_history BOOLEAN DEFAULT TRUE,
  last_published_at TIMESTAMP,
  last_published_by VARCHAR(255),
  theme_color VARCHAR(50) DEFAULT 'navy', -- 'navy', 'gold', 'green'
  feature_draft BOOLEAN DEFAULT TRUE,
  feature_schedule BOOLEAN DEFAULT TRUE,
  feature_preview BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by VARCHAR(255)
);

-- INDEXES untuk performance
CREATE INDEX IF NOT EXISTS idx_about_content_section_type ON public.about_page_content(section_type);
CREATE INDEX IF NOT EXISTS idx_about_content_status ON public.about_page_content(status);
CREATE INDEX IF NOT EXISTS idx_about_content_is_published ON public.about_page_content(is_published);
CREATE INDEX IF NOT EXISTS idx_about_content_updated_at ON public.about_page_content(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_about_revisions_content_id ON public.about_page_revisions(content_id);
CREATE INDEX IF NOT EXISTS idx_about_revisions_date ON public.about_page_revisions(changed_at DESC);
CREATE INDEX IF NOT EXISTS idx_about_revisions_section ON public.about_page_revisions(section_type);

-- ============================================
-- DEFAULT DATA - INITIAL CONTENT
-- ============================================

-- HERO Section
INSERT INTO public.about_page_content (section_type, section_name, content, status, created_by, updated_by)
VALUES (
  'hero',
  'Hero Section',
  '{
    "title": "Tentang Kami",
    "subtitle": "HMPS Perbankan Syariah",
    "description": "Organisasi Mahasiswa yang Berdedikasi untuk Pengembangan Keilmuan Perbankan Syariah",
    "background_type": "gradient"
  }',
  'published',
  'admin',
  'admin'
);

-- STORY Section
INSERT INTO public.about_page_content (section_type, section_name, content, status, created_by, updated_by)
VALUES (
  'story',
  'Story Section',
  '{
    "badge": "Kisah Kami",
    "heading": "Perjalanan Panjang Dedikasi",
    "paragraph1": "HMPS Perbankan Syariah didirikan dengan visi untuk menjadi pusat pembelajaran dan pengembangan keilmuan perbankan syariah di perguruan tinggi. Kami percaya bahwa pemahaman mendalam tentang prinsip-prinsip syariah dalam perbankan adalah kunci untuk masa depan ekonomi yang berkelanjutan.",
    "paragraph2": "Selama bertahun-tahun, kami telah berkontribusi dalam menghadirkan berbagai program edukasi, workshop, dan seminar yang melibatkan praktisi industri perbankan syariah. Komitmen kami adalah membentuk generasi profesional yang tidak hanya berkompeten di bidangnya tetapi juga berpegang teguh pada nilai-nilai etika dan syariah.",
    "button_text": "Baca Selengkapnya",
    "button_link": "#"
  }',
  'published',
  'admin',
  'admin'
);

-- STATS Section
INSERT INTO public.about_page_content (section_type, section_name, content, status, created_by, updated_by)
VALUES (
  'stats',
  'Statistics Section',
  '{
    "items": [
      {
        "value": "500+",
        "label": "Anggota Aktif",
        "icon": "Users"
      },
      {
        "value": "50+",
        "label": "Program Tahunan",
        "icon": "Award"
      },
      {
        "value": "10+",
        "label": "Tahun Berkontribusi",
        "icon": "Lightbulb"
      },
      {
        "value": "100%",
        "label": "Komitmen Syariah",
        "icon": "Target"
      }
    ]
  }',
  'published',
  'admin',
  'admin'
);

-- VISION Section
INSERT INTO public.about_page_content (section_type, section_name, content, status, created_by, updated_by)
VALUES (
  'vision',
  'Vision Section',
  '{
    "title": "Visi Kami",
    "content": "Menjadi organisasi mahasiswa terdepan dalam pengembangan dan penyebarluasan ilmu pengetahuan tentang perbankan syariah yang inklusif, berkelanjutan, dan berdampak positif bagi masyarakat luas."
  }',
  'published',
  'admin',
  'admin'
);

-- MISSION Section
INSERT INTO public.about_page_content (section_type, section_name, content, status, created_by, updated_by)
VALUES (
  'mission',
  'Mission Section',
  '{
    "title": "Misi Kami",
    "items": [
      "Menyelenggarakan program pendidikan dan pelatihan tentang perbankan syariah",
      "Membangun jaringan profesional dan kemitraan dengan industri perbankan syariah",
      "Mengembangkan riset dan inovasi dalam bidang perbankan syariah"
    ]
  }',
  'published',
  'admin',
  'admin'
);

-- VALUES Section
INSERT INTO public.about_page_content (section_type, section_name, content, status, created_by, updated_by)
VALUES (
  'values',
  'Core Values',
  '{
    "items": [
      {
        "title": "Integritas",
        "description": "Menjunjung tinggi nilai-nilai kejujuran, transparansi, dan akuntabilitas dalam setiap tindakan kami.",
        "icon": "Heart"
      },
      {
        "title": "Inovasi",
        "description": "Terus mengembangkan solusi kreatif dan inovatif untuk menghadapi tantangan di industri perbankan syariah.",
        "icon": "Lightbulb"
      },
      {
        "title": "Kolaborasi",
        "description": "Bekerja sama dengan berbagai pihak untuk mencapai tujuan bersama dan memperkuat komunitas.",
        "icon": "Users"
      },
      {
        "title": "Pendidikan",
        "description": "Berkomitmen untuk memberikan akses pendidikan berkualitas tinggi kepada semua anggota.",
        "icon": "BookOpen"
      }
    ]
  }',
  'published',
  'admin',
  'admin'
);

-- CTA Section
INSERT INTO public.about_page_content (section_type, section_name, content, status, created_by, updated_by)
VALUES (
  'cta',
  'Call to Action',
  '{
    "heading": "Bergabunglah Dengan Kami",
    "description": "Mari bersama-sama membangun masa depan perbankan syariah yang lebih baik dan berkelanjutan.",
    "button_primary_text": "Hubungi Kami",
    "button_primary_link": "/contact",
    "button_secondary_text": "Pelajari Lebih Lanjut",
    "button_secondary_link": "/divisions"
  }',
  'published',
  'admin',
  'admin'
);

-- Global Settings
INSERT INTO public.about_page_settings (auto_publish, draft_enabled, show_version_history, updated_by)
VALUES (FALSE, TRUE, TRUE, 'admin');

-- ============================================
-- ROW LEVEL SECURITY (RLS) - OPTIONAL
-- ============================================
-- Uncomment ini jika ingin enable RLS

/*
ALTER TABLE public.about_page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_page_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_page_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Public dapat read published content saja
CREATE POLICY "public_read_published"
  ON public.about_page_content
  FOR SELECT
  USING (is_published = TRUE);

-- Policy: Admin dapat read/write semua
CREATE POLICY "admin_all"
  ON public.about_page_content
  FOR ALL
  USING (TRUE);
*/

-- ============================================
-- DONE! 
-- ============================================
-- Tables created successfully
-- Default data inserted
-- Indexes created for performance
-- Ready to use!
