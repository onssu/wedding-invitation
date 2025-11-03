import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/server/schema",
  out: "src/server/migration",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
