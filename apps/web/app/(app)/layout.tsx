import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"

import { LogoutButton } from "@/components/logout-button"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col px-6 py-6">
        <header className="flex items-center justify-between border-b border-border pb-4">
          <Link href="/dashboard" className="text-sm font-semibold uppercase tracking-widest">
            Geo Guessing
          </Link>
          <nav className="flex items-center gap-2">
            <Link className={buttonVariants({ size: "sm", variant: "ghost" })} href="/rooms">
              Rooms
            </Link>
            <Link className={buttonVariants({ size: "sm", variant: "ghost" })} href="/game/quiz">
              Quiz
            </Link>
            <Link className={buttonVariants({ size: "sm", variant: "ghost" })} href="/game/map">
              Map
            </Link>
            <LogoutButton />
          </nav>
        </header>
        <div className="flex-1 py-8">{children}</div>
      </div>
    </main>
  )
}
