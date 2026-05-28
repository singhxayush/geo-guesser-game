import { and, eq } from "drizzle-orm"
import { rooms, roomPlayers, users, type DbClient } from "@workspace/db"
import type { CreateRoomRequest, Room } from "@workspace/shared"

import { createRoomCode } from "./room-code"

export class RoomService {
  constructor(private readonly db: DbClient) {}

  async createRoom(input: CreateRoomRequest, ownerId: string): Promise<Room> {
    const code = await this.createUniqueRoomCode()

    const [room] = await this.db
      .insert(rooms)
      .values({
        code,
        mode: input.mode,
        ownerId,
        maxPlayers: input.maxPlayers,
      })
      .returning()

    if (!room) {
      throw new Error("Failed to create room")
    }

    await this.db.insert(roomPlayers).values({
      roomId: room.id,
      userId: ownerId,
      isOwner: true,
      isReady: false,
      isConnected: true,
    })

    return this.getRoomOrThrow(room.id)
  }

  async joinRoom(code: string, userId: string): Promise<Room> {
    const room = await this.db.query.rooms.findFirst({
      where: (table, { eq }) => eq(table.code, code),
    })

    if (!room || room.status !== "lobby") {
      throw new Error("Room is not available")
    }

    const existingPlayer = await this.db.query.roomPlayers.findFirst({
      where: (table, { and, eq }) => and(eq(table.roomId, room.id), eq(table.userId, userId)),
    })

    if (!existingPlayer) {
      await this.db.insert(roomPlayers).values({
        roomId: room.id,
        userId,
        isOwner: room.ownerId === userId,
        isReady: false,
        isConnected: true,
      })
    }

    return this.getRoomOrThrow(room.id)
  }

  async setReady(roomId: string, userId: string, isReady: boolean) {
    await this.db
      .update(roomPlayers)
      .set({ isReady, lastSeenAt: new Date() })
      .where(and(eq(roomPlayers.roomId, roomId), eq(roomPlayers.userId, userId)))

    return this.getRoomOrThrow(roomId)
  }

  async setConnected(roomId: string, userId: string, isConnected: boolean) {
    await this.db
      .update(roomPlayers)
      .set({ isConnected, lastSeenAt: new Date() })
      .where(and(eq(roomPlayers.roomId, roomId), eq(roomPlayers.userId, userId)))

    return this.getRoomOrThrow(roomId)
  }

  async getRoomOrThrow(roomId: string): Promise<Room> {
    const room = await this.db.query.rooms.findFirst({
      where: (table, { eq }) => eq(table.id, roomId),
      with: {
        players: {
          with: {
            user: true,
          },
        },
      },
    })

    if (!room) {
      throw new Error("Room not found")
    }

    return {
      id: room.id,
      code: room.code,
      mode: room.mode,
      status: room.status,
      maxPlayers: room.maxPlayers,
      ownerId: room.ownerId,
      createdAt: room.createdAt.toISOString(),
      players: room.players.map((player) => ({
        userId: player.userId,
        name: player.user.name,
        image: player.user.image,
        isOwner: player.isOwner,
        isReady: player.isReady,
        isConnected: player.isConnected,
      })),
    }
  }

  private async createUniqueRoomCode() {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const code = createRoomCode()
      const existingRoom = await this.db.query.rooms.findFirst({
        where: (table, { eq }) => eq(table.code, code),
      })

      if (!existingRoom) {
        return code
      }
    }

    throw new Error("Could not allocate a room code")
  }
}

export async function ensureUserExists(db: DbClient, user: { id: string; name: string; email: string; image?: string | null }) {
  await db
    .insert(users)
    .values({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image ?? null,
      emailVerified: true,
    })
    .onConflictDoNothing()
}
