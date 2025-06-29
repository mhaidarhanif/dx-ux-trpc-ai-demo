import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// import { analyzer } from "vite-bundle-analyzer"; // Enable if needed

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    // analyzer()
  ],
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
    reportCompressedSize: false,
    sourcemap: false,
    target: "esnext",
    rollupOptions: { external: ["react", "react-dom"] },
    commonjsOptions: { include: [/node_modules/] },
  },
  optimizeDeps: {
    exclude: ["react", "react-dom"],
  },
  define: {
    __DEV__: process.env.NODE_ENV !== "production",
  },
});
