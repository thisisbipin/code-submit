"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { ReactNode } from "react"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, hasLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect once the auth state has been restored from localStorage,
    // otherwise a logged-in user would be bounced to /login on refresh.
    if (hasLoaded && !isAuthenticated) {
      router.replace("/login")
    }
  }, [hasLoaded, isAuthenticated, router])

  // Show a placeholder while the session is restoring instead of a blank page.
  if (!hasLoaded) {
    return (
      <div
        role="status"
        aria-label="Checking session"
        className="flex min-h-64 items-center justify-center"
      >
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Not authenticated — the redirect to /login fires from the effect above.
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}