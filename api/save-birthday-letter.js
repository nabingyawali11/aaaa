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

async function ensureLettersTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS birthday_letters (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      ip VARCHAR(100),
      user_agent TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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

  let content = "";
  try {
    const raw = await readBody(req);
    const body = raw ? JSON.parse(raw) : {};
    content = typeof body.letter === "string" ? body.letter.trim().slice(0, 2000) : "";
  } catch {
    content = "";
  }

  if (!content) {
    return send(res, 400, { error: "Letter is empty" });
  }

  const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "";
  const userAgent = req.headers["user-agent"] || "";

  try {
    const client = await getPool().connect();
    try {
      await ensureLettersTable(client);
      await client.query(
        "INSERT INTO birthday_letters (content, ip, user_agent) VALUES ($1, $2, $3)",
        [content, ip, userAgent],
      );
    } finally {
      client.release();
    }
    return send(res, 200, { success: true });
  } catch (error) {
    return send(res, 500, { error: error.message });
  }
}
