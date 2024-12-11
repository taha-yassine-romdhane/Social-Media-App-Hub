-- Create scheduled_posts table
create table if not exists public.scheduled_posts (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    page_id uuid references social_accounts(id) on delete cascade not null,
    content text not null,
    media_urls text[] default array[]::text[],
    scheduled_for timestamp with time zone not null,
    platform text not null check (platform in ('facebook', 'instagram')),
    status text not null check (status in ('draft', 'scheduled', 'published')),
    visibility text not null check (visibility in ('public', 'private', 'friends')),
    metadata jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.scheduled_posts enable row level security;

-- Create policies
create policy "Users can view their own scheduled posts"
    on public.scheduled_posts for select
    using (auth.uid() = user_id);

create policy "Users can insert their own scheduled posts"
    on public.scheduled_posts for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own scheduled posts"
    on public.scheduled_posts for update
    using (auth.uid() = user_id);

create policy "Users can delete their own scheduled posts"
    on public.scheduled_posts for delete
    using (auth.uid() = user_id);

-- Create updated_at trigger
create trigger handle_scheduled_posts_updated_at before update on scheduled_posts
    for each row execute procedure handle_updated_at();
