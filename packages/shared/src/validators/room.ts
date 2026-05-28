import { z } from "zod"

import { gameModeSchema } from "./game"
import { roomCodeSchema, uuidSchema } from "./common"

export const createRoomSchema = z.object({
  mode: gameModeSchema,
  maxPlayers: z.number().int().min(2).max(8).default(8),
})

export const joinRoomSchema = z.object({
  code: roomCodeSchema,
})

export const roomParamsSchema = z.object({
  roomId: uuidSchema,
})
