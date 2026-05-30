"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { clientEnv } from "@/lib/env"

type Question = {
  id: string
  question: string
  options: [string, string, string, string]
  correctOptionIndex: number
  explanation: string | null
}

export default function SingleQuizPage() {
  const [question, setQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)

  const fetchQuestion = async () => {
    setLoading(true)
    setError(null)
    setHasAnswered(false)
    setSelectedOption(null)

    try {
      const res = await fetch(`${clientEnv.NEXT_PUBLIC_API_URL}/api/quiz/random`)
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("No questions available. Add some in the admin dashboard!")
        }
        throw new Error("Failed to fetch question")
      }
      const data = await res.json()
      setQuestion(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestion()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !question) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <p className="text-red-500">{error || "Something went wrong"}</p>
        <Button onClick={fetchQuestion} variant="outline">Try Again</Button>
      </div>
    )
  }

  const handleSelect = (index: number) => {
    if (hasAnswered) return
    setSelectedOption(index)
    setHasAnswered(true)
  }

  const isCorrect = selectedOption === question.correctOptionIndex

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Single Quiz Mode</h1>
        <p className="text-muted-foreground">Test your knowledge with random questions.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="mb-6 text-xl font-medium leading-relaxed">{question.question}</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {question.options.map((option, index) => {
            let buttonVariant: "default" | "outline" | "secondary" | "destructive" = "outline"
            
            if (hasAnswered) {
              if (index === question.correctOptionIndex) {
                buttonVariant = "default" // Highlight correct answer
              } else if (index === selectedOption) {
                buttonVariant = "destructive" // Highlight wrong answer chosen
              }
            } else if (selectedOption === index) {
              buttonVariant = "secondary"
            }

            return (
              <Button
                key={index}
                variant={buttonVariant}
                className="h-auto w-full justify-start whitespace-normal px-4 py-4 text-left"
                onClick={() => handleSelect(index)}
                disabled={hasAnswered}
              >
                {option}
              </Button>
            )
          })}
        </div>

        {hasAnswered && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
            <div className={`mb-6 rounded-lg border p-4 ${isCorrect ? "border-green-500/20 bg-green-500/10" : "border-red-500/20 bg-red-500/10"}`}>
              <h3 className={`font-semibold ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {isCorrect ? "Correct!" : "Incorrect"}
              </h3>
              {question.explanation && (
                <p className="mt-2 text-sm text-muted-foreground">{question.explanation}</p>
              )}
            </div>
            
            <Button onClick={fetchQuestion} className="w-full sm:w-auto">
              Next Question
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
