import { z } from "zod"

import { coordinatesSchema, uuidSchema } from "../validators/common"
import { gameModeSchema, matchStatusSchema, playModeSchema } from "../validators/game"

export const scoreboardEntrySchema = z.object({
  userId: z.string(),
  name: z.string(),
  score: z.number().int().min(0),
  rank: z.number().int().min(1),
})

export const matchSchema = z.object({
  id: uuidSchema,
  mode: gameModeSchema,
  playMode: playModeSchema,
  status: matchStatusSchema,
  roomId: uuidSchema.nullable(),
  startedAt: z.iso.datetime().nullable(),
  completedAt: z.iso.datetime().nullable(),
})

export const quizQuestionSchema = z.object({
  id: uuidSchema,
  question: z.string().min(1),
  options: z.array(z.string().min(1)).length(4),
})

export const mapRoundSchema = z.object({
  roundNumber: z.number().int().min(1).max(5),
  locationId: uuidSchema,
  streetViewPanoId: z.string().nullable(),
  coordinates: coordinatesSchema,
})

export type ScoreboardEntry = z.infer<typeof scoreboardEntrySchema>
export type Match = z.infer<typeof matchSchema>
export type QuizQuestion = z.infer<typeof quizQuestionSchema>
export type MapRound = z.infer<typeof mapRoundSchema>
