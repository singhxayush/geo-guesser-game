import { Activity, History, Play, Trophy } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

const stats = [
  { label: "Matches", value: "0", icon: History },
  { label: "Wins", value: "0", icon: Trophy },
  { label: "Active rooms", value: "0", icon: Activity },
]

export default function DashboardPage() {
  return (
    <div className="grid gap-8">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Start a quick match, rejoin active rooms, and track your history.
          </p>
        </div>
        <Button>
          <Play /> Quick play
        </Button>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-border bg-card p-5">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              {stat.label}
              <stat.icon className="size-4" />
            </div>
            <div className="mt-4 text-3xl font-semibold">{stat.value}</div>
          </div>
        ))}
      </section>
    </div>
  )
}
