import { pgTableCreator } from "drizzle-orm/pg-core"

export const appTable = pgTableCreator((name) => name)
