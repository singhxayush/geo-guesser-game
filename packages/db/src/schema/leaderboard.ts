import { relations } from "drizzle-orm"
import { index, integer, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core"

import { matches } from "./matches"
import { appTable } from "./table"
import { users } from "./users"

export const leaderboardEntries = appTable(
  "leaderboard_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    matchId: uuid("match_id").references(() => matches.id, { onDelete: "set null" }),
    mode: text("mode", { enum: ["quiz", "map"] }).notNull(),
    score: integer("score").notNull(),
    rank: integer("rank").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("leaderboard_entries_match_user_idx").on(table.matchId, table.userId),
    index("leaderboard_entries_mode_score_idx").on(table.mode, table.score),
    index("leaderboard_entries_user_id_idx").on(table.userId),
  ]
)

export const leaderboardEntriesRelations = relations(leaderboardEntries, ({ one }) => ({
  user: one(users, {
    fields: [leaderboardEntries.userId],
    references: [users.id],
  }),
  match: one(matches, {
    fields: [leaderboardEntries.matchId],
    references: [matches.id],
  }),
}))
