"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@workspace/ui/components/button"

import { signOut, useSession } from "@/lib/auth-client"

export function LogoutButton() {
  const router = useRouter()
  const { data: session } = useSession()

  if (!session) return null

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={async () => {
        await signOut()
        router.push("/")
      }}
      className="gap-2"
    >
      <LogOut className="size-4" />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  )
}
