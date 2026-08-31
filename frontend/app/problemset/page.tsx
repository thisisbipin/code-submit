import { ProblemTable } from "@/components/problem-table"
import { problems } from "@/lib/data/problems"

export default function ProblemSetPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Problem Set</h1>
        <p className="text-sm text-muted-foreground">
          {problems.length} problems — search, filter, and pick one to solve.
        </p>
      </div>
      <ProblemTable problems={problems} />
    </div>
  )
}