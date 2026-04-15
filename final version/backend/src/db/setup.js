import "dotenv/config";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getPool } from "./pool.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSql(pool, fileName) {
  const sqlPath = path.join(__dirname, fileName);
  const sql = await readFile(sqlPath, "utf8");
  await pool.query(sql);
}

async function main() {
  const pool = getPool();

  try {
    await runSql(pool, "schema.sql");
    await runSql(pool, "seed.sql");
    console.log("Database setup done.");
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

