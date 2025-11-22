# Supabase Database Setup

This document provides instructions for setting up the Supabase database for the PrimePillar Constructions website.

## Prerequisites

1. A Supabase account (free tier available at [supabase.com](https://supabase.com))
2. Supabase project created
3. Environment variables configured in `.env` file

## Database Schema

The database consists of the following tables:

1. `services` - Services offered by the company
2. `projects` - Completed and ongoing projects
3. `equipment` - Available equipment for hire
4. `inquiries` - Contact and quote requests
5. `team_members` - Company team members
6. `testimonials` - Client testimonials

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Note down your project URL and API keys

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Create Database Tables

In your Supabase project dashboard:

1. Go to the SQL Editor
2. Copy and paste the contents of `supabase-schema.sql`
3. Run the SQL script to create all tables

### 4. Seed Initial Data

Run the database seeding script:

```bash
npm run setup:db
```

This will populate the database with initial data for services, team members, equipment, and projects.

## Manual Table Creation (Alternative)

If you prefer to create tables manually through the Supabase interface:

### Services Table
- id (UUID, primary key, default: gen_random_uuid())
- title (text, required)
- slug (text, unique, required)
- icon (text)
- short_description (text, required)
- full_description (text)
- features (text array)
- image_url (text)
- display_order (integer, default: 0)
- is_active (boolean, default: true)
- created_at (timestamp, default: now())

### Projects Table
- id (UUID, primary key, default: gen_random_uuid())
- title (text, required)
- slug (text, unique, required)
- client (text)
- industry (text, enum: mining, oil_gas, energy, government, commercial, infrastructure)
- location (text)
- year (integer)
- status (text, enum: completed, ongoing, upcoming, default: upcoming)
- short_description (text, required)
- full_description (text)
- scope (text)
- featured (boolean, default: false)
- thumbnail_url (text)
- gallery (text array)
- created_at (timestamp, default: now())
- updated_at (timestamp, default: now())

### Equipment Table
- id (UUID, primary key, default: gen_random_uuid())
- name (text, required)
- category (text)
- quantity (integer, default: 0)
- description (text)
- specifications (JSON)
- image_url (text)
- is_available (boolean, default: true)
- created_at (timestamp, default: now())

### Inquiries Table
- id (UUID, primary key, default: gen_random_uuid())
- type (text, enum: contact, quote, equipment, required)
- name (text, required)
- email (text, required)
- phone (text)
- company (text)
- message (text, required)
- services_interested (text array)
- project_details (JSON)
- status (text, enum: new, contacted, in_progress, closed, default: new)
- created_at (timestamp, default: now())

### Team Members Table
- id (UUID, primary key, default: gen_random_uuid())
- name (text, required)
- role (text, required)
- title (text)
- bio (text)
- qualifications (text)
- experience (text)
- image_url (text)
- is_director (boolean, default: false)
- display_order (integer, default: 0)
- created_at (timestamp, default: now())

### Testimonials Table
- id (UUID, primary key, default: gen_random_uuid())
- client_name (text, required)
- company (text)
- role (text)
- content (text, required)
- rating (integer, 1-5)
- image_url (text)
- is_featured (boolean, default: false)
- created_at (timestamp, default: now())

## Row Level Security (RLS)

The schema includes basic RLS policies that allow public read access to all tables. You can modify these policies in the Supabase dashboard under Authentication > Policies.

## Testing the Connection

To verify that your Supabase connection is working:

1. Start the development server: `npm run dev`
2. Visit http://localhost:3000
3. Check that data is loading correctly on various pages

## Troubleshooting

If you encounter issues:

1. Verify that all environment variables are correctly set
2. Check that your Supabase project URL and keys are correct
3. Ensure that the database tables have been created
4. Confirm that RLS policies are properly configured