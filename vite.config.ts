import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./app") },
  },
  server: {
    port: Number(process.env.PORT) || 8000,
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    cssCodeSplit: true,
    minify: "esbuild",
    sourcemap: false,
    target: "esnext",
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
  optimizeDeps: {
    exclude: ["react", "react-dom"],
  },
  define: {
    __DEV__: process.env.NODE_ENV !== "production",
  },
});
