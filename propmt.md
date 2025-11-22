# AI DEVELOPER PROMPT: Build PrimePillar Constructions Website

You are building a complete, production-ready website for **PrimePillar Constructions Ltd**, a Ghanaian construction company specializing in mining, petroleum, oil & gas, energy, and infrastructure projects.

---

## PROJECT CONTEXT

**Company:** PrimePillar Constructions Ltd
**Tagline:** "Solid Pillars, Lasting Legacy"
**Location:** No. 13 Beach Drive Nungua, Accra, Ghana
**Contact:** +233 246 937 073 / +233 248 472 774
**Email:** info@primepillargh.com
**Website:** www.primepillargh.com

**Business Focus:** Construction services for mining, petroleum/oil & gas, energy, industrial, and public infrastructure sectors in Ghana and West Africa.

---

## TECH STACK (Mandatory)

- **Framework:** Next.js 14+ (App Router)
- **Database/Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Hosting:** Vercel
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React

---

## DESIGN SYSTEM

### Colors (Extracted from Logo)
```js
// tailwind.config.js
colors: {
  primary: {
    DEFAULT: '#1a3a5c', // Dark navy blue (PRIMEPILLAR text)
    50: '#f0f5fa',
    100: '#d9e4ef',
    200: '#b3c9df',
    300: '#8daecf',
    400: '#4d7ba8',
    500: '#1a3a5c',      // Main brand navy
    600: '#162f4a',
    700: '#112438',
    800: '#0d1926',
    900: '#080d14',
  },
  secondary: {
    DEFAULT: '#5a7186', // Slate gray (pillar details & CONSTRUCTIONS text)
    50: '#f5f7f9',
    100: '#e8ecf0',
    200: '#d1d9e1',
    300: '#a8b7c5',
    400: '#7f94a6',
    500: '#5a7186',      // Main slate gray
    600: '#485a6b',
    700: '#364350',
    800: '#242d36',
    900: '#12161b',
  },
  accent: {
    400: '#fbbf24',      // Gold (for CTAs & highlights)
    500: '#d69e2e',
    600: '#b45309',
  },
}
```

