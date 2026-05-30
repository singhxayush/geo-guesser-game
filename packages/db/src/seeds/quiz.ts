import { config } from "dotenv"
import { resolve } from "path"

// Load env from the root .env file
config({ path: resolve(__dirname, "../../../../.env") })

import { createDbFromEnv } from "../client"
import { quizQuestions } from "../schema"

const db = createDbFromEnv(process.env as { DATABASE_URL: string })

const dummyQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"] as [string, string, string, string],
    correctOptionIndex: 2,
    explanation: "Paris is the capital and most populous city of France.",
    difficulty: "easy",
  },
  {
    question: "Which river flows through London?",
    options: ["Thames", "Seine", "Rhine", "Danube"] as [string, string, string, string],
    correctOptionIndex: 0,
    explanation: "The River Thames flows through southern England including London.",
    difficulty: "easy",
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"] as [string, string, string, string],
    correctOptionIndex: 1,
    explanation: "Vatican City is an independent city-state enclaved within Rome, Italy.",
    difficulty: "standard",
  },
  {
    question: "Mount Everest is located in which mountain range?",
    options: ["Alps", "Rockies", "Andes", "Himalayas"] as [string, string, string, string],
    correctOptionIndex: 3,
    explanation: "The Himalayas are a mountain range in Asia separating the plains of the Indian subcontinent from the Tibetan Plateau.",
    difficulty: "easy",
  },
  {
    question: "Which African country is known as the 'Pearl of Africa'?",
    options: ["Kenya", "Tanzania", "Uganda", "Rwanda"] as [string, string, string, string],
    correctOptionIndex: 2,
    explanation: "Winston Churchill famously dubbed Uganda the 'Pearl of Africa' in 1908.",
    difficulty: "hard",
  },
  {
    question: "What is the longest river in South America?",
    options: ["Paraná River", "Orinoco River", "Amazon River", "Magdalena River"] as [string, string, string, string],
    correctOptionIndex: 2,
    explanation: "The Amazon River is the longest river in South America and the largest in the world by discharge volume of water.",
    difficulty: "standard",
  },
  {
    question: "Which country has the most natural lakes?",
    options: ["United States", "Russia", "Canada", "Finland"] as [string, string, string, string],
    correctOptionIndex: 2,
    explanation: "Canada has more lakes than the rest of the world combined.",
    difficulty: "hard",
  },
]

async function seed() {
  console.log("Seeding quiz questions...")
  
  try {
    for (const q of dummyQuestions) {
      await db.insert(quizQuestions).values(q)
    }
    console.log("✅ Seeded 7 quiz questions successfully!")
  } catch (err) {
    console.error("❌ Error seeding questions:", err)
  }
  
  process.exit(0)
}

seed()
