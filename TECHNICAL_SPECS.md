# 🔧 DETAILED TECHNICAL SPECIFICATIONS
## Untuk Implementasi Grand Upgrade

---

## PART 1: DESIGN SYSTEM REVAMP

### Color System (Update tailwind.config.ts)
```tsx
// CURRENT COLOR SCHEME (Islamic Bank Theme)
colors: {
  // Primary: Authority & Trust
  primary: {
    50: '#f0f4ff',
    100: '#e0e9ff', 
    200: '#c1d2ff',
    300: '#a2bbff',
    400: '#8da4ff',
    500: '#002080',  // Main navy
    600: '#001f7a',
    700: '#001d73',
    800: '#001a66',
    900: '#001459'
  },
  
  // Secondary: Luxury & Gold
  secondary: {
    50: '#fffaf0',
    100: '#fef3e2',
    200: '#fde8c4',
    300: '#fcdda6',
    400: '#fbd28a',
    500: '#D4A574',  // Main gold
    600: '#c49860',
    700: '#b38d4e',
    800: '#a2823c',
    900: '#91762a'
  },
  
  // Accent: Islamic Green
  accent: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#1F4620',  // Main green
    600: '#1b4419',
    700: '#166318',
    800: '#127814',
    900: '#0d4a0f'
  },
  
  // Neutrals
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e7e7e7',
    300: '#d1d1d1',
    400: '#b4b4b4',
    500: '#808080',
    600: '#666666',
    700: '#4d4d4d',
    800: '#333333',
    900: '#1a1a1a'
  }
}
```

### Typography Update (tailwind.config.ts)
```tsx
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  accent: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
  mono: ['Fira Code', 'monospace']
},

fontSize: {
  xs: ['12px', { lineHeight: '16px', letterSpacing: '0.5px' }],
  sm: ['14px', { lineHeight: '20px', letterSpacing: '0.25px' }],
  base: ['16px', { lineHeight: '24px', letterSpacing: '0.15px' }],
  lg: ['18px', { lineHeight: '28px', letterSpacing: '0.1px' }],
  xl: ['24px', { lineHeight: '32px', fontWeight: '600' }],
  '2xl': ['32px', { lineHeight: '40px', fontWeight: '600' }],
  '3xl': ['48px', { lineHeight: '56px', fontWeight: '700' }],
  '4xl': ['64px', { lineHeight: '72px', fontWeight: '700' }]
}
```

### Animations (tailwind.config.ts)
```tsx
keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' }
  },
  slideUp: {
    '0%': { transform: 'translateY(20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' }
  },
  slideDown: {
    '0%': { transform: 'translateY(-20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' }
  },
  slideLeft: {
    '0%': { transform: 'translateX(-20px)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' }
  },
  slideRight: {
    '0%': { transform: 'translateX(20px)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' }
  },
  scale: {
    '0%': { transform: 'scale(0.95)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' }
  },
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' }
  },
  bounce: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' }
  },
  spin: {
    'from': { transform: 'rotate(0deg)' },
    'to': { transform: 'rotate(360deg)' }
  },
  shimmer: {
    '0%': { backgroundPosition: '1000px 0' },
    '100%': { backgroundPosition: '-1000px 0' }
  },
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' }
  },
  glow: {
    '0%, 100%': { boxShadow: '0 0 5px rgba(212, 165, 116, 0.5)' },
    '50%': { boxShadow: '0 0 20px rgba(212, 165, 116, 0.8)' }
  }
},

animation: {
  fadeIn: 'fadeIn 0.3s ease-in',
  slideUp: 'slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  slideDown: 'slideDown 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  slideLeft: 'slideLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  slideRight: 'slideRight 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  scale: 'scale 0.3s ease-in',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  bounce: 'bounce 1s infinite',
  spin: 'spin 1s linear infinite',
  shimmer: 'shimmer 2s infinite',
  float: 'float 3s ease-in-out infinite',
  glow: 'glow 2s ease-in-out infinite'
}
```

