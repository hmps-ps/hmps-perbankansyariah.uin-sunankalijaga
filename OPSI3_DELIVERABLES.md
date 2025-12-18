# 🚀 OPSI 3 ENTERPRISE - DELIVERABLES LENGKAP

## YANG AKAN DIKERJAKAN UNTUK OPSI 3

### PART 1: DATABASE SETUP (SQL + Supabase)

#### A. Create Tables (3 Tabel)

**Tabel 1: `about_page_content`**
```sql
CREATE TABLE about_page_content (
  id SERIAL PRIMARY KEY,
  section_type VARCHAR (hero, story, stats, vision, mission, values, cta),
  section_name VARCHAR (display name),
  content JSONB (flexible JSON structure),
  is_published BOOLEAN DEFAULT false,
  version INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users,
  updated_by UUID REFERENCES auth.users
);
```

**Tabel 2: `about_page_revisions` (Version Control)**
```sql
CREATE TABLE about_page_revisions (
  id SERIAL PRIMARY KEY,
  content_id INT REFERENCES about_page_content(id),
  section_type VARCHAR,
  old_content JSONB,
  new_content JSONB,
  change_summary TEXT,
  changed_by UUID REFERENCES auth.users,
  changed_at TIMESTAMP DEFAULT NOW(),
  reason TEXT
);
```

**Tabel 3: `about_page_settings` (Global Settings)**
```sql
CREATE TABLE about_page_settings (
  id SERIAL PRIMARY KEY,
  auto_publish BOOLEAN DEFAULT false,
  draft_enabled BOOLEAN DEFAULT true,
  schedule_publish_date TIMESTAMP,
  preview_url VARCHAR,
  last_published_at TIMESTAMP,
  last_published_by UUID REFERENCES auth.users,
  theme_color VARCHAR (primary color),
  show_version_history BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users
);
```

#### B. Insert Default Data
```sql
-- 6 sections dengan default content dari current About page
INSERT INTO about_page_content (section_type, section_name, content, created_by, updated_by) VALUES
-- Hero section
-- Story section
-- Stats section
-- Vision section
-- Mission section
-- Values section
-- CTA section
```

#### C. Create Indexes
```sql
-- Untuk query performance
CREATE INDEX idx_about_section_type ON about_page_content(section_type);
CREATE INDEX idx_about_published ON about_page_content(is_published);
CREATE INDEX idx_revisions_content_id ON about_page_revisions(content_id);
CREATE INDEX idx_revisions_date ON about_page_revisions(changed_at);
```

#### D. Create Row Level Security (RLS)
```sql
-- Security policies
- PUBLIC can SELECT published content
- AUTHENTICATED can INSERT/UPDATE draft
- ADMIN can PUBLISH/DELETE
```

---

### PART 2: BACKEND API (React Hooks)

#### A. Create Custom Hooks
```tsx
// hooks/useAboutPageContent.ts
- fetchAboutContent() - Get current content
- updateAboutContent() - Update section
- publishContent() - Publish draft
- revertToRevision() - Restore old version
- getRevisionHistory() - Get all versions
- getDraftStatus() - Check if has unsaved

// hooks/useAboutPageSettings.ts
- fetchSettings() - Get global settings
- updateSettings() - Update settings
- schedulePublish() - Schedule auto-publish
- getPreviewUrl() - Generate preview link
```

#### B. Create Service Functions
```tsx
// lib/about-page-service.ts
- AboutPageService class dengan methods:
  * getAllSections()
  * getSectionById()
  * updateSection()
  * publishSection()
  * saveDraft()
  * discardDraft()
  * getVersionHistory()
  * compareVersions()
  * revertToVersion()
  * exportContent()
  * importContent()
```

---

### PART 3: ADMIN EDITOR UI (React Components)

#### A. Main Admin Dashboard
```tsx
// pages/admin/AboutPageEditor.tsx
- Layout: Sidebar + Main Content
- Features:
  ✅ Section selector (dropdown/tabs)
  ✅ Live preview panel (right side)
  ✅ Editor panel (left side)
  ✅ Status indicators (draft/published)
  ✅ Version history sidebar
  ✅ Publish/Save buttons
```

#### B. Section Editors (Reusable Components)

**Editor untuk HERO Section**
```tsx
<HeroEditor />
- Input: title, subtitle, description
- Live preview
- Character count
- Markdown support (optional)
```

