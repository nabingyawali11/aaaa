import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const CLOUDINARY_API_KEY = "517133882581521";
const CLOUDINARY_API_SECRET = "aI5N1pZNQ0oGQuIbUqX5EFVI2vA";
const CLOUDINARY_CLOUD_NAME = "dbckheyqm";
const cloudinaryAuth =
  "Basic " + Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString("base64");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/cloudinary-search": {
        target: "https://api.cloudinary.com",
        changeOrigin: true,
        rewrite: (path) => "/v1_1/" + CLOUDINARY_CLOUD_NAME + "/resources/search",
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            proxyReq.setHeader("Authorization", cloudinaryAuth);
            proxyReq.setHeader("Content-Type", "application/json");
          });
        },
      },
    },
  },
});
