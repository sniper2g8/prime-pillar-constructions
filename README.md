# PrimePillar Constructions Website

This is a [Next.js](https://nextjs.org) project for PrimePillar Constructions Ltd, a Ghanaian construction company specializing in mining, petroleum, oil & gas, energy, and infrastructure projects.

## Project Overview

PrimePillar Constructions Ltd is building a complete, production-ready website for their construction business. The website includes:

- Homepage with hero section, services grid, industries showcase, and testimonials
- About page with company information, vision/mission, and leadership team
- Services pages with detailed information about each service offering
- Projects portfolio showcasing completed and ongoing projects
- Equipment catalog for hire
- Health, Safety & Environment (HSE) policy page
- Contact page with inquiry form
- Multi-step quote request form

## Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **Database/Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Hosting:** Vercel
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database Setup

To set up the Supabase database with the required schema and seed data:

1. Create a Supabase project at [supabase.com](https://supabase.com/)
2. Copy the database connection details to your `.env` file
3. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
4. Seed the database with real company data:

```bash
# Seed the database with initial data
npm run setup:db

# Or reset and re-seed the database (clears existing data)
npm run reset:db
```

The database will be populated with:
- 8 Services from the company's offerings
- 3 Projects showcasing the company's work
- 8 Equipment items available for hire
- 2 Team members (company directors)

## Project Structure

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.