**Editor untuk STORY Section**
```tsx
<StoryEditor />
- Input: badge, heading, paragraph1, paragraph2, button_text
- Rich text editor
- Preview
- URL input untuk button
```

**Editor untuk STATS Section**
```tsx
<StatsEditor />
- 4 items each dengan: value, label
- Drag-to-reorder
- Add/remove item
- Icon selector
```

**Editor untuk VISION Section**
```tsx
<VisionEditor />
- Title input
- Rich text for content
- Preview
```

**Editor untuk MISSION Section**
```tsx
<MissionEditor />
- Title input
- 3 points list (add/remove/edit)
- Rich text for each point
```

**Editor untuk VALUES Section**
```tsx
<ValuesEditor />
- 4 items each dengan: title, description
- Drag-to-reorder
- Add/remove values
- Icon selector
```

**Editor untuk CTA Section**
```tsx
<CTAEditor />
- Heading, description, button text
- Button color picker
- Button link input
```

#### C. Supporting UI Components

**Version History Panel**
```tsx
<VersionHistoryPanel />
- List semua revisions
- Timestamp + author
- Change summary
- "Restore" button
- "Compare" button
```

**Preview Panel**
```tsx
<LivePreviewPanel />
- Real-time preview of changes
- Different screen sizes (mobile/tablet/desktop)
- Dark mode toggle
- Full-screen preview option
```

**Publish Dialog**
```tsx
<PublishDialog />
- Confirm publish
- Option to schedule (date/time picker)
- Change summary text area
- "Publish Now" or "Schedule" button
```

**Compare Versions Modal**
```tsx
<CompareVersionsModal />
- Side-by-side comparison
- Old version vs new version
- Diff highlighting
- "Restore" button
```

#### D. Admin Layout Wrapper
```tsx
<AdminAboutLayout />
- Header dengan: logo, title, user info
- Sidebar dengan: section selector, version history, settings
- Main content area
- Toast notifications untuk feedback
```

---

### PART 4: UPDATE ABOUT PAGE COMPONENT

#### A. Make Dynamic
```tsx
// pages/About.tsx (UPDATE)
// FROM: Hardcoded values
// TO: Fetch dari database

- useAboutPageContent() hook
- Conditional render (loading/error/success)
- Show published version only
- Fallback ke default jika tidak ada
```

#### B. Add Features
```tsx
✅ Loading skeleton
✅ Error boundary
✅ Last updated timestamp
✅ Draft indicator (if user is admin)
✅ Edit button (if user is admin)
```

---

### PART 5: ADDITIONAL FEATURES

#### A. Version Control System
```
✅ Track all changes
✅ Show who changed what & when
✅ View change history
✅ Compare versions side-by-side
✅ Restore to any previous version
✅ Automatic timestamps
```

#### B. Draft & Publish System
```
✅ Save as draft (no publish)
✅ Preview draft before publish
✅ Publish immediately
✅ Schedule publish (set date/time)
✅ Unpublish (go back to draft)
✅ Auto-revert on error
```

#### C. Collaboration Features
```
✅ Track who edited what
✅ Show last editor info
✅ Edit notifications (optional)
✅ Edit locking (prevent conflicts)
```

#### D. Admin Settings Page
```
✅ Global settings for About page
✅ Enable/disable auto-publish
✅ Configure theme colors
✅ Toggle features on/off
✅ Export content (JSON)
✅ Import content (JSON)
```

---

### PART 6: SECURITY & VALIDATION

#### A. Input Validation
```tsx
✅ Required fields check
✅ Max character length
✅ Valid URLs for buttons
✅ Allowed HTML tags only
✅ XSS prevention
```

#### B. Access Control (RLS)
```sql
✅ PUBLIC: Can READ published content
✅ AUTHENTICATED: Can DRAFT edits
✅ ADMIN: Can PUBLISH & DELETE
✅ SUPER_ADMIN: Full control
```

#### C. Data Integrity
```
✅ Required fields validation
✅ Type checking
✅ Backup automatic (revisions)
✅ Rollback capability
✅ Audit log
```

---

### PART 7: FILE CHANGES SUMMARY

