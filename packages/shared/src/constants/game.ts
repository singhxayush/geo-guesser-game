export const GAME_CONSTANTS = {
  quiz: {
    questionCount: 10,
    optionCount: 4,
    durationSeconds: 15 * 60,
    maxQuestionScore: 1_000,
  },
  map: {
    roundCount: 5,
    durationSeconds: 25 * 60,
    maxRoundScore: 5_000,
  },
  room: {
    codeLength: 6,
    maxPlayers: 8,
  },
} as const
