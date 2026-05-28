import Redis from "ioredis"

import { env } from "./env"

export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
})

export const redisKeys = {
  roomState: (roomId: string) => `room:${roomId}:state`,
  roomPresence: (roomId: string) => `room:${roomId}:presence`,
  matchTimer: (matchId: string) => `match:${matchId}:timer`,
} as const
