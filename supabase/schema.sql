-- Pamana social features schema
-- Run this in Supabase SQL editor.

-- Profiles table for avatar/name rendering in comments.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamptz default now()
);

alter table public.profiles
  add column if not exists email text;

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null check (char_length(trim(content)) > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  post_id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('like')),
  created_at timestamptz not null default now(),
  unique (post_id, user_id, type)
);

alter table public.profiles enable row level security;
alter table public.comments enable row level security;
alter table public.reactions enable row level security;

-- Read access for all users (including anonymous visitors).
drop policy if exists "profiles_read_all" on public.profiles;
create policy "profiles_read_all"
on public.profiles for select
using (true);

drop policy if exists "comments_read_all" on public.comments;
create policy "comments_read_all"
on public.comments for select
using (true);

drop policy if exists "reactions_read_all" on public.reactions;
create policy "reactions_read_all"
on public.reactions for select
using (true);

-- Authenticated users can maintain only their own profile.
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- Authenticated users can comment as themselves.
drop policy if exists "comments_insert_own" on public.comments;
create policy "comments_insert_own"
on public.comments for insert
to authenticated
with check (auth.uid() = user_id);

-- Optional: allow deleting own comments only.
drop policy if exists "comments_delete_own" on public.comments;
create policy "comments_delete_own"
on public.comments for delete
to authenticated
using (auth.uid() = user_id);

-- Authenticated users can create/remove only their own reactions.
drop policy if exists "reactions_insert_own" on public.reactions;
create policy "reactions_insert_own"
on public.reactions for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "reactions_delete_own" on public.reactions;
create policy "reactions_delete_own"
on public.reactions for delete
to authenticated
using (auth.uid() = user_id);

-- Keep profile in sync automatically when a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update
  set email = excluded.email,
      full_name = coalesce(excluded.full_name, public.profiles.full_name),
      avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
      updated_at = now();
  return new;
end;
$$;

update public.profiles p
set email = u.email,
    updated_at = now()
from auth.users u
where p.id = u.id
  and (p.email is null or p.email <> u.email);

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
