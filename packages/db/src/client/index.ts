import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "../schema"

export function createDb(databaseUrl: string) {
  const sql = neon(databaseUrl)

  return drizzle(sql, { schema })
}

export type DbClient = ReturnType<typeof createDb>

export function createDbFromEnv(env: { DATABASE_URL?: string }) {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required")
  }

  return createDb(env.DATABASE_URL)
}
