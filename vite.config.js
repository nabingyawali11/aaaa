import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const cloudinaryApiKey =
    env.CLOUDINARY_API_KEY || env.VITE_CLOUDINARY_API_KEY || "";
  const cloudinaryApiSecret = env.CLOUDINARY_API_SECRET || "";
  const cloudinaryCloudName =
    env.CLOUDINARY_CLOUD_NAME || env.VITE_CLOUDINARY_CLOUD_NAME || "";

  const cloudinaryAuth =
    cloudinaryApiKey && cloudinaryApiSecret
      ? "Basic " +
        Buffer.from(`${cloudinaryApiKey}:${cloudinaryApiSecret}`).toString(
          "base64",
        )
      : null;

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "api-log-attempt-dev",
        configureServer(server) {
          server.middlewares.use("/api/log-attempt", (req, res) => {
            import("./api/log-attempt.js")
              .then((module) => {
                if (!process.env.DATABASE_URL) {
                  process.env.DATABASE_URL = env.DATABASE_URL || "";
                }
                module.default(req, res);
              })
              .catch((error) => {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: error.message }));
              });
          });
        },
      },
      {
        name: "api-log-gallery-attempt-dev",
        configureServer(server) {
          server.middlewares.use("/api/log-gallery-attempt", (req, res) => {
            import("./api/log-gallery-attempt.js")
              .then((module) => {
                if (!process.env.DATABASE_URL) {
                  process.env.DATABASE_URL = env.DATABASE_URL || "";
                }
                module.default(req, res);
              })
              .catch((error) => {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: error.message }));
              });
          });
        },
      },
      {
        name: "api-save-letter-dev",
        configureServer(server) {
          server.middlewares.use("/api/save-letter", (req, res) => {
            import("./api/save-letter.js")
              .then((module) => {
                if (!process.env.DATABASE_URL) {
                  process.env.DATABASE_URL = env.DATABASE_URL || "";
                }
                module.default(req, res);
              })
              .catch((error) => {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: error.message }));
              });
          });
        },
      },
      {
        name: "api-save-birthday-letter-dev",
        configureServer(server) {
          server.middlewares.use("/api/save-birthday-letter", (req, res) => {
            import("./api/save-birthday-letter.js")
              .then((module) => {
                if (!process.env.DATABASE_URL) {
                  process.env.DATABASE_URL = env.DATABASE_URL || "";
                }
                module.default(req, res);
              })
              .catch((error) => {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: error.message }));
              });
          });
        },
      },
      {
        name: "api-get-countdown-dev",
        configureServer(server) {
          server.middlewares.use("/api/get-countdown", (req, res) => {
            import("./api/get-countdown.js")
              .then((module) => {
                if (!process.env.DATABASE_URL) {
                  process.env.DATABASE_URL = env.DATABASE_URL || "";
                }
                module.default(req, res);
              })
              .catch((error) => {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: error.message }));
              });
          });
        },
      },
      {
        name: "api-set-countdown-dev",
        configureServer(server) {
          server.middlewares.use("/api/set-countdown", (req, res) => {
            import("./api/set-countdown.js")
              .then((module) => {
                if (!process.env.DATABASE_URL) {
                  process.env.DATABASE_URL = env.DATABASE_URL || "";
                }
                module.default(req, res);
              })
              .catch((error) => {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: error.message }));
              });
          });
        },
      },
    ],
    server: {
      proxy: {
        "/api/cloudinary-search": {
          target: "https://api.cloudinary.com",
          changeOrigin: true,
          rewrite: (path) =>
            "/v1_1/" + cloudinaryCloudName + "/resources/search",
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (cloudinaryAuth) {
                proxyReq.setHeader("Authorization", cloudinaryAuth);
              }
              proxyReq.setHeader("Content-Type", "application/json");
            });
          },
        },
      },
    },
  };
});