### Enhanced Components (index.css)
```css
@layer components {
  /* Gradient Backgrounds */
  .bg-gradient-navy-gold {
    @apply bg-gradient-to-r from-primary-900 via-primary-700 to-secondary-500;
  }
  
  .bg-gradient-gold-green {
    @apply bg-gradient-to-r from-secondary-500 via-secondary-400 to-accent-600;
  }
  
  .bg-gradient-navy-green {
    @apply bg-gradient-to-br from-primary-900 to-accent-600;
  }
  
  /* Glassmorphism */
  .glass {
    @apply bg-white/20 backdrop-blur-md border border-white/30 rounded-xl;
  }
  
  .glass-dark {
    @apply bg-slate-950/20 backdrop-blur-md border border-white/10 rounded-xl;
  }
  
  /* Glow Effects */
  .glow-gold {
    @apply shadow-lg shadow-secondary-500/50;
  }
  
  .glow-accent {
    @apply shadow-lg shadow-accent-600/50;
  }
  
  /* Hover Effects */
  .hover-lift {
    @apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
  }
  
  .hover-scale {
    @apply transition-transform duration-300 hover:scale-105;
  }
  
  .hover-glow {
    @apply transition-shadow duration-300 hover:glow-gold;
  }
  
  /* Text Effects */
  .text-gradient {
    @apply bg-gradient-to-r from-primary-900 to-secondary-500 bg-clip-text text-transparent;
  }
  
  .text-gradient-green {
    @apply bg-gradient-to-r from-secondary-500 to-accent-600 bg-clip-text text-transparent;
  }
  
  /* Section Styles */
  .section {
    @apply py-12 sm:py-16 md:py-20 lg:py-24;
  }
  
  .section-tight {
    @apply py-8 sm:py-12 md:py-16;
  }
  
  .section-spacious {
    @apply py-16 sm:py-24 md:py-32;
  }
  
  /* Container */
  .container-fluid {
    @apply w-full px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto;
  }
  
  /* Cards */
  .card-base {
    @apply bg-white dark:bg-slate-900 rounded-lg shadow-medium p-6 transition-all duration-300;
  }
  
  .card-hover {
    @apply card-base hover:shadow-large hover:-translate-y-1;
  }
  
  .card-glass {
    @apply glass p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
  }
}
```

---

## PART 2: NEW COMPONENTS TO CREATE

### 1. Enhanced Hero Component
```tsx
// components/common/Hero.tsx
interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundType: 'gradient' | 'video' | 'image';
  cta?: { label: string; href: string }[];
  overlay?: boolean;
}

// Features:
- Parallax scrolling
- Animated text reveal
- CTA buttons with hover effects
- Background video optional
- Gradient background
- Breadcrumbs navigation
```

### 2. Stat Counter Component
```tsx
// components/common/StatCard.tsx
interface StatCardProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
  prefix?: string;
  animationDelay?: number;
}

// Features:
- Number counting animation
- Icon with fade-in
- Responsive grid
- Hover scale effect
```

### 3. Feature Cards
```tsx
// components/common/FeatureCard.tsx
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  variant?: 'default' | 'glass' | 'outline';
}

// Features:
- Icon animation on hover
- Glassmorphism option
- Link integration
- Multiple variants
```

### 4. Testimonial Carousel
```tsx
// components/common/TestimonialCarousel.tsx
interface Testimonial {
  content: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

// Features:
- Auto-scroll with pause
- 3D card rotation
- Rating stars
- Quote icon
- Navigation buttons
```

### 5. Timeline Component
```tsx
// components/common/Timeline.tsx
interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

// Features:
- Vertical (mobile) to horizontal (desktop)
- Hover reveal animations
- Icon markers
- Connecting lines
```

### 6. Team Member Card
```tsx
// components/common/TeamMemberCard.tsx
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: { platform: string; url: string }[];
}

// Features:
- Circular image with border glow
- Hover reveal social links
- Smooth transitions
- Rating/stats optional
```

### 7. Section Wrapper
```tsx
// components/common/Section.tsx
interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'default' | 'alt' | 'dark';
  spacing?: 'tight' | 'normal' | 'spacious';
}

// Features:
- Consistent styling
- Auto padding
- Title animations
- Background variants
```

---

## PART 3: NEW PAGES TO CREATE

### 1. About Page Structure
```tsx
// pages/About.tsx
- Hero section
- Company story (long form)
- Visions & Missions cards
- Timeline/History
- Stats counter
- Team preview
- Call to action
```

### 2. Services Page
```tsx
// pages/Services.tsx
- Hero with service categories
- Featured services (3-5)
- Service feature comparison
- Benefits accordion
- FAQ section
- CTA section
```

### 3. Events Page
```tsx
// pages/Events.tsx
- Upcoming events calendar
- Event cards (filterable)
- Event details modal
- Past events section
- Event registration form
- Email notifications
```

