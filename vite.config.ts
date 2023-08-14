import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import ssr from "vite-plugin-ssr/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ssr({
      prerender: true,
    }),
  ],
  resolve: {
    alias: {
      "#": "/src",
    },
  },
});
