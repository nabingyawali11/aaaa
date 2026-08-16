-- Log tables for /api/log-attempt (Neon PostgreSQL)
-- Run these once against the Neon DB, or let the serverless handler
-- create them automatically (CREATE TABLE IF NOT EXISTS).

-- Live keystrokes (sent on every input change)
CREATE TABLE IF NOT EXISTS access_logs (
  id SERIAL PRIMARY KEY,
  value TEXT NOT NULL,
  ip VARCHAR(100),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Final "Unlock" button submissions
CREATE TABLE IF NOT EXISTS submitted_attempts (
  id SERIAL PRIMARY KEY,
  value TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  ip VARCHAR(100),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Letters written on the /something-to-tell-you page
CREATE TABLE IF NOT EXISTS letters (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  ip VARCHAR(100),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Letters written on the MissPage reply section
CREATE TABLE IF NOT EXISTS birthday_letters (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  ip VARCHAR(100),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Shared countdown target (single row, id = 1). Set from /countdown/set
CREATE TABLE IF NOT EXISTS countdown_target (
  id INTEGER PRIMARY KEY,
  target TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