### 4. Blog Page
```tsx
// pages/Blog.tsx (enhance News)
- Featured article (large card)
- Blog grid (3 columns)
- Category filters
- Search functionality
- Sort by date/popularity
- Related articles
- Author info
```

### 5. Team Page
```tsx
// pages/Team.tsx
- Leadership section
- Full team grid
- Department grouping
- Bio modal on click
- Search/filter
- Social links
```

---

## PART 4: INTERACTIVE FEATURES

### 1. Dark Mode Implementation
```tsx
// hooks/useDarkMode.ts
- System preference detection
- LocalStorage persistence
- Smooth transitions
- Icon toggle
- CSS class update
```

### 2. Search Functionality
```tsx
// components/SearchBar.tsx
- Global search across:
  - News articles
  - Events
  - Team members
  - Gallery
- Autocomplete suggestions
- Recent searches
- Search results modal
```

### 3. Filter & Sort System
```tsx
// hooks/useFilters.ts
- Multi-select filters
- Sort options
- URL query params
- Pagination
- Results count
```

### 4. Form Validation
```tsx
// hooks/useFormValidation.ts
- Real-time validation
- Error messages
- Success feedback
- Loading states
- Submit handling
```

---

## PART 5: PERFORMANCE OPTIMIZATION

### Code Splitting Strategy
```tsx
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Events = lazy(() => import('./pages/Events'));
const Blog = lazy(() => import('./pages/Blog'));
const Team = lazy(() => import('./pages/Team'));

// In App.tsx routes, wrap with Suspense
```

### Image Optimization
```tsx
- Use next-gen formats (WebP)
- Responsive images (srcset)
- Lazy loading
- Blur placeholder
- Image compression
```

### Caching Strategy
```tsx
- Browser cache: 1 year for assets
- Network cache: 5 minutes for API
- Local cache: FooterContext (already done)
- Service Worker for offline
```

---

## PART 6: SEO IMPLEMENTATION

### Meta Tags Per Page
```tsx
// Common metadata
{
  title: "Page Title | HMPS Perbankan Syariah",
  description: "Page description...",
  keywords: "keyword1, keyword2, keyword3",
  ogImage: "https://...",
  twitterCard: "summary_large_image"
}
```

### Structured Data (JSON-LD)
```tsx
// Organization schema
// Article schema
// Event schema
// Person schema
// LocalBusiness schema
```

### Sitemap & Robots
```
- Auto-generate sitemap.xml
- Robots.txt configuration
- Google Search Console
- Sitemap submission
```

---

## PART 7: ACCESSIBILITY (WCAG 2.1 AA)

### Keyboard Navigation
```tsx
- Tab order management
- Focus indicators
- Keyboard shortcuts
- Skip to main content
```

### Screen Reader Support
```tsx
- ARIA labels
- ARIA descriptions
- Role attributes
- Landmark regions
- Alternative text
```

### Color & Contrast
```tsx
- 4.5:1 ratio for text
- 3:1 ratio for UI components
- Color blind safe palette
- Sufficient hue difference
```

### Motion Sensitivity
```tsx
- Respect prefers-reduced-motion
- Optional animations
- No auto-playing videos
- No flashing content
```

---

## PART 8: TESTING CHECKLIST

### Functionality
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms submit successfully
- [ ] Search functionality works
- [ ] Filters apply correctly
- [ ] Dark mode toggles
- [ ] Responsive on all breakpoints

### Performance
- [ ] Page load time < 2.5s
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] No network waterfall delays
- [ ] Images optimized
- [ ] Code splitting works

### Browser Compatibility
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+
- [ ] Mobile Safari iOS 12+
- [ ] Android Chrome 8+

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] Form labels present
- [ ] Images have alt text

---

## INSTALLATION COMMANDS (When Ready)

```bash
# Install new dependencies
npm install framer-motion react-intersection-observer react-hot-toast react-countup react-calendar

# Or with bun (as per your setup)
bun add framer-motion react-intersection-observer react-hot-toast react-countup react-calendar

# Update tailwind config
# Update index.css
# Create new components
# Create new pages
# Test thoroughly
```

---

**Status**: Specifications ready for implementation
**Compatibility**: 100% with existing codebase
**Error Risk**: MINIMAL (modular approach)
**Timeline**: Follow chosen OPSI
