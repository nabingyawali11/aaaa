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
    plugins: [react(), tailwindcss()],
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
