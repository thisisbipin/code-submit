"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { useMemo } from "react"
import { Medal, Target } from "lucide-react"

import { SubmissionTable } from "@/components/submission-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { problems } from "@/lib/data/problems"
import { submissions } from "@/lib/data/submissions"
import { getUserByUsername } from "@/lib/data/users"
import { difficultyBadgeClass, difficultyLabel } from "@/lib/difficulty"
import { rankColorClass } from "@/lib/rank"
import type { Problem } from "@/types"

export function ProfileView({ username }: { username: string }) {
  const profileUser = useMemo(
    () => getUserByUsername(username),
    [username]
  )

  const solvedProblems = useMemo(() => {
    if (!profileUser) return []
    return profileUser.solvedProblemIds
      .map((id) => problems.find((p) => p.id === id))
      .filter((p): p is Problem => p !== undefined)
  }, [profileUser])

  const userSubmissions = useMemo(
    () =>
      profileUser
        ? submissions.filter((s) => s.userId === profileUser.username)
        : [],
    [profileUser]
  )

  if (!profileUser) {
    // Only reachable while authenticated (rendered inside ProtectedRoute).
    notFound()
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <Card>
        <CardContent className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Avatar className="size-16">
            <AvatarImage src={profileUser.avatarUrl} alt={profileUser.username} />
            <AvatarFallback className="text-base">
              {profileUser.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <h1
              className={`truncate text-2xl font-semibold tracking-tight ${rankColorClass(profileUser.rating)}`}
            >
              {profileUser.username}
            </h1>
            <p className="text-sm text-muted-foreground">{profileUser.rank}</p>
          </div>

          <div className="flex flex-wrap items-start gap-x-8 gap-y-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Rating
              </span>
              <span
                className={`inline-flex items-center gap-1 text-lg font-semibold tabular-nums ${rankColorClass(profileUser.rating)}`}
              >
                <Target className="size-4" />
                {profileUser.rating}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Current rank
              </span>
              <span className="inline-flex items-center gap-1 text-lg font-semibold">
                <Medal className="size-4 text-muted-foreground" />
                {profileUser.rank}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Solved
              </span>
              <span className="text-lg font-semibold tabular-nums">
                {solvedProblems.length}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Submissions
              </span>
              <span className="text-lg font-semibold tabular-nums">
                {userSubmissions.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Solved problems</CardTitle>
          <CardDescription>
            {solvedProblems.length} problem
            {solvedProblems.length === 1 ? "" : "s"} solved by {profileUser.username}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {solvedProblems.length === 0 ? (
            <p className="text-sm text-muted-foreground">No solved problems yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {solvedProblems.map((p) => (
                <Link
                  key={p.id}
                  href={`/problems/${p.id}`}
                  className="flex min-w-0 items-center gap-2 rounded-lg px-3 py-2 text-sm ring-1 ring-foreground/10 transition-colors hover:bg-muted"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {p.id}
                  </span>
                  <span className="truncate font-medium">{p.title}</span>
                  <Badge className={`ml-auto ${difficultyBadgeClass[p.difficulty]}`}>
                    {difficultyLabel(p.difficulty)}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <section
        className="flex flex-col gap-3"
        aria-labelledby="recent-submissions-heading"
      >
        <div className="flex flex-col gap-1">
          <h2
            id="recent-submissions-heading"
            className="text-xl font-semibold tracking-tight"
          >
            Recent submissions
          </h2>
          <p className="text-sm text-muted-foreground">
            Latest activity from {profileUser.username}.
          </p>
        </div>
        <SubmissionTable submissions={userSubmissions} />
      </section>
    </div>
  )
}