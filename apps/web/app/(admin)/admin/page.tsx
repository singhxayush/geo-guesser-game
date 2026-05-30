"use client"

import { useState } from "react"

import { Button } from "@workspace/ui/components/button"

import { clientEnv } from "@/lib/env"

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const formData = new FormData(e.currentTarget)
    const question = formData.get("question") as string
    const options = [
      formData.get("option0") as string,
      formData.get("option1") as string,
      formData.get("option2") as string,
      formData.get("option3") as string,
    ]
    const correctOptionIndex = parseInt(formData.get("correctOptionIndex") as string, 10)
    const explanation = formData.get("explanation") as string

    try {
      const res = await fetch(`${clientEnv.NEXT_PUBLIC_API_URL}/api/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          options,
          correctOptionIndex,
          explanation,
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to create question")
      }

      setMessage("Question created successfully!")
      ;(e.target as HTMLFormElement).reset()
    } catch (err: any) {
      setMessage(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage quiz questions and game content.</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold">Add New Question</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="question" className="text-sm font-medium">Question Text</label>
            <input
              id="question"
              name="question"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g. What is the capital of France?"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="space-y-2">
                <label htmlFor={`option${index}`} className="text-sm font-medium">Option {index + 1}</label>
                <input
                  id={`option${index}`}
                  name={`option${index}`}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label htmlFor="correctOptionIndex" className="text-sm font-medium">Correct Option</label>
            <select
              id="correctOptionIndex"
              name="correctOptionIndex"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="0">Option 1</option>
              <option value="1">Option 2</option>
              <option value="2">Option 3</option>
              <option value="3">Option 4</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="explanation" className="text-sm font-medium">Explanation (Optional)</label>
            <textarea
              id="explanation"
              name="explanation"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Explanation for the correct answer..."
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Question"}
          </Button>

          {message && (
            <p className={`text-sm ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
