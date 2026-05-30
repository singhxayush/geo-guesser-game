"use client"

import { createAuthClient } from "better-auth/react"

import { clientEnv } from "./env"

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_API_URL,
})

export const { useSession, signOut } = authClient

export async function signInWithGoogle(callbackURL: string) {
  const res = await authClient.signIn.social({
    provider: "google",
    callbackURL,
  })

  if (res?.error) {
    console.error("Sign-in failed:", res.error.message)
  }
}

