"use client"

import * as React from "react"
import type { User } from "@/types"

const STORAGE_KEY = "codesubmit-auth-user"

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  /** True once the initial localStorage restore has completed. */
  hasLoaded: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [hasLoaded, setHasLoaded] = React.useState(false)

  // Restore the persisted session after mount. localStorage is not available
  // during SSR, so state must be restored client-side after hydration.
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored) as User)
      }
    } catch {
      // Corrupted/missing storage — treat as logged out.
    } finally {
      setHasLoaded(true)
    }
  }, [])

  const login = React.useCallback((nextUser: User) => {
    setUser(nextUser)
    setHasLoaded(true)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    } catch {
      // Ignore storage write failures (e.g. private browsing).
    }
  }, [])

  const logout = React.useCallback(() => {
    setUser(null)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore storage removal failures.
    }
  }, [])

  const value = React.useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      hasLoaded,
      login,
      logout,
    }),
    [user, hasLoaded, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}