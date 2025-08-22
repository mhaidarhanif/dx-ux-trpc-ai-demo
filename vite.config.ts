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

  optimizeDeps: {
    include: ["app/lib/icons.ts"],
  },

  server: {
    port: Number(process.env.PORT) || 8000,
  },

  esbuild: {
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },

  resolve: {
    alias: {
      // https://ui.shadcn.com/docs/installation/vite
      "@": path.resolve(__dirname, "./app"),

      // https://github.com/remix-run/react-router/issues/12568
      // https://github.com/oven-sh/bun/issues/9949
      ...(process.env.NODE_ENV === "production"
        ? { "react-dom/server.bun": "react-dom/server.browser" }
        : {}),
    },
  },
});
