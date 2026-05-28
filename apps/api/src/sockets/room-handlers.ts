import { clientToServerEventsSchema } from "@workspace/shared"

import { db } from "../lib/db"
import { RoomService } from "../services/rooms"
import type { AuthenticatedSocket } from "./types"

const roomService = new RoomService(db)

export function registerRoomHandlers(socket: AuthenticatedSocket) {
  socket.on("room:join", async (payload) => {
    try {
      const input = clientToServerEventsSchema["room:join"].parse(payload)
      const room = await roomService.joinRoom(input.code, socket.data.user.id)
      socket.data.activeRoomId = room.id
      await socket.join(room.id)
      socket.to(room.id).emit("lobby:state", { room })
      socket.emit("lobby:state", { room })
    } catch (error) {
      socket.emit("error", {
        code: "ROOM_JOIN_FAILED",
        message: error instanceof Error ? error.message : "Unable to join room",
      })
    }
  })

  socket.on("room:ready", async (payload) => {
    try {
      const input = clientToServerEventsSchema["room:ready"].parse(payload)
      const room = await roomService.setReady(input.roomId, socket.data.user.id, input.isReady)
      socket.to(input.roomId).emit("lobby:state", { room })
      socket.emit("lobby:state", { room })
    } catch (error) {
      socket.emit("error", {
        code: "ROOM_READY_FAILED",
        message: error instanceof Error ? error.message : "Unable to update ready state",
      })
    }
  })

  socket.on("room:leave", async (payload) => {
    const input = clientToServerEventsSchema["room:leave"].parse(payload)
    await socket.leave(input.roomId)
    socket.data.activeRoomId = undefined
  })
}
