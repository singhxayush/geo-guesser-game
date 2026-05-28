import { GAME_CONSTANTS } from "@workspace/shared"

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

export function createRoomCode() {
  let code = ""

  for (let index = 0; index < GAME_CONSTANTS.room.codeLength; index += 1) {
    const [randomValue = 0] = crypto.getRandomValues(new Uint32Array(1))
    code += alphabet[randomValue % alphabet.length]
  }

  return code
}
