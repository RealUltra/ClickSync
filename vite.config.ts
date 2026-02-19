import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"),
        offscreen: resolve(__dirname, "offscreen.html"),
        "service-worker": resolve(
          __dirname,
          "src/background/service-worker.ts",
        ),
        "content-script": resolve(__dirname, "src/content/content-script.ts"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
