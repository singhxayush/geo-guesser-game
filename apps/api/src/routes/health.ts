import { Hono } from "hono"

export const healthRoutes = new Hono().get("/", (c) =>
  c.json({
    ok: true,
    service: "geo-guesser-api",
    checkedAt: new Date().toISOString(),
  })
)
