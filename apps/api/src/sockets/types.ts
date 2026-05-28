import type { Socket } from "socket.io"
import type { ClientToServerEvents, ServerToClientEvents } from "@workspace/shared"

import type { AuthSession, AuthUser } from "../auth"

export type SocketData = {
  user: AuthUser
  session: AuthSession
  activeRoomId?: string
}

export type AuthenticatedSocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>
