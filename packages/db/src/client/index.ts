import { neon } from "@neondatabase/serverless"
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http"
import { drizzle as drizzleNode } from "drizzle-orm/node-postgres"
import pg from "pg"

import * as schema from "../schema"

function isNeonUrl(url: string): boolean {
  return url.includes("neon.tech") || url.includes("neon.com")
}

export function createDb(databaseUrl: string) {
  if (isNeonUrl(databaseUrl)) {
    const sql = neon(databaseUrl)
    return drizzleNeon(sql, { schema })
  }

  const pool = new pg.Pool({ connectionString: databaseUrl })
  return drizzleNode(pool, { schema })
}

export type DbClient = ReturnType<typeof createDb>

export function createDbFromEnv(env: { DATABASE_URL?: string }) {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required")
  }

  return createDb(env.DATABASE_URL)
}
