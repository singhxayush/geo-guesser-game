import { z } from "zod"

import { coordinatesSchema, uuidSchema } from "./common"

export const gameModeSchema = z.enum(["quiz", "map"])

export const playModeSchema = z.enum(["singleplayer", "multiplayer"])

export const matchStatusSchema = z.enum(["waiting", "active", "completed", "cancelled"])

export const roomStatusSchema = z.enum(["lobby", "in_progress", "closed"])

export const quizAnswerSchema = z.object({
  matchId: uuidSchema,
  questionId: uuidSchema,
  selectedOptionIndex: z.number().int().min(0).max(3),
  answeredAt: z.iso.datetime(),
})

export const mapGuessSchema = z.object({
  matchId: uuidSchema,
  roundNumber: z.number().int().min(1).max(5),
  guess: coordinatesSchema,
  guessedAt: z.iso.datetime(),
})
