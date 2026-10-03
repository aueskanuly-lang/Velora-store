# Velora

A responsive fashion store demo built with HTML, CSS, and vanilla JavaScript. No build step or framework is required.

## Project files

- `index.html` — storefront home page
- `catalog.html` — searchable, filterable product collection
- `product.html` — product detail page, selected with `?id=p01`
- `about.html` — brand story
- `contact.html` — contact form and FAQs
- `admin.html` — client-side studio dashboard
- `styles.css` — shared responsive styles and light/dark themes
- `app.js` — storefront interactions and browser storage
- `admin.js` — demo admin dashboard and product/category editing

## Run locally

Open `index.html` in a browser, or serve this folder with any static file server. Product photos and web fonts load from Unsplash and Google Fonts, so those require an internet connection. Store data, cart contents, favorites, and theme preference use `localStorage` in the browser.

## Demo boundaries

This is a front-end prototype. Checkout, contact, and newsletter forms show local feedback and do not transmit data. Orders, customers, and sales statistics in the admin dashboard are sample data. A production store needs a backend, payment provider, real form handling, and authenticated admin access.
