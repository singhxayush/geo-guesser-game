import { Plus, UsersRound } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

export default function RoomsPage() {
  return (
    <div className="grid gap-8">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-semibold">Rooms</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Create a lobby, share the room code, and wait for ready states before the match starts.
          </p>
        </div>
        <Button>
          <Plus /> Create room
        </Button>
      </section>

      <div className="flex min-h-64 items-center justify-center border border-dashed border-border text-sm text-muted-foreground">
        <UsersRound className="mr-2 size-4" /> No active rooms yet
      </div>
    </div>
  )
}
