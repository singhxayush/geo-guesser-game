import { relations } from "drizzle-orm"
import { boolean, index, integer, pgEnum, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core"

import { users } from "./users"
import { appTable } from "./table"

export const roomStatusEnum = pgEnum("room_status", ["lobby", "in_progress", "closed"])

export const rooms = appTable(
  "rooms",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    code: text("code").notNull(),
    mode: text("mode", { enum: ["quiz", "map"] }).notNull(),
    status: roomStatusEnum("status").notNull().default("lobby"),
    ownerId: text("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    maxPlayers: integer("max_players").notNull().default(8),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    closedAt: timestamp("closed_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("rooms_code_idx").on(table.code),
    index("rooms_owner_id_idx").on(table.ownerId),
    index("rooms_status_idx").on(table.status),
  ]
)

export const roomPlayers = appTable(
  "room_players",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    roomId: uuid("room_id")
      .notNull()
      .references(() => rooms.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    isOwner: boolean("is_owner").notNull().default(false),
    isReady: boolean("is_ready").notNull().default(false),
    isConnected: boolean("is_connected").notNull().default(true),
    joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("room_players_room_user_idx").on(table.roomId, table.userId),
    index("room_players_user_id_idx").on(table.userId),
    index("room_players_room_ready_idx").on(table.roomId, table.isReady),
  ]
)

export const roomsRelations = relations(rooms, ({ one, many }) => ({
  owner: one(users, {
    fields: [rooms.ownerId],
    references: [users.id],
  }),
  players: many(roomPlayers),
}))

export const roomPlayersRelations = relations(roomPlayers, ({ one }) => ({
  room: one(rooms, {
    fields: [roomPlayers.roomId],
    references: [rooms.id],
  }),
  user: one(users, {
    fields: [roomPlayers.userId],
    references: [users.id],
  }),
}))
