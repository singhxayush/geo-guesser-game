import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"

import { auth } from "./auth"
import { env } from "./lib/env"
import { sessionMiddleware, type AppBindings } from "./middleware/session"
import { routes } from "./routes"
import { createSocketServer } from "./sockets"

export const app = new Hono<AppBindings>()

app.use("*", logger())
app.use(
  "*",
  cors({
    origin: env.WEB_ORIGIN,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
)
app.use("*", sessionMiddleware)

app.on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw))
app.route("/api", routes)

export type AppType = typeof app

const server = serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`API server listening on http://localhost:${info.port}`)
  }
)

createSocketServer(server as Parameters<typeof createSocketServer>[0])
