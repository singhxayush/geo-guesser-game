import { Hono } from "hono"
import { createRoomRequestSchema, joinRoomRequestSchema } from "@workspace/shared"

import type { AppBindings } from "../middleware/session"
import { requireUser } from "../middleware/session"
import { db } from "../lib/db"
import { RoomService } from "../services/rooms"

const roomService = new RoomService(db)

export const roomRoutes = new Hono<AppBindings>()
  .use("*", requireUser)
  .post("/", async (c) => {
    const user = c.get("user")
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401)
    }

    const input = createRoomRequestSchema.parse(await c.req.json())
    const room = await roomService.createRoom(input, user.id)

    return c.json({ room }, 201)
  })
  .post("/join", async (c) => {
    const user = c.get("user")
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401)
    }

    const input = joinRoomRequestSchema.parse(await c.req.json())
    const room = await roomService.joinRoom(input.code, user.id)

    return c.json({ room })
  })
