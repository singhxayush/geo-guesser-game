import { zValidator } from "@hono/zod-validator"
import { eq, sql } from "drizzle-orm"
import { Hono } from "hono"
import { z } from "zod"

import { quizQuestions } from "@workspace/db/schema"

import { db } from "../lib/db"
import type { AppBindings } from "../middleware/session"
import { requireUser } from "../middleware/session"

export const quizRoutes = new Hono<AppBindings>()

quizRoutes.get("/random", async (c) => {
  const result = await db
    .select()
    .from(quizQuestions)
    .where(eq(quizQuestions.isActive, true))
    .orderBy(sql`RANDOM()`)
    .limit(1)

  if (result.length === 0) {
    return c.json({ error: "No quiz questions found" }, 404)
  }

  return c.json(result[0])
})

const createQuestionSchema = z.object({
  question: z.string().min(5),
  options: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  correctOptionIndex: z.number().int().min(0).max(3),
  explanation: z.string().optional(),
  difficulty: z.enum(["easy", "standard", "hard"]).default("standard"),
})

quizRoutes.post("/", requireUser, zValidator("json", createQuestionSchema), async (c) => {
  const data = c.req.valid("json")

  const [question] = await db
    .insert(quizQuestions)
    .values({
      question: data.question,
      options: data.options,
      correctOptionIndex: data.correctOptionIndex,
      explanation: data.explanation,
      difficulty: data.difficulty,
    })
    .returning()

  return c.json(question, 201)
})
