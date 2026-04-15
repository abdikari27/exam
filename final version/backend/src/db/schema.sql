-- GLH database schema (kept small on purpose for college coursework)

CREATE TABLE IF NOT EXISTS producers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  image TEXT NOT NULL,
  methods TEXT NOT NULL,
  established TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  producer_id TEXT NOT NULL REFERENCES producers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_pence INTEGER NOT NULL CHECK (price_pence >= 0),
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  stock INTEGER NOT NULL CHECK (stock >= 0),
  unit TEXT NOT NULL,
  origin TEXT NOT NULL,
  organic BOOLEAN NOT NULL DEFAULT false
);