#### New Files to Create:
```
✅ src/lib/about-page-service.ts (service layer)
✅ src/hooks/useAboutPageContent.ts (custom hook)
✅ src/hooks/useAboutPageSettings.ts (custom hook)
✅ src/pages/admin/AboutPageEditor.tsx (main editor)
✅ src/components/admin/HeroEditor.tsx
✅ src/components/admin/StoryEditor.tsx
✅ src/components/admin/StatsEditor.tsx
✅ src/components/admin/VisionEditor.tsx
✅ src/components/admin/MissionEditor.tsx
✅ src/components/admin/ValuesEditor.tsx
✅ src/components/admin/CTAEditor.tsx
✅ src/components/admin/VersionHistoryPanel.tsx
✅ src/components/admin/LivePreviewPanel.tsx
✅ src/components/admin/PublishDialog.tsx
✅ src/components/admin/CompareVersionsModal.tsx
✅ src/pages/admin/AboutPageSettings.tsx (settings page)
```

#### Files to Update:
```
✅ src/App.tsx (add admin routes)
✅ src/pages/About.tsx (make dynamic)
✅ src/lib/supabase.ts (add types)
✅ tailwind.config.ts (add admin styles if needed)
```

---

### PART 8: DELIVERABLES CHECKLIST

#### Database
- [ ] SQL script untuk 3 tabel
- [ ] Default data insert
- [ ] Indexes untuk performance
- [ ] RLS policies untuk security
- [ ] Ready to run di Supabase

#### Backend
- [ ] Service layer (about-page-service.ts)
- [ ] Custom hooks (useAboutPageContent, useAboutPageSettings)
- [ ] Type definitions
- [ ] Error handling

#### Frontend - Admin UI
- [ ] Main editor dashboard
- [ ] 7 section editors (Hero, Story, Stats, Vision, Mission, Values, CTA)
- [ ] Version history panel
- [ ] Live preview panel
- [ ] Publish dialog
- [ ] Compare versions modal
- [ ] Settings page

#### Frontend - Public View
- [ ] Updated About page (dynamic from DB)
- [ ] Loading states
- [ ] Error handling
- [ ] Fallbacks

#### Quality
- [ ] Zero TypeScript errors
- [ ] No console errors
- [ ] Fully responsive (mobile/tablet/desktop)
- [ ] Dark mode support
- [ ] Accessibility (WCAG AA)
- [ ] Performance optimized

---

### PART 9: TIMELINE ESTIMATION

```
Phase 1: Database Setup (30 min)
├─ Write SQL script
├─ Test locally
└─ Ready for Supabase

Phase 2: Backend (1 hour)
├─ Service layer
├─ Custom hooks
├─ Type definitions
└─ Error handling

Phase 3: Admin UI - Main (1.5 hours)
├─ Main dashboard layout
├─ Editor framework
├─ Form components
└─ Preview panel

Phase 4: Admin UI - Editors (1.5 hours)
├─ Build 7 section editors
├─ Drag-to-reorder
├─ Live preview
└─ Form validation

Phase 5: Features & Polish (1 hour)
├─ Version history
├─ Publish/Draft system
├─ Compare modal
└─ Settings page

Phase 6: Integration (30 min)
├─ Update About page
├─ Add admin routes
├─ Test everything
└─ Fix bugs

TOTAL: ~6 hours development

---

### PART 10: FINAL DELIVERABLE

Anda akan mendapat:

✅ **SQL Script** - Copy-paste ke Supabase
✅ **Complete Admin UI** - Edit semua content
✅ **Dynamic About Page** - Fetch dari database
✅ **Version Control** - Track semua changes
✅ **Draft & Publish** - Safe editing workflow
✅ **Live Preview** - See changes real-time
✅ **Revision History** - Restore old versions
✅ **Settings Panel** - Global configuration
✅ **Zero Errors** - Production-ready code
✅ **Full Documentation** - Cara pakai lengkap

---

## 🎯 KESIMPULAN OPSI 3

**Yang dikerjakan:**
1. Database: 3 tabel + security + indexes
2. Backend: Service layer + hooks + types
3. Admin UI: 1 dashboard + 7 editors + panels + modals
4. Public: Updated About page (dynamic)
5. Features: Version control, draft, publish, preview, compare

**Hasilnya:**
- 💎 Enterprise-grade CMS untuk About page
- 🔐 Secure dengan RLS policies
- 📝 Full version control & audit log
- 👥 Multi-user safe editing
- 🚀 Production-ready

**Estimated Time:** ~6 hours total

---

**Ready? Saya siap mulai! Butuh:**
1. Konfirmasi Opsi 3
2. Kapan dimulai?
3. Priority: SQL dulu atau langsung all-in?
