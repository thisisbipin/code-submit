"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { CheckCircle2, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { useAuth } from "@/lib/auth-context"
import { difficultyBadgeClass, difficultyLabel } from "@/lib/difficulty"
import type { Difficulty, Problem } from "@/types"

interface ProblemTableProps {
  problems: Problem[]
}

export function ProblemTable({ problems }: ProblemTableProps) {
  const { user } = useAuth()
  const [search, setSearch] = useState("")
  const [tag, setTag] = useState("all")
  const [difficulty, setDifficulty] = useState<string>("all")

  const solvedIds = useMemo(
    () => new Set(user?.solvedProblemIds ?? []),
    [user]
  )

  const allTags = useMemo(
    () => Array.from(new Set(problems.flatMap((p) => p.tags))).sort(),
    [problems]
  )

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return problems.filter((p) => {
      if (tag !== "all" && !p.tags.includes(tag)) return false
      if (difficulty !== "all" && p.difficulty !== difficulty) return false
      if (query && !p.title.toLowerCase().includes(query) && !p.id.toLowerCase().includes(query)) {
        return false
      }
      return true
    })
  }, [problems, search, tag, difficulty])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={tag} onValueChange={setTag}>
          <SelectTrigger className="w-full sm:w-44" aria-label="Filter by tag">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tags</SelectItem>
            {allTags.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="w-full sm:w-44" aria-label="Filter by difficulty">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All difficulties</SelectItem>
            {(Object.keys(difficultyBadgeClass) as Difficulty[]).map((d) => (
              <SelectItem key={d} value={d}>
                {difficultyLabel(d)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Tags</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead className="text-right">Solved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No problems match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-muted-foreground">
                    {p.id}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/problems/${p.id}`}
                      className="flex items-center gap-1.5 font-medium text-foreground hover:underline"
                    >
                      {solvedIds.has(p.id) && (
                        <CheckCircle2
                          className="size-4 shrink-0 text-green-600 dark:text-green-500"
                          aria-label="Solved"
                        />
                      )}
                      {p.title}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="secondary" className="font-normal">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={difficultyBadgeClass[p.difficulty]}>
                      {difficultyLabel(p.difficulty)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground tabular-nums">
                    {p.solvedCount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}