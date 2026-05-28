import { relations } from "drizzle-orm"
import { doublePrecision, index, integer, jsonb, pgEnum, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core"

import { users } from "./users"
import { rooms } from "./rooms"
import { appTable } from "./table"

export const gameModeEnum = pgEnum("game_mode", ["quiz", "map"])
export const playModeEnum = pgEnum("play_mode", ["singleplayer", "multiplayer"])
export const matchStatusEnum = pgEnum("match_status", ["waiting", "active", "completed", "cancelled"])

export const matches = appTable(
  "matches",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    mode: gameModeEnum("mode").notNull(),
    playMode: playModeEnum("play_mode").notNull(),
    status: matchStatusEnum("status").notNull().default("waiting"),
    roomId: uuid("room_id").references(() => rooms.id, { onDelete: "set null" }),
    roundCount: integer("round_count").notNull(),
    durationSeconds: integer("duration_seconds").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("matches_room_id_idx").on(table.roomId),
    index("matches_status_idx").on(table.status),
    index("matches_created_at_idx").on(table.createdAt),
  ]
)

export const matchPlayers = appTable(
  "match_players",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    matchId: uuid("match_id")
      .notNull()
      .references(() => matches.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    score: integer("score").notNull().default(0),
    rank: integer("rank"),
    answers: jsonb("answers").$type<Record<string, unknown>[]>().notNull().default([]),
    guesses: jsonb("guesses").$type<Record<string, unknown>[]>().notNull().default([]),
    totalDistanceKm: doublePrecision("total_distance_km"),
    joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("match_players_match_user_idx").on(table.matchId, table.userId),
    index("match_players_user_id_idx").on(table.userId),
    index("match_players_match_score_idx").on(table.matchId, table.score),
  ]
)

export const matchesRelations = relations(matches, ({ one, many }) => ({
  room: one(rooms, {
    fields: [matches.roomId],
    references: [rooms.id],
  }),
  players: many(matchPlayers),
}))

export const matchPlayersRelations = relations(matchPlayers, ({ one }) => ({
  match: one(matches, {
    fields: [matchPlayers.matchId],
    references: [matches.id],
  }),
  user: one(users, {
    fields: [matchPlayers.userId],
    references: [users.id],
  }),
}))
