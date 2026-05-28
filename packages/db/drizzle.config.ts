import { defineConfig } from "drizzle-kit"
import { config } from "dotenv"

config({ path: "../../.env" })

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required for Drizzle")
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema/index.ts",
  out: "./src/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  strict: false,
  verbose: true,
})
