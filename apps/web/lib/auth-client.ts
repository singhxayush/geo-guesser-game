"use client"

import { createAuthClient } from "better-auth/react"

import { clientEnv } from "./env"

const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_API_URL,
})

export async function signInWithGoogle(callbackURL: string) {
  await authClient.signIn.social({
    provider: "google",
    callbackURL,
  })
}
