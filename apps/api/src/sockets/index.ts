import { Server } from "socket.io"
import type { Server as HttpServer } from "node:http"
import type { ClientToServerEvents, ServerToClientEvents } from "@workspace/shared"

import { env } from "../lib/env"
import { registerSocketAuth } from "./auth"
import { registerRoomHandlers } from "./room-handlers"
import type { AuthenticatedSocket } from "./types"

export function createSocketServer(httpServer: HttpServer) {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
      origin: env.WEB_ORIGIN,
      credentials: true,
    },
  })

  registerSocketAuth(io)

  io.on("connection", (socket) => {
    registerRoomHandlers(socket as AuthenticatedSocket)
  })

  return io
}
