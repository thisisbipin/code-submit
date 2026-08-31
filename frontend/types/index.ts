export type Difficulty = "easy" | "medium" | "hard"

export type Verdict = "AC" | "WA" | "TLE" | "MLE" | "RTE" | "CE"

export interface Problem {
  id: string
  title: string
  tags: string[]
  difficulty: Difficulty
  statement: string
  sampleInput: string
  sampleOutput: string
  solvedCount: number
}

export interface Submission {
  id: string
  problemId: string
  userId: string
  verdict: Verdict
  language: string
  submittedAt: string
  runtime: number
  memory: number
}

export interface User {
  username: string
  rating: number
  rank: string
  solvedProblemIds: string[]
  avatarUrl: string
}