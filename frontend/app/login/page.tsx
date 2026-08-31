"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { AlertCircle, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { users } from "@/lib/data/users"

const demoUsernames = users.map((u) => u.username).join(", ")

export default function LoginPage() {
  const { login, isAuthenticated, hasLoaded } = useAuth()
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  // Already authenticated — send to the problem set instead.
  useEffect(() => {
    if (hasLoaded && isAuthenticated) {
      router.replace("/problemset")
    }
  }, [hasLoaded, isAuthenticated, router])

  if (hasLoaded && isAuthenticated) {
    return null
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const name = username.trim()
    if (!name) {
      setError("Username is required.")
      return
    }
    if (!password) {
      setError("Password is required.")
      return
    }

    const normalized = name.toLowerCase()
    const user = users.find((u) => u.username.toLowerCase() === normalized)
    if (!user) {
      setError(`No account found for "${name}". Try one of the demo accounts below.`)
      return
    }

    login(user)
    router.push("/problemset")
  }

  return (
    <div className="flex h-full items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>
            Sign in to submit solutions and track your submissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="tourist"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <Button type="submit" className="w-full">
              <LogIn />
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1 text-xs text-muted-foreground">
          <span>
            Demo accounts: <span className="font-medium text-foreground">{demoUsernames}</span>
          </span>
          <span>Any password works — this is a simulated login.</span>
        </CardFooter>
      </Card>
    </div>
  )
}