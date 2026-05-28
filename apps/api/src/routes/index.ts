import { Hono } from "hono"

import type { AppBindings } from "../middleware/session"
import { healthRoutes } from "./health"
import { roomRoutes } from "./rooms"

export const routes = new Hono<AppBindings>()
  .route("/health", healthRoutes)
  .route("/rooms", roomRoutes)
