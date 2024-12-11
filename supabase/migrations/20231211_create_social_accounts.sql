create table if not exists public.social_accounts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  platform text not null,
  account_name text not null,
  account_id text not null,
  access_token text not null,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, platform, account_id)
);

-- Enable RLS
alter table public.social_accounts enable row level security;

-- Create policies
create policy "Users can view their own social accounts"
  on public.social_accounts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own social accounts"
  on public.social_accounts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own social accounts"
  on public.social_accounts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own social accounts"
  on public.social_accounts for delete
  using (auth.uid() = user_id);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_social_accounts_updated_at
  before update on public.social_accounts
  for each row
  execute procedure public.handle_updated_at();
