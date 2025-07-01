import { defineConfig } from "taze";

export default defineConfig({
  packageMode: {
    "@types/node": "minor",
    recharts: "minor",
  },
  ignorePaths: ["**/node_modules/**", "**/test/**"],
});
