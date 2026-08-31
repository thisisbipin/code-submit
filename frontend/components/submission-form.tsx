"use client"

import Link from "next/link"
import { useState } from "react"
import type { FormEvent } from "react"
import { AlertCircle, Loader2, LogIn, Send } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { verdictBadgeClass } from "@/lib/verdict"
import type { Verdict } from "@/types"

const languages = [
  "GNU C++17",
  "GNU C++20",
  "PyPy 3",
  "Python 3",
  "Java 11",
  "Kotlin 1.9",
]

type JudgeState =
  | { status: "idle" }
  | { status: "judging" }
  | { status: "done"; verdict: Verdict; runtime: number; memory: number }

interface MockJudgeResult {
  verdict: Verdict
  runtime: number
  memory: number
}

/** Weighted random mock verdict — mostly AC, occasionally something else. */
function runMockJudge(): MockJudgeResult {
  const roll = Math.random()
  let verdict: Verdict
  if (roll < 0.65) verdict = "AC"
  else if (roll < 0.85) verdict = "WA"
  else if (roll < 0.93) verdict = "TLE"
  else if (roll < 0.97) verdict = "CE"
  else if (roll < 0.99) verdict = "RTE"
  else verdict = "MLE"

  if (verdict === "CE") {
    return { verdict, runtime: 0, memory: 0 }
  }
  if (verdict === "TLE") {
    return {
      verdict,
      runtime: 2000 + Math.floor(Math.random() * 1000),
      memory: 10 * 1024 + Math.floor(Math.random() * 1024),
    }
  }
  return {
    verdict,
    runtime:
      (verdict === "AC" ? 15 : 40) + Math.floor(Math.random() * 150),
    memory: 4 * 1024 + Math.floor(Math.random() * 64 * 1024),
  }
}

export function SubmissionForm({ problemId }: { problemId: string }) {
  const { user } = useAuth()
  const [language, setLanguage] = useState(languages[0])
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [state, setState] = useState<JudgeState>({ status: "idle" })

  const isLoggedIn = user !== null

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code.trim()) {
      setError("Paste some code before submitting.")
      return
    }

    setError(null)
    setState({ status: "judging" })

    // Simulate the judge taking a moment before producing a verdict.
    window.setTimeout(() => {
      setState({ status: "done", ...runMockJudge() })
    }, 700 + Math.random() * 600)
  }

  return (
    <Card className="lg:sticky lg:top-20">
      <CardHeader>
        <CardTitle>Submit solution</CardTitle>
        <CardDescription>
          {isLoggedIn ? `Submitting as ${user.username}` : "Log in to submit solutions."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="language" className="text-sm font-medium">
              Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language" className="w-full" aria-label="Language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="code" className="text-sm font-medium">
              Source code
            </label>
            <Textarea
              id="code"
              name="code"
              placeholder={
                "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // your code here\n  return 0;\n}"
              }
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="min-h-52 resize-y font-mono text-xs leading-relaxed"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {state.status === "done" && (
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border px-3 py-2 text-sm"
              aria-live="polite"
            >
              <span className="font-medium">Verdict</span>
              <Badge className={verdictBadgeClass[state.verdict]}>
                {state.verdict}
              </Badge>
              {state.verdict !== "CE" && (
                <span className="ml-auto tabular-nums text-muted-foreground">
                  {state.runtime} ms · {state.memory.toLocaleString()} KB
                </span>
              )}
            </div>
          )}

          {isLoggedIn ? (
            <Button type="submit" disabled={state.status === "judging"}>
              {state.status === "judging" ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send />
              )}
              {state.status === "judging" ? "Judging…" : "Submit"}
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <div
                role="status"
                className="flex items-start gap-2 rounded-md border border-amber-600/30 bg-amber-600/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-500"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>
                  You need an account to submit. Log in to get a mock verdict for{" "}
                  {problemId}.
                </span>
              </div>
              <Button asChild>
                <Link href="/login">
                  <LogIn />
                  Log in to submit
                </Link>
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}