# Velora Store

A responsive HTML, CSS, and vanilla JavaScript clothing store. The storefront remains a static GitHub Pages site. Supabase provides hosted product records, image storage, and authenticated admin access.

## Project files

- `index.html`, `catalog.html`, `product.html`, `about.html`, `contact.html` — storefront pages
- `admin.html`, `admin.js`, `admin.css` — responsive, authenticated product administration
- `styles.css`, `i18n.js`, `app.js` — storefront styling, KZ/RU/EN translations, and interactions
- `products.js` — starter products used before the Supabase catalog has products
- `supabase-config.js`, `supabase-client.js` — public browser configuration and Supabase data access
- `supabase-schema.sql` — product table, storage bucket, and row/storage security policies
- `images/products/` — starter product images

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com/). Choose a strong database password and keep it private.
2. Open **SQL Editor**, create a query, paste all of `supabase-schema.sql`, and run it. It creates the `products` and `velora_admins` tables, the public-read `product-images` bucket, and policies that limit product edits and image uploads to explicitly registered admin users.
3. In **Authentication → Sign In / Providers**, keep Email enabled and turn off **Allow new users to sign up**. Then open **Authentication → Users → Add user**, create your admin with email and password, and confirm the account if the project requires it.
4. Add that user to the admin allowlist. In **SQL Editor**, run the final commented statement in `supabase-schema.sql` after replacing `YOUR_ADMIN_EMAIL` with the same email. The website checks both the Supabase login and this admin record.
5. Open **Project Settings → API Keys** (or the project **Connect** dialog) and copy the project URL and **publishable** key. A legacy `anon` key also works. Put them in `supabase-config.js` as `url` and `anonKey`. Never paste a `secret` or `service_role` key into website files; those keys bypass row-level security. The browser publishable key is expected to be public, and the SQL policies are what protect writes.
6. Under **Storage**, confirm that the `product-images` bucket exists after running the SQL. It is public-read so product photos can appear on the storefront; uploads are limited by Storage policies to registered admins. The form accepts JPG/JPEG, PNG, and WEBP up to 10 MB.
7. Commit the project to GitHub and enable **Settings → Pages → Deploy from a branch**, selecting the branch and folder containing `index.html`. Open the published `/admin.html`, sign in with the admin account, choose **Тауар қосу / Add Product**, select a photo, fill in the required fields, and press **Тауарды сақтау / Save Product**. The image is uploaded to Storage and the product is saved in the database. After the storefront reloads, it reads products from Supabase.

GitHub Pages serves the database and client configuration publicly, so the publishable key cannot be treated as a password. Keep signups disabled, keep the admin allowlist accurate, and retain the supplied RLS policies. Any visitor can read published product rows and public product images, but unauthenticated visitors cannot write them.

Customers can continue from the bag to `checkout.html` and submit their name, phone, city, address, and optional comment. Each order gets a UUID, an increasing display number, timestamp, server-calculated total, item and price snapshots, and `pending` status. In the admin panel, open **Orders** to view orders and set their status to `confirmed`, `shipped`, `delivered`, or `cancelled`.

## Local development and product images

Open `index.html` directly to preview the static demo catalog, or serve the folder with a local static server. Configure Supabase to use the authenticated admin and cloud catalog. Starter photos are individual files in `images/products/`; do not place image data in HTML or localStorage. The cart, wishlist, theme, and selected language still use browser storage.
