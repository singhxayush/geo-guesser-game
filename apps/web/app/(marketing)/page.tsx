import { MapPinned, Trophy, Users } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"

import { PlayNowLink, SignInLink } from "./auth-links"

const features = [
  { icon: MapPinned, label: "Street View map rounds" },
  { icon: Trophy, label: "Quiz and distance scoring" },
  { icon: Users, label: "Realtime multiplayer rooms" },
]

export default function HomePage() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <section className="mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-between px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="text-sm font-semibold uppercase tracking-widest">Geo Guessing</div>
          <SignInLink className={buttonVariants({ size: "sm", variant: "outline" })}>
            Login
          </SignInLink>
        </nav>

        <div className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl space-y-6">
            <h1 className="max-w-2xl text-5xl font-semibold leading-tight md:text-7xl">
              Geo Guessing
            </h1>
            <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
              A focused multiplayer guessing platform for quiz battles, Street View rounds,
              synchronized lobbies, and live scoring.
            </p>
            <div className="flex flex-wrap gap-3">
              <PlayNowLink />
              <Link className={buttonVariants({ variant: "outline" })} href="/rooms">
                Join room
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-3 border border-border bg-card p-4 text-sm"
              >
                <feature.icon className="size-4 text-primary" />
                <span>{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
