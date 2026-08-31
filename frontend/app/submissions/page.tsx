"use client"

import { useMemo } from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { SubmissionTable } from "@/components/submission-table"
import { useAuth } from "@/lib/auth-context"
import { submissions } from "@/lib/data/submissions"

export default function SubmissionsPage() {
  const { user } = useAuth()

  const mySubmissions = useMemo(
    () =>
      user
        ? submissions.filter((s) => s.userId === user.username)
        : [],
    [user]
  )

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Submissions</h1>
          <p className="text-sm text-muted-foreground">
            {user
              ? `${mySubmissions.length} submission${
                  mySubmissions.length === 1 ? "" : "s"
                } for ${user.username}.`
              : null}
          </p>
        </div>
        <SubmissionTable submissions={mySubmissions} />
      </div>
    </ProtectedRoute>
  )
}