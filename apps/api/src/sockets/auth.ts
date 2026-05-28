import type { Server } from "socket.io"
import type { ClientToServerEvents, ServerToClientEvents } from "@workspace/shared"

import { auth } from "../auth"

export function registerSocketAuth(io: Server<ClientToServerEvents, ServerToClientEvents>) {
  io.use(async (socket, next) => {
    const headers = new Headers()
    const cookie = socket.handshake.headers.cookie

    if (cookie) {
      headers.set("cookie", cookie)
    }

    const session = await auth.api.getSession({ headers })

    if (!session) {
      next(new Error("Unauthorized"))
      return
    }

    socket.data.user = session.user
    socket.data.session = session.session
    next()
  })
}
