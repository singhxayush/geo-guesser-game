"use client"

import type { ClientToServerEvents, ServerToClientEvents } from "@workspace/shared"
import { io, type Socket } from "socket.io-client"

import { clientEnv } from "./env"

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null

export function getSocket() {
  socket ??= io(clientEnv.NEXT_PUBLIC_SOCKET_URL, {
    withCredentials: true,
    autoConnect: false,
  })

  return socket
}
