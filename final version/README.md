# GLH (Green Local Hub)

GLH is a simple college project website that shows local producers and their products in one place. The idea is to make it easier for customers to browse local food/drink, add items to a basket, and place an order (collection or delivery).

This repo has:
- **Frontend**: Vite + React + TypeScript + Tailwind + shadcn/ui components
- **Backend**: Node.js + Express API connected to **PostgreSQL**

## What you need installed
- **Node.js (LTS)** and **npm**
- **PostgreSQL** (and a way to run it, e.g. local install)

## Frontend setup (Vite + React)
From the project root:

```bash
npm install
npm run dev
```

That starts the frontend dev server.

## Backend setup (Node + Express + Postgres)
The backend lives in `backend/`.

1) Go to the backend folder and install deps:

```bash
cd backend
npm install
```

2) Create a Postgres database (example name: `glh`).

3) Create a `backend/.env` file:

```bash
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/glh
```

4) Create the tables + sample data:

```bash
npm run db:setup
```

5) Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:5000` and includes:
- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/producers`

## Technologies used
- **React + TypeScript**: UI pages and components
- **React Router**: navigation between pages
- **Tailwind CSS**: styling
- **shadcn/ui + Radix**: accessible UI components
- **Node.js + Express**: REST API backend
- **PostgreSQL**: database for producers/products/orders
