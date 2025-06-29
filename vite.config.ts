import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  define: {
    __DEV__: process.env.NODE_ENV !== "production",
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
  optimizeDeps: {
    include: ["app/lib/icons.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./app") },
  },
  server: {
    port: Number(process.env.PORT) || 8000,
  },
  // build: {
  //   cssCodeSplit: true,
  //   minify: "esbuild",
  //   reportCompressedSize: false,
  //   sourcemap: false,
  //   target: "esnext",
  //   commonjsOptions: { include: [/node_modules/] },
  // },
});
