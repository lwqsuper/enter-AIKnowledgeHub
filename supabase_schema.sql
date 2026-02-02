-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create 'modules' table for homepage content management
create table public.modules (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  content text,
  type text check (type in ('knowledge', 'tool', 'tutorial', 'other')) not null,
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create 'ai_news' table for AI news feed
create table public.ai_news (
  id uuid default uuid_generate_v4() primary key,
  original_title text not null,
  summary text not null,
  content text,
  difficulty_level text check (difficulty_level in ('beginner', 'intermediate', 'advanced')) default 'beginner',
  source_url text,
  tags text[],
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create 'admin_logs' table for security audit
create table public.admin_logs (
  id uuid default uuid_generate_v4() primary key,
  action text not null,
  details jsonb,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.modules enable row level security;
alter table public.ai_news enable row level security;
alter table public.admin_logs enable row level security;

-- Create policies (Allow read for everyone, write only for authenticated/service role)
-- For this simplified project without full user auth, we'll allow public read.
-- In a real app, write operations would be restricted to authenticated admin users.

create policy "Enable read access for all users" on public.modules for select using (true);
create policy "Enable insert for all users (demo)" on public.modules for insert with check (true);
create policy "Enable update for all users (demo)" on public.modules for update using (true);
create policy "Enable delete for all users (demo)" on public.modules for delete using (true);

create policy "Enable read access for all users" on public.ai_news for select using (true);
create policy "Enable insert for all users (demo)" on public.ai_news for insert with check (true);
create policy "Enable update for all users (demo)" on public.ai_news for update using (true);
create policy "Enable delete for all users (demo)" on public.ai_news for delete using (true);
