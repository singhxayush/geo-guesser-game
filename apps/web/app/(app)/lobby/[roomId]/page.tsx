import { UsersRound } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

export default async function LobbyPage({
  params,
}: {
  params: Promise<{ roomId: string }>
}) {
  const { roomId } = await params

  return (
    <div className="grid gap-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-semibold">Lobby</h1>
          <p className="mt-2 text-sm text-muted-foreground">Room {roomId}</p>
        </div>
        <Button>Ready</Button>
      </section>

      <div className="flex min-h-80 items-center justify-center border border-border bg-card text-sm text-muted-foreground">
        <UsersRound className="mr-2 size-4" /> Waiting for players
      </div>
    </div>
  )
}
