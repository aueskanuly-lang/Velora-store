-- Run this once in Supabase Dashboard > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_url text not null,
  price integer not null check (price > 0),
  old_price integer check (old_price is null or old_price > 0),
  category text not null,
  description text not null default '',
  stock integer not null default 0 check (stock >= 0),
  sizes text[] not null default '{}',
  color text not null default '',
  is_new boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.velora_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.products enable row level security;
alter table public.velora_admins enable row level security;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant select on public.velora_admins to authenticated;

drop policy if exists "Products are public to read" on public.products;
create policy "Products are public to read" on public.products
  for select using (true);
drop policy if exists "Admins manage products" on public.products;
create policy "Admins manage products" on public.products
  for all to authenticated
  using (exists (select 1 from public.velora_admins a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.velora_admins a where a.user_id = auth.uid()));

drop policy if exists "Admins can read own admin record" on public.velora_admins;
create policy "Admins can read own admin record" on public.velora_admins
  for select to authenticated using (user_id = auth.uid());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 10485760,
        array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 10485760,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "Product images are public to read" on storage.objects;
create policy "Product images are public to read" on storage.objects
  for select using (bucket_id = 'product-images');
drop policy if exists "Admins upload product images" on storage.objects;
create policy "Admins upload product images" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'product-images' and exists (
      select 1 from public.velora_admins a where a.user_id = auth.uid()
    )
  );
drop policy if exists "Admins update product images" on storage.objects;
create policy "Admins update product images" on storage.objects
  for update to authenticated using (
    bucket_id = 'product-images' and exists (
      select 1 from public.velora_admins a where a.user_id = auth.uid()
    )
  );
drop policy if exists "Admins delete product images" on storage.objects;
create policy "Admins delete product images" on storage.objects
  for delete to authenticated using (
    bucket_id = 'product-images' and exists (
      select 1 from public.velora_admins a where a.user_id = auth.uid()
    )
  );

-- After creating the admin in Authentication > Users, replace the email and run:
-- insert into public.velora_admins(user_id)
-- select id from auth.users where email = 'YOUR_ADMIN_EMAIL';
