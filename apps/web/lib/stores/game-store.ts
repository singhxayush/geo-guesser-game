"use client"

import type { GameMode, Room } from "@workspace/shared"
import { create } from "zustand"

type GameState = {
  mode: GameMode | null
  activeRoom: Room | null
  setMode: (mode: GameMode | null) => void
  setActiveRoom: (room: Room | null) => void
}

export const useGameStore = create<GameState>((set) => ({
  mode: null,
  activeRoom: null,
  setMode: (mode) => set({ mode }),
  setActiveRoom: (activeRoom) => set({ activeRoom }),
}))
