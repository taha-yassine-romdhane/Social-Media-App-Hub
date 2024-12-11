-- Create messages table
create table if not exists public.messages (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    platform text not null,
    sender text not null,
    sender_id text not null,
    content text not null,
    timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
    read boolean default false not null,
    starred boolean default false not null,
    folder text default 'inbox' not null,
    metadata jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.messages enable row level security;

-- Create policies
create policy "Users can view their own messages"
    on public.messages for select
    using (auth.uid() = user_id);

create policy "Users can update their own messages"
    on public.messages for update
    using (auth.uid() = user_id);

-- Create updated_at trigger
create trigger handle_updated_at before update on messages
    for each row execute procedure handle_updated_at();
