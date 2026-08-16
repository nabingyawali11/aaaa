import pg from "pg";

const { Pool } = pg;

let pool;

function getPool() {
  if (!pool) {
    const rawUrl = process.env.DATABASE_URL || "";
    if (!rawUrl) {
      throw new Error("DATABASE_URL not configured");
    }

    const connectionString = rawUrl
      .replace("?channel_binding=require", "")
      .replace("&channel_binding=require", "")
      .replace("?sslmode=require", "")
      .replace("&sslmode=require", "");

    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
      max: 3,
    });
  }
  return pool;
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

async function ensureTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS countdown_target (
      id INTEGER PRIMARY KEY,
      target TIMESTAMP WITH TIME ZONE,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== "GET") {
    return send(res, 405, { error: "Method not allowed" });
  }

  try {
    const client = await getPool().connect();
    let target = null;
    try {
      await ensureTable(client);
      const { rows } = await client.query(
        "SELECT target FROM countdown_target WHERE id = 1",
      );
      if (rows.length && rows[0].target) {
        target = new Date(rows[0].target).toISOString();
      }
    } finally {
      client.release();
    }
    return send(res, 200, { target });
  } catch (error) {
    return send(res, 500, { error: error.message });
  }
}
