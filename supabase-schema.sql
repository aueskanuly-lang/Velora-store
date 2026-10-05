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

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity unique,
  customer_name text not null check (length(trim(customer_name)) between 2 and 120),
  phone text not null check (length(trim(phone)) between 5 and 30),
  city text not null check (length(trim(city)) between 1 and 100),
  address text not null check (length(trim(address)) between 3 and 500),
  comment text not null default '' check (length(comment) <= 1000),
  items jsonb not null check (jsonb_typeof(items) = 'array' and jsonb_array_length(items) > 0),
  total_amount bigint not null check (total_amount > 0),
  status text not null default 'pending' check (status in ('pending','confirmed','shipped','delivered','cancelled')),
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.velora_admins enable row level security;
alter table public.orders enable row level security;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant select on public.velora_admins to authenticated;
grant select, update on public.orders to authenticated;
revoke all on public.orders from anon, authenticated;
grant select, update on public.orders to authenticated;

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

drop policy if exists "Admins read orders" on public.orders;
create policy "Admins read orders" on public.orders for select to authenticated
  using (exists (select 1 from public.velora_admins a where a.user_id = auth.uid()));
drop policy if exists "Admins update order status" on public.orders;
create policy "Admins update order status" on public.orders for update to authenticated
  using (exists (select 1 from public.velora_admins a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.velora_admins a where a.user_id = auth.uid()));

create or replace function public.place_velora_order(
  p_customer_name text, p_phone text, p_city text, p_address text,
  p_comment text, p_items jsonb
) returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_total bigint := 0;
  v_items jsonb := '[]'::jsonb;
  v_line jsonb;
  v_product public.products%rowtype;
  v_qty integer;
  v_order public.orders%rowtype;
begin
  if length(trim(coalesce(p_customer_name,''))) not between 2 and 120
    or length(trim(coalesce(p_phone,''))) not between 5 and 30
    or length(trim(coalesce(p_city,''))) not between 1 and 100
    or length(trim(coalesce(p_address,''))) not between 3 and 500
    or length(coalesce(p_comment,'')) > 1000
    or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) not between 1 and 50 then
    raise exception 'Invalid order details';
  end if;
  for v_line in select value from jsonb_array_elements(p_items) loop
    v_qty := (v_line->>'quantity')::integer;
    if v_qty not between 1 and 99 then raise exception 'Invalid quantity'; end if;
    select * into v_product from public.products where id = (v_line->>'product_id')::uuid for update;
    if not found then raise exception 'Product not found'; end if;
    if v_product.stock < v_qty then raise exception 'Insufficient stock for %', v_product.name; end if;
    update public.products set stock = stock - v_qty where id = v_product.id;
    v_total := v_total + v_product.price * v_qty;
    v_items := v_items || jsonb_build_array(jsonb_build_object('product_id',v_product.id,'name',v_product.name,'unit_price',v_product.price,'quantity',v_qty));
  end loop;
  insert into public.orders(customer_name,phone,city,address,comment,items,total_amount)
    values(trim(p_customer_name),trim(p_phone),trim(p_city),trim(p_address),coalesce(trim(p_comment),''),v_items,v_total)
    returning * into v_order;
  return jsonb_build_object('id',v_order.id,'order_number',v_order.order_number,'created_at',v_order.created_at,'total_amount',v_total);
end; $$;
revoke all on function public.place_velora_order(text,text,text,text,text,jsonb) from public;
grant execute on function public.place_velora_order(text,text,text,text,text,jsonb) to anon, authenticated;

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
