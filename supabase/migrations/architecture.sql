-- Migrations will appear here as you chat with AI

create table users (
  id bigint primary key generated always as identity,
  username text not null unique,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz default now()
);

create table social_accounts (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  platform text not null,
  account_name text not null,
  access_token text not null,
  created_at timestamptz default now()
);

create table posts (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  content text not null,
  scheduled_time timestamptz,
  created_at timestamptz default now()
);

create table post_status (
  id bigint primary key generated always as identity,
  post_id bigint references posts (id),
  platform text not null,
  status text not null,
  updated_at timestamptz default now()
);

create table analytics (
  id bigint primary key generated always as identity,
  post_id bigint references posts (id),
  platform text not null,
  likes int default 0,
  shares int default 0,
  comments int default 0,
  created_at timestamptz default now()
);

create table platforms (
  id bigint primary key generated always as identity,
  name text not null unique
);

create table advertisements (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  platform_id bigint references platforms (id),
  content text not null,
  budget numeric(10, 2) not null,
  start_date timestamptz not null,
  end_date timestamptz not null,
  created_at timestamptz default now()
);

create table messages (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  platform_id bigint references platforms (id),
  content text not null,
  sent_at timestamptz default now()
);

create table pricing_plans (
  id bigint primary key generated always as identity,
  name text not null unique,
  price numeric(10, 2) not null,
  features text not null,
  created_at timestamptz default now()
);

create table user_pricing_plans (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  pricing_plan_id bigint references pricing_plans (id),
  start_date timestamptz default now(),
  end_date timestamptz
);

create table content_planner (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  platform_id bigint references platforms (id),
  content text not null,
  scheduled_time timestamptz not null,
  status text default 'pending',
  created_at timestamptz default now()
);