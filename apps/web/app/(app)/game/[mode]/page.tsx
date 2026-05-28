import { notFound } from "next/navigation"

import { Button } from "@workspace/ui/components/button"

const modes = {
  quiz: {
    title: "Quiz Mode",
    body: "10 questions, four options, and a shared 15 minute timer.",
  },
  map: {
    title: "Map Mode",
    body: "5 Street View rounds, marker guesses, and distance-based scoring.",
  },
} as const

export default async function GameModePage({
  params,
}: {
  params: Promise<{ mode: string }>
}) {
  const { mode } = await params

  if (mode !== "quiz" && mode !== "map") {
    notFound()
  }

  const config = modes[mode]

  return (
    <div className="grid gap-6">
      <section>
        <h1 className="text-3xl font-semibold">{config.title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{config.body}</p>
      </section>

      <div className="grid min-h-96 place-items-center border border-border bg-card p-6 text-center">
        <div className="grid gap-4">
          <p className="text-sm text-muted-foreground">Game shell ready for round orchestration.</p>
          <Button>Start singleplayer</Button>
        </div>
      </div>
    </div>
  )
}