### Logo Colors Reference
- **Navy Blue (#1a3a5c)**: "PRIMEPILLAR" text, pillar capital (top), pillar base (bottom point)
- **Slate Gray (#5a7186)**: "CONSTRUCTIONS" text, pillar shaft (vertical lines), capital underside
```

### Typography
- Headings: `font-bold tracking-wide uppercase` (matching logo style)
- Body: Inter or system font stack
- Stats/Numbers: Tabular numerals
- Logo Font Style: Wide letter-spacing, bold, uppercase

### Logo Implementation
```tsx
// components/logo.tsx
// The logo file should be placed at: /public/images/logo.png (or .svg)
// Use next/image for optimization

import Image from 'next/image';

export function Logo({ className = '', size = 'default' }) {
  const sizes = {
    small: { width: 150, height: 40 },
    default: { width: 220, height: 60 },
    large: { width: 300, height: 80 },
  };
  
  return (
    <Image
      src="/images/logo.png"
      alt="PrimePillar Constructions"
      width={sizes[size].width}
      height={sizes[size].height}
      className={className}
      priority
    />
  );
}

// Text-only version for footer/mobile (CSS recreation)
export function LogoText({ className = '' }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-2xl font-bold tracking-wider text-primary-500">
        PRIMEPILLAR
      </span>
      <span className="text-sm tracking-[0.3em] text-secondary-500">
        CONSTRUCTIONS
      </span>
    </div>
  );
}
```

### Logo Usage Guidelines
- Header: Use full logo (icon + text) at default size
- Footer: Use full logo at small size
- Favicon: Extract pillar icon only
- Mobile header: Can use pillar icon only to save space
- Minimum clear space: Equal to pillar icon width on all sides
- Dark backgrounds: Use white version (create /public/images/logo-white.png)

### Design Principles
- Clean, professional, industrial aesthetic
- Bold hero sections with construction imagery
- Card-based layouts for services/projects
- Subtle hover animations
- Mobile-first responsive design
- High contrast for accessibility

---

## DATABASE SCHEMA (Supabase)

Create these tables with the exact structure:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROJECTS TABLE
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client TEXT NOT NULL,
  industry TEXT NOT NULL CHECK (industry IN ('mining', 'oil_gas', 'energy', 'government', 'commercial', 'infrastructure')),
  location TEXT,
  year INTEGER,
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'ongoing', 'upcoming')),
  short_description TEXT,
  full_description TEXT,
  scope TEXT,
  featured BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  gallery JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SERVICES TABLE
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  features JSONB DEFAULT '[]',
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- EQUIPMENT TABLE
CREATE TABLE equipment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  quantity INTEGER DEFAULT 1,
  description TEXT,
  specifications JSONB DEFAULT '{}',
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INQUIRIES TABLE (Contact & Quote Requests)
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('contact', 'quote', 'equipment')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  services_interested JSONB DEFAULT '[]',
  project_details JSONB DEFAULT '{}',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TEAM MEMBERS TABLE
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  qualifications TEXT,
  experience TEXT,
  image_url TEXT,
  is_director BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TESTIMONIALS TABLE
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read equipment" ON equipment FOR SELECT USING (true);
CREATE POLICY "Public read team" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);

-- Public insert for inquiries
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
```

---

## SEED DATA

Insert this initial data:

```sql
-- SERVICES SEED DATA
INSERT INTO services (title, slug, icon, short_description, display_order) VALUES
('Architectural Works', 'architectural-works', 'Compass', 'Comprehensive architectural design services from conceptualization to detailed drawings.', 1),
('Building & Construction', 'building-construction', 'Building2', 'Residential, commercial, and industrial building projects from foundation to finishing.', 2),
('Electrical Works', 'electrical-works', 'Zap', 'Complete electrical installation, power distribution, and maintenance services.', 3),
('Plumbing Works', 'plumbing-works', 'Droplets', 'Installation and maintenance of water supply, drainage, and sewage systems.', 4),
('Equipment Hiring', 'equipment-hiring', 'Truck', 'Wide range of construction equipment available for hire with technical support.', 5),
('Road Construction', 'road-construction', 'Route', 'Building and rehabilitation of roads, driveways, and access roads.', 6),
('Civil Works', 'civil-works', 'HardHat', 'Earthworks, drainage systems, foundations, retaining walls, and site preparation.', 7),
('Facility Maintenance', 'facility-maintenance', 'Wrench', 'Ongoing maintenance services for buildings, electrical, and plumbing systems.', 8);

-- PROJECTS SEED DATA
INSERT INTO projects (title, slug, client, industry, year, status, short_description, scope, featured) VALUES
('Road Signs Construction', 'technipfmc-road-signs', 'TechnipFMC', 'oil_gas', 2017, 'completed', 'Design, fabrication, and installation of road signage for oil and gas facility operations.', 'Road signage systems for facility operations', true),
('Site Signage Systems', 'heat-gold-fields-signage', 'Heat Gold Fields (formerly FGR)', 'mining', 2016, 'completed', 'Comprehensive road signs and site signage systems for mining operations.', 'Design, fabrication, and installation of signage', true),
('Officers Residential Buildings', 'burma-camp-residential', 'Ghana Armed Forces', 'government', 2025, 'ongoing', 'Construction of 6-Unit 4-Bedroom residential buildings for officers at Burma Camp.', 'Project supervision and construction management', true);

-- EQUIPMENT SEED DATA
INSERT INTO equipment (name, category, quantity) VALUES
('Poker Vibrator', 'Concrete Equipment', 15),
('Concrete Mixer', 'Concrete Equipment', 1),
('Compactor', 'Earth Moving', 4),
('Jack Hammer', 'Demolition', 4),
('Angle Grinder', 'Power Tools', 5),
('Drilling Machine', 'Power Tools', 2),
('Head Pan', 'Manual Tools', 20),
('Safety Equipment (PPE Sets)', 'Safety', 50);

-- TEAM MEMBERS SEED DATA
INSERT INTO team_members (name, role, title, bio, qualifications, experience, is_director, display_order) VALUES
('Smaila Shaibu Mensah', 'Co-Founder & Director', 'Director', 'Brings a unique blend of technological innovation and practical construction knowledge. Expertise in integrating modern technology with construction processes ensures efficiency and precision in project delivery.', 'B.Tech in Computer Science and Engineering, PCTE Institute of Engineering and Technology, Ludhiana, India', 'Over 10 years providing architectural services and road signage solutions for oil and gas industry and mining sector. Successfully delivered projects for TechnipFMC and Heat Gold Fields.', true, 1),
('Nana Osei Yaw', 'Co-Founder & Director', 'Director', 'Applies strong analytical and problem-solving skills to project planning, cost estimation, and quality assurance. Mathematical precision ensures every project is executed with accuracy and excellence.', 'BSc in Mathematics, Kwame Nkrumah University of Science and Technology (KNUST), Kumasi, Ghana', 'Over 5 years hands-on experience in construction industry. Currently serving as Project Supervisor on Ghana Armed Forces Burma Camp residential buildings project (subcontract for Desimone Ltd).', true, 2);
```

---

## FILE STRUCTURE

Create this exact structure:

```
/app
  /layout.tsx              # Root layout with providers
  /page.tsx                # Homepage
  /about/page.tsx          # About page
  /services/page.tsx       # Services listing
  /services/[slug]/page.tsx # Individual service
  /projects/page.tsx       # Projects portfolio
  /projects/[slug]/page.tsx # Project detail
  /equipment/page.tsx      # Equipment catalog
  /hse/page.tsx           # HSE Policy page
  /contact/page.tsx       # Contact page
  /quote/page.tsx         # Quote request form
  /api
    /contact/route.ts     # Contact form handler
    /quote/route.ts       # Quote form handler
  /globals.css            # Global styles

/components
  /layout
    /header.tsx           # Navigation header
    /footer.tsx           # Site footer
    /mobile-nav.tsx       # Mobile navigation
  /sections
    /hero.tsx             # Homepage hero
    /services-grid.tsx    # Services display
    /projects-grid.tsx    # Projects display
    /stats-bar.tsx        # Statistics section
    /testimonials.tsx     # Testimonials carousel
    /cta-section.tsx      # Call-to-action blocks
    /industries.tsx       # Industries tabs
    /team.tsx             # Team members
    /values.tsx           # Core values display
  /ui                     # shadcn/ui components
  /forms
    /contact-form.tsx     # Contact form
    /quote-form.tsx       # Quote request form

/lib
  /supabase
    /client.ts            # Supabase browser client
    /server.ts            # Supabase server client
  /utils.ts               # Utility functions
  /constants.ts           # Site constants

/types
  /database.ts            # TypeScript types
```

---

## PAGE REQUIREMENTS

### Homepage (/)
Build these sections in order:
1. **Hero**: Full-width background (gradient or image), animated headline "Solid Pillars, Lasting Legacy", subtext about mining/petroleum/infrastructure focus, two CTAs ("Our Services", "Get a Quote")
2. **Stats Bar**: Animated counters - "10+ Years Experience", "3+ Major Projects", "5 Industries", "Zero Safety Incidents"
3. **Services Grid**: 8 service cards (icon, title, short description), link to /services
4. **Industries Tabs**: Tabbed section for Mining, Oil & Gas, Energy, Industrial, Infrastructure
5. **Featured Projects**: 3 project cards from database, filter by featured=true
6. **Why Choose Us**: Grid of 6 differentiators (icons + text)
7. **Testimonials**: Carousel (placeholder if no data)
8. **CTA Section**: "Ready to Build Your Legacy?" with contact link

### About Page (/about)
1. Hero with company intro
2. Vision & Mission cards
3. Core Values grid (6 values with icons)
4. Directors section (fetch from team_members where is_director=true)
5. Capacity statement
6. Local content commitment

### Services Page (/services)
1. Hero section
2. Grid of all services (fetch from database)
3. Each card links to /services/[slug]

### Service Detail (/services/[slug])
1. Service hero with icon and title
2. Full description
3. Features list
4. Related projects (filter by service type if applicable)
5. CTA to request quote

### Projects Page (/projects)
1. Hero section
2. Filter bar (by industry, status)
3. Projects grid (fetch all from database)
4. Each card shows: thumbnail, title, client, industry badge, status

### Project Detail (/projects/[slug])
1. Image gallery/hero
2. Project info (client, location, year, status)
3. Full description and scope
4. Back to projects link

### Equipment Page (/equipment)
1. Hero section
2. Equipment grid/table (name, category, quantity, availability)
3. CTA to inquire about hiring

### HSE Page (/hse)
1. Hero with "Zero Harm" objective
2. HSE Policy statement
3. Commitments list with icons (use the data from company profile)
4. Standards compliance (OHSAS/ISO 45001, Minerals Commission, Petroleum Commission, EPA)

### Contact Page (/contact)
1. Split layout: Form on left, contact info on right
2. Contact form fields: Name, Email, Phone, Company, Service Interest (dropdown), Message
3. Contact details: Address, Phone numbers, Email, GPS Address
4. Embedded Google Map (Nungua, Accra location)
5. WhatsApp button (floating)

### Quote Page (/quote)
Multi-step form:
1. Step 1: Personal info (Name, Email, Phone, Company)
2. Step 2: Service selection (checkboxes for all 8 services)
3. Step 3: Project details (Description textarea, Timeline dropdown, Budget range)
4. Step 4: Review & Submit
Store in inquiries table with type='quote'

---

## API ROUTES

### /api/contact/route.ts
```typescript
// POST handler
// Validate with Zod
// Insert into inquiries table with type='contact'
// Return success/error response
// Optional: Send email notification (can skip for MVP)
```

### /api/quote/route.ts
```typescript
// POST handler
// Validate multi-step form data
// Insert into inquiries table with type='quote'
// Store services_interested as JSONB array
// Store project_details as JSONB object
// Return success/error response
```

---

## COMPONENT REQUIREMENTS

### Header
- Logo on left (use the provided logo image at /public/images/logo.png)
- Navigation: Home, About, Services, Projects, Equipment, HSE, Contact
- Mobile hamburger menu
- "Get a Quote" CTA button (gold accent color #d69e2e)
- Sticky on scroll with slight backdrop blur
- White background with subtle shadow when scrolled

### Footer
- Dark navy background (#1a3a5c)
- Logo (white version) at top of footer
- 4 columns: About snippet, Quick Links, Services, Contact
- Social media icons (LinkedIn, Twitter/X, Facebook) in slate gray, hover to white
- Bottom bar: Copyright 2025, Privacy Policy, Terms
- "100% Ghanaian-Owned" badge
- All text in white/light gray for contrast

### Service Card
- Icon (from Lucide)
- Title
- Short description
- Hover effect (scale + shadow)
- Link to detail page

### Project Card
- Thumbnail image (placeholder if none)
- Title
- Client name
- Industry badge (colored)
- Status badge (green=completed, yellow=ongoing)
- Hover overlay with "View Project"

---

## ENVIRONMENT VARIABLES

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://www.primepillargh.com
```

---

## IMPORTANT INSTRUCTIONS

1. **Use Server Components** by default, Client Components only when needed (interactivity, hooks)
2. **Fetch data** using Supabase server client in Server Components
3. **Handle loading states** with Suspense and loading.tsx files
4. **Handle errors** with error.tsx files
5. **Optimize images** using next/image with proper sizing
6. **SEO**: Add metadata to each page (title, description, OpenGraph)
7. **Accessibility**: Proper ARIA labels, semantic HTML, keyboard navigation
8. **Mobile-first**: Design for mobile, enhance for desktop
9. **Performance**: Lazy load below-fold content, optimize bundle size

---

## METADATA TEMPLATE

```typescript
// For each page
export const metadata: Metadata = {
  title: 'Page Title | PrimePillar Constructions',
  description: 'Page description here...',
  openGraph: {
    title: 'Page Title | PrimePillar Constructions',
    description: 'Page description here...',
    url: 'https://www.primepillargh.com/page',
    siteName: 'PrimePillar Constructions',
    locale: 'en_GH',
    type: 'website',
  },
};
```

---

## OUTPUT EXPECTATIONS

Generate complete, production-ready code for each file. Include:
- Full TypeScript types
- Error handling
- Loading states
- Responsive design
- Accessibility features
- SEO metadata
- Comments for complex logic

Start by creating the project structure, then build each component and page systematically.

---

**BEGIN DEVELOPMENT**