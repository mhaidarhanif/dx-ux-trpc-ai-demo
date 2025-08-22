import "@dotenvx/dotenvx/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "models"),
  migrations: {
    path: path.join("prisma", "migrations"),
    seed: "bun app/lib/database/seed.ts",
  },
  views: {
    path: path.join("prisma", "views"),
  },
  typedSql: {
    path: path.join("prisma", "queries"),
  },
});
