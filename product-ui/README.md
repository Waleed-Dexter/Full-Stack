# Product UI (Frontend) — README

Frontend for the Full-Stack Developer Test. Displays product cards from the API using React, TypeScript, Vite, and Tailwind CSS.

---

## Quick Start (Local)

1) Install dependencies  
   npm install

2) Point UI to your API (create `.env` in project root):  
   VITE_API_URL=http://localhost:4000

3) Start the dev server  
   npm run dev

Open: http://localhost:5173 (make sure the backend is running on port 4000)

---

## Features

- Responsive product grid (1/2/3 columns with Tailwind)
- Card shows image, name, category, price
- Variant dropdown (size/color)
- Add to Cart button; Out of Stock disables the button
- Category filter calling `/products?category=...`
- Lightweight local cart counter

---

## Tech Stack

- React + TypeScript (Vite)
- Tailwind CSS for styling
- Fetch API for backend calls
- `.env` for API base URL

---

## Project Structure

    product-ui/
      src/
        components/
          ProductCard.tsx
        api.ts
        types.ts
        App.tsx
        index.css
      .env
      tailwind.config.js
      postcss.config.js
      package.json

Tailwind CSS (v4 PostCSS plugin example `postcss.config.js`):
export default {
plugins: {
'@tailwindcss/postcss': {},
autoprefixer: {},
},
}

`index.css`:
@tailwind base;
@tailwind components;
@tailwind utilities;

---

## API Integration

Reads `VITE_API_URL` and calls:
- `GET {VITE_API_URL}/products`
- `GET {VITE_API_URL}/products?category=Electronics`

For production, set `VITE_API_URL` to your deployed API URL and rebuild.

---

## Deployment (Netlify / Vercel)

1) Set environment variable in host:  
   `VITE_API_URL=https://<your-backend-host>`

2) Build the app:  
   npm run build

3) Deploy the `dist/` folder.

---

## Troubleshooting

- “Failed to fetch” → backend not running or wrong `VITE_API_URL`; restart `npm run dev` after editing `.env`
- Styles missing → check `tailwind.config.js`, `postcss.config.js`, and `import './index.css'` in `main.tsx`
- Env changes not applied → stop and restart Vite (`npm run dev`)
