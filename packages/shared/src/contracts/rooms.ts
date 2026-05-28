import { z } from "zod"

import { createRoomSchema, roomCodeSchema, roomStatusSchema } from "../validators"
import { gameModeSchema } from "../validators/game"

export const roomPlayerSchema = z.object({
  userId: z.string(),
  name: z.string(),
  image: z.string().url().nullable(),
  isOwner: z.boolean(),
  isReady: z.boolean(),
  isConnected: z.boolean(),
})

export const roomSchema = z.object({
  id: z.string(),
  code: roomCodeSchema,
  mode: gameModeSchema,
  status: roomStatusSchema,
  maxPlayers: z.number().int().min(2).max(8),
  ownerId: z.string(),
  players: z.array(roomPlayerSchema),
  createdAt: z.iso.datetime(),
})

export const createRoomRequestSchema = createRoomSchema

export const createRoomResponseSchema = z.object({
  room: roomSchema,
})

export const joinRoomRequestSchema = z.object({
  code: roomCodeSchema,
})

export const joinRoomResponseSchema = z.object({
  room: roomSchema,
})

export type RoomPlayer = z.infer<typeof roomPlayerSchema>
export type Room = z.infer<typeof roomSchema>
export type CreateRoomRequest = z.infer<typeof createRoomRequestSchema>
export type CreateRoomResponse = z.infer<typeof createRoomResponseSchema>
export type JoinRoomRequest = z.infer<typeof joinRoomRequestSchema>
export type JoinRoomResponse = z.infer<typeof joinRoomResponseSchema>
