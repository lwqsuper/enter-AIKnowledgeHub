-- Create 'ai_news' table if it doesn't exist
create table if not exists public.ai_news (
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

-- Enable Row Level Security (RLS)
alter table public.ai_news enable row level security;

-- Create policies
create policy "Enable read access for all users" on public.ai_news for select using (true);
create policy "Enable insert for all users (demo)" on public.ai_news for insert with check (true);
create policy "Enable update for all users (demo)" on public.ai_news for update using (true);
create policy "Enable delete for all users (demo)" on public.ai_news for delete using (true);
