import "dotenv/config";
import express from "express";
import cors from "cors";
import { getPool } from "./db/pool.js";

const app = express();
const pool = getPool();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  const result = await pool.query("SELECT 1 as ok");
  res.json({ ok: true, db: result.rows[0].ok === 1 });
});

app.get("/api/producers", async (_req, res) => {
  const result = await pool.query("SELECT * FROM producers ORDER BY name ASC");
  res.json(result.rows);
});

app.get("/api/products", async (_req, res) => {
  const result = await pool.query(
    `
    SELECT
      p.*,
      jsonb_build_object(
        'id', pr.id,
        'name', pr.name,
        'description', pr.description,
        'location', pr.location,
        'image', pr.image,
        'methods', pr.methods,
        'established', pr.established
      ) AS producer,
      (p.price_pence / 100.0) AS price
    FROM products p
    JOIN producers pr ON pr.id = p.producer_id
    ORDER BY p.name ASC
    `
  );

  const products = result.rows.map(({ price_pence, producer_id, ...rest }) => rest);
  res.json(products);
});

app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    `
    SELECT
      p.*,
      jsonb_build_object(
        'id', pr.id,
        'name', pr.name,
        'description', pr.description,
        'location', pr.location,
        'image', pr.image,
        'methods', pr.methods,
        'established', pr.established
      ) AS producer,
      (p.price_pence / 100.0) AS price
    FROM products p
    JOIN producers pr ON pr.id = p.producer_id
    WHERE p.id = $1
    LIMIT 1
    `,
    [id]
  );

  if (result.rowCount === 0) return res.status(404).json({ message: "Product not found" });

  const { price_pence, producer_id, ...product } = result.rows[0];
  res.json(product);
});

const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
  console.log(`GLH API running on http://localhost:${port}`);
});

