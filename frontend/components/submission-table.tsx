"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { problems } from "@/lib/data/problems"
import { formatDateTime, formatMemory, formatRuntime } from "@/lib/format"
import { verdictBadgeClass, verdictDescription } from "@/lib/verdict"
import type { Problem, Submission, Verdict } from "@/types"

interface SubmissionTableProps {
  submissions: Submission[]
}

export function SubmissionTable({ submissions }: SubmissionTableProps) {
  const [verdict, setVerdict] = useState<string>("all")
  const [problemId, setProblemId] = useState<string>("all")

  const problemMap = useMemo(
    () => new Map(problems.map((p) => [p.id, p])),
    []
  )

  const problemOptions = useMemo(() => {
    const ids = Array.from(new Set(submissions.map((s) => s.problemId)))
    return ids
      .map((id) => problemMap.get(id))
      .filter((p): p is Problem => p !== undefined)
      .sort((a, b) => a.id.localeCompare(b.id))
  }, [submissions, problemMap])

  const filtered = useMemo(
    () =>
      submissions
        .filter((s) => {
          if (verdict !== "all" && s.verdict !== verdict) return false
          if (problemId !== "all" && s.problemId !== problemId) return false
          return true
        })
        .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)),
    [submissions, verdict, problemId]
  )

  return (
    <div className="flex flex-col gap-4">
      {submissions.length > 0 && (
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={verdict} onValueChange={setVerdict}>
            <SelectTrigger className="w-full sm:w-48" aria-label="Filter by verdict">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All verdicts</SelectItem>
              {(Object.keys(verdictBadgeClass) as Verdict[]).map((v) => (
                <SelectItem key={v} value={v}>
                  {v} — {verdictDescription[v]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={problemId} onValueChange={setProblemId}>
            <SelectTrigger className="w-full sm:w-56" aria-label="Filter by problem">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All problems</SelectItem>
              {problemOptions.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.id} — {p.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Problem</TableHead>
              <TableHead>Verdict</TableHead>
              <TableHead className="hidden md:table-cell">Language</TableHead>
              <TableHead>When</TableHead>
              <TableHead className="text-right">Runtime</TableHead>
              <TableHead className="text-right">Memory</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  {submissions.length === 0
                    ? "No submissions yet."
                    : "No submissions match your filters."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((s) => {
                const problem = problemMap.get(s.problemId)
                return (
                  <TableRow key={s.id}>
                    <TableCell>
                      <Link
                        href={`/problems/${s.problemId}`}
                        className="font-medium text-foreground hover:underline"
                      >
                        {problem?.title ?? s.problemId}
                      </Link>
                      <span className="ml-2 font-mono text-xs text-muted-foreground">
                        {s.problemId}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={verdictBadgeClass[s.verdict]}
                        title={verdictDescription[s.verdict]}
                      >
                        {s.verdict}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {s.language}
                    </TableCell>
                    <TableCell
                      className="text-muted-foreground tabular-nums whitespace-nowrap"
                      title={s.submittedAt}
                    >
                      {formatDateTime(s.submittedAt)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground tabular-nums">
                      {formatRuntime(s.runtime)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground tabular-nums">
                      {formatMemory(s.memory)}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}