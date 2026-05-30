export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col px-6 py-6">
        <div className="flex-1 py-8">{children}</div>
      </div>
    </main>
  )
}
