import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Users } from "lucide-react"

import { MarkdownRenderer } from "@/components/markdown-renderer"
import { SubmissionForm } from "@/components/submission-form"
import { Badge } from "@/components/ui/badge"
import { problems } from "@/lib/data/problems"
import { difficultyBadgeClass, difficultyLabel } from "@/lib/difficulty"

interface ProblemParams {
  id: string
}

export function generateStaticParams(): ProblemParams[] {
  return problems.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProblemParams>
}): Promise<Metadata> {
  const { id } = await params
  const problem = problems.find((p) => p.id.toLowerCase() === id.toLowerCase())
  if (!problem) {
    return { title: "Problem not found · CodeSubmit" }
  }
  return { title: `${problem.id}. ${problem.title} · CodeSubmit` }
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<ProblemParams>
}) {
  const { id } = await params
  const problem = problems.find((p) => p.id.toLowerCase() === id.toLowerCase())

  if (!problem) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-muted-foreground">
            {problem.id}
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">
            {problem.title}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Badge className={difficultyBadgeClass[problem.difficulty]}>
            {difficultyLabel(problem.difficulty)}
          </Badge>
          {problem.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
          <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground">
            <Users className="size-4" />
            {problem.solvedCount.toLocaleString()} solutions
          </span>
        </div>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <MarkdownRenderer content={problem.statement} />

          <section className="mt-8" aria-label="Sample tests">
            <h2 className="mb-3 text-sm font-semibold tracking-wide">
              Sample tests
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  Input
                </span>
                <pre className="overflow-x-auto rounded-lg bg-muted/70 px-3 py-2.5 font-mono text-sm leading-relaxed">
                  {problem.sampleInput}
                </pre>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  Output
                </span>
                <pre className="overflow-x-auto rounded-lg bg-muted/70 px-3 py-2.5 font-mono text-sm leading-relaxed">
                  {problem.sampleOutput}
                </pre>
              </div>
            </div>
          </section>
        </div>

        <SubmissionForm problemId={problem.id} />
      </div>
    </div>
  )
}