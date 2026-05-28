import { z } from "zod"

import { mapGuessSchema, quizAnswerSchema } from "../validators/game"
import { roomCodeSchema, uuidSchema } from "../validators/common"
import { roomSchema } from "../contracts/rooms"
import { scoreboardEntrySchema } from "../contracts/matches"

export const socketErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
})

export const lobbyStateSchema = z.object({
  room: roomSchema,
})

export const timerStateSchema = z.object({
  matchId: uuidSchema,
  startedAt: z.iso.datetime(),
  endsAt: z.iso.datetime(),
  serverNow: z.iso.datetime(),
})

export const clientToServerEventsSchema = {
  "room:join": z.object({ code: roomCodeSchema }),
  "room:leave": z.object({ roomId: uuidSchema }),
  "room:ready": z.object({ roomId: uuidSchema, isReady: z.boolean() }),
  "match:start": z.object({ roomId: uuidSchema }),
  "quiz:answer": quizAnswerSchema,
  "map:guess": mapGuessSchema,
} as const

export const serverToClientEventsSchema = {
  "error": socketErrorSchema,
  "lobby:state": lobbyStateSchema,
  "match:started": z.object({ matchId: uuidSchema }),
  "match:timer": timerStateSchema,
  "scoreboard:update": z.object({ entries: z.array(scoreboardEntrySchema) }),
  "player:disconnected": z.object({ roomId: uuidSchema, userId: z.string() }),
  "player:reconnected": z.object({ roomId: uuidSchema, userId: z.string() }),
} as const

export type ClientToServerEventName = keyof typeof clientToServerEventsSchema
export type ServerToClientEventName = keyof typeof serverToClientEventsSchema

export type ClientToServerEvents = {
  [K in ClientToServerEventName]: (payload: z.infer<(typeof clientToServerEventsSchema)[K]>) => void
}

export type ServerToClientEvents = {
  [K in ServerToClientEventName]: (payload: z.infer<(typeof serverToClientEventsSchema)[K]>) => void
}
