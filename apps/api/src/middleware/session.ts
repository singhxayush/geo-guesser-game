import type { MiddlewareHandler } from "hono"

import { auth, type AuthSession, type AuthUser } from "../auth"

export type AppBindings = {
  Variables: {
    user: AuthUser | null
    session: AuthSession | null
  }
}

export const sessionMiddleware: MiddlewareHandler<AppBindings> = async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  c.set("user", session?.user ?? null)
  c.set("session", session?.session ?? null)

  await next()
}

export const requireUser: MiddlewareHandler<AppBindings> = async (c, next) => {
  const user = c.get("user")

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  await next()
}
