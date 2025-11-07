# Product API (Backend) — README

Backend for the Full-Stack Developer Test. Provides REST endpoints for products using Node.js, Express, TypeScript, and Prisma.

---

## Quick Start (Local)

1) Install dependencies  
   npm install

2) Create DB & generate Prisma client  
   npx prisma migrate dev --name init

3) Seed demo data (3 products)  
   npm run seed

4) Start the API (hot reload)  
   npm run dev

Server: http://localhost:4000  
Health: http://localhost:4000/health  
Products: http://localhost:4000/products  
Filter: http://localhost:4000/products?category=Apparel

---

## API Endpoints

- GET `/products` — list products (with variants)
- GET `/products/:id` — get product by id
- GET `/products?category=Apparel` — filter by category
- POST `/products` — create product (validated)

Sample POST body:
{
"name": "Water Bottle",
"priceCents": 1299,
"imageUrl": "https://picsum.photos/seed/bottle/600/400",
"category": "Accessories",
"inStock": true,
"variants": ["500ml", "1L"]
}

---

## Tech Stack

- Runtime: Node.js + Express
- Language: TypeScript
- ORM: Prisma
- DB: SQLite (dev), PostgreSQL (prod)
- Validation: Zod
- CORS: enabled by default

---

## Project Structure

    product-api/
      prisma/
        schema.prisma
      src/
        server.ts
        seed.ts
      .env
      package.json
      tsconfig.json

`.env` (root):
DATABASE_URL="file:./dev.db"
PORT=4000

---

## Useful Commands

- Open DB UI:  
  npx prisma studio
- Regenerate Prisma client:  
  npx prisma generate
- Build & run compiled JS:  
  npm run build && npm start

---

## Deployment (Render / Railway / Heroku)

1) In `prisma/schema.prisma`, switch datasource to Postgres:
   datasource db {
   provider = "postgresql"
   url      = env("DATABASE_URL")
   }

2) Set env var on platform:  
   `DATABASE_URL=<postgres-connection-string>`

3) Build & start:
   npm install
   npx prisma generate
   npm run build
   npm start

4) After first deploy, run once:
   npx prisma migrate deploy
   node dist/seed.js

---

## Troubleshooting

- `/products` is empty → run `npm run seed`
- `@prisma/client` missing → `npx prisma generate`
- Port in use → change `PORT` in `.env`
- CORS issues → ensure `app.use(cors())` is present
