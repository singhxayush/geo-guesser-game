"use client"

import { ArrowRight } from "lucide-react"

import { Button, buttonVariants } from "@workspace/ui/components/button"

import { signInWithGoogle } from "@/lib/auth-client"

type AuthLinkProps = {
  children: React.ReactNode
  className?: string
}

export function SignInLink({ children, className }: AuthLinkProps) {
  async function signIn() {
    await signInWithGoogle(`${window.location.origin}/dashboard`)
  }

  return (
    <Button className={className ?? buttonVariants()} onClick={signIn} type="button">
      {children}
    </Button>
  )
}

export function PlayNowLink() {
  return (
    <SignInLink>
      Play now <ArrowRight />
    </SignInLink>
  )
}
