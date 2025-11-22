-- Create services table
create table services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  icon text,
  short_description text not null,
  full_description text,
  features text[] default '{}',
  image_url text,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create projects table
create table projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  client text,
  industry text check (industry in ('mining', 'oil_gas', 'energy', 'government', 'commercial', 'infrastructure')),
  location text,
  year integer,
  status text check (status in ('completed', 'ongoing', 'upcoming')) default 'upcoming',
  short_description text not null,
  full_description text,
  scope text,
  featured boolean default false,
  thumbnail_url text,
  gallery text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create equipment table
create table equipment (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text,
  quantity integer default 0,
  description text,
  specifications jsonb default '{}',
  image_url text,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create inquiries table
create table inquiries (
  id uuid default gen_random_uuid() primary key,
  type text check (type in ('contact', 'quote', 'equipment')) not null,
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  services_interested text[] default '{}',
  project_details jsonb default '{}',
  status text check (status in ('new', 'contacted', 'in_progress', 'closed')) default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create team_members table
create table team_members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  title text,
  bio text,
  qualifications text,
  experience text,
  image_url text,
  is_director boolean default false,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create testimonials table
create table testimonials (
  id uuid default gen_random_uuid() primary key,
  client_name text not null,
  company text,
  role text,
  content text not null,
  rating integer check (rating >= 1 and rating <= 5),
  image_url text,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies (optional, for public read access)
alter table services enable row level security;
alter table projects enable row level security;
alter table equipment enable row level security;
alter table team_members enable row level security;
alter table testimonials enable row level security;

-- Allow public read access to services
create policy "Allow public read access to services"
  on services for select
  using (true);

-- Allow public read access to projects
create policy "Allow public read access to projects"
  on projects for select
  using (true);

-- Allow public read access to equipment
create policy "Allow public read access to equipment"
  on equipment for select
  using (true);

-- Allow public read access to team_members
create policy "Allow public read access to team members"
  on team_members for select
  using (true);

-- Allow public read access to testimonials
create policy "Allow public read access to testimonials"
  on testimonials for select
  using (true);

-- Grant usage to anon role
grant usage on schema public to anon;
grant select on services to anon;
grant select on projects to anon;
grant select on equipment to anon;
grant select on team_members to anon;
grant select on testimonials to anon;