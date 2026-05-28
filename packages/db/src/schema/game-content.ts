import { relations } from "drizzle-orm"
import { boolean, doublePrecision, index, integer, jsonb, text, timestamp, uuid } from "drizzle-orm/pg-core"

import { appTable } from "./table"

export const quizQuestions = appTable(
  "quiz_questions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    question: text("question").notNull(),
    options: jsonb("options").$type<[string, string, string, string]>().notNull(),
    correctOptionIndex: integer("correct_option_index").notNull(),
    explanation: text("explanation"),
    difficulty: text("difficulty").notNull().default("standard"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("quiz_questions_is_active_idx").on(table.isActive),
    index("quiz_questions_difficulty_idx").on(table.difficulty),
  ]
)

export const mapLocations = appTable(
  "map_locations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    label: text("label").notNull(),
    countryCode: text("country_code").notNull(),
    lat: doublePrecision("lat").notNull(),
    lng: doublePrecision("lng").notNull(),
    streetViewPanoId: text("street_view_pano_id"),
    heading: doublePrecision("heading"),
    pitch: doublePrecision("pitch"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("map_locations_country_code_idx").on(table.countryCode),
    index("map_locations_is_active_idx").on(table.isActive),
  ]
)

export const quizQuestionsRelations = relations(quizQuestions, () => ({}))
export const mapLocationsRelations = relations(mapLocations, () => ({}))
