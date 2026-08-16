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

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body !== undefined) {
      const raw = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
      return resolve(raw);
    }
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
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
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== "POST") {
    return send(res, 405, { error: "Method not allowed" });
  }

  let target = null;
  try {
    const raw = await readBody(req);
    const body = raw ? JSON.parse(raw) : {};
    target = typeof body.target === "string" ? new Date(body.target) : null;
    if (target && Number.isNaN(target.getTime())) {
      target = null;
    }
  } catch {
    target = null;
  }

  try {
    const client = await getPool().connect();
    try {
      await ensureTable(client);
      await client.query(
        `INSERT INTO countdown_target (id, target, updated_at)
         VALUES (1, $1, CURRENT_TIMESTAMP)
         ON CONFLICT (id)
         DO UPDATE SET target = EXCLUDED.target, updated_at = CURRENT_TIMESTAMP`,
        [target],
      );
    } finally {
      client.release();
    }
    return send(res, 200, { target: target ? target.toISOString() : null });
  } catch (error) {
    return send(res, 500, { error: error.message });
  }
}
