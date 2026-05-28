import { createDbFromEnv } from "@workspace/db"

import { env } from "./env"

export const db = createDbFromEnv(env)
