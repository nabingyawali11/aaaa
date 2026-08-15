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

async function ensureTables(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS access_logs (
      id SERIAL PRIMARY KEY,
      value TEXT NOT NULL,
      ip VARCHAR(100),
      user_agent TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await client.query(`
    CREATE TABLE IF NOT EXISTS submitted_attempts (
      id SERIAL PRIMARY KEY,
      value TEXT NOT NULL,
      is_correct BOOLEAN NOT NULL,
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

  let value = "";
  let type = "keystroke";
  let isCorrect = false;
  try {
    const raw = await readBody(req);
    const body = raw ? JSON.parse(raw) : {};
    value = typeof body.value === "string" ? body.value.slice(0, 500) : "";
    type = body.type === "submission" ? "submission" : "keystroke";
    isCorrect = body.is_correct === true;
  } catch {
    value = "";
  }

  const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "";
  const userAgent = req.headers["user-agent"] || "";

  try {
    const client = await getPool().connect();
    try {
      await ensureTables(client);
      if (type === "submission") {
        await client.query(
          "INSERT INTO submitted_attempts (value, is_correct, ip, user_agent) VALUES ($1, $2, $3, $4)",
          [value, isCorrect, ip, userAgent],
        );
      } else {
        await client.query(
          "INSERT INTO access_logs (value, ip, user_agent) VALUES ($1, $2, $3)",
          [value, ip, userAgent],
        );
      }
    } finally {
      client.release();
    }
    return send(res, 200, { success: true });
  } catch (error) {
    return send(res, 500, { error: error.message });
  }
}
