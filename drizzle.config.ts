import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  dialect: 'turso',
  dbCredentials: {
    url: 'file:nexssio.db',
  },
});
