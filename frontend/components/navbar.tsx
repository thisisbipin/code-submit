"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Code2, LogIn, LogOut, Menu, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

const linkClass = (active: boolean) =>
  cn(
    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
    active ? "bg-muted text-foreground" : "text-muted-foreground"
  )

export function Navbar() {
  const { user, logout, hasLoaded } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isProblemSetActive =
    pathname === "/problemset" || pathname.startsWith("/problems/")
  const isSubmissionsActive = pathname.startsWith("/submissions")
  const isProfileActive = pathname.startsWith("/profile")

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    router.push("/problemset")
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link
          href="/problemset"
          className="flex shrink-0 items-center gap-2 font-semibold tracking-tight text-foreground"
          aria-label="CodeSubmit home"
        >
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Code2 className="size-4" />
          </span>
          <span className="hidden sm:inline">CodeSubmit</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <Link
            href="/problemset"
            className={linkClass(isProblemSetActive)}
            aria-current={isProblemSetActive ? "page" : undefined}
          >
            Problem Set
          </Link>
          {user && (
            <Link
              href="/submissions"
              className={linkClass(isSubmissionsActive)}
              aria-current={isSubmissionsActive ? "page" : undefined}
            >
              Submissions
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          {!hasLoaded ? (
            <div
              className="h-8 w-20 animate-pulse rounded-md bg-muted"
              aria-hidden
            />
          ) : user ? (
            <>
              <Link
                href={`/profile/${encodeURIComponent(user.username)}`}
                className={cn(
                  "hidden items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-foreground hover:bg-muted sm:flex",
                  isProfileActive && "bg-muted"
                )}
              >
                <Avatar className="size-7">
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="max-w-28 truncate">{user.username}</span>
              </Link>
              <Link
                href={`/profile/${encodeURIComponent(user.username)}`}
                className={cn(
                  "flex items-center rounded-md px-1.5 py-1 sm:hidden",
                  isProfileActive && "bg-muted"
                )}
                aria-label="Profile"
              >
                <Avatar className="size-7">
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hidden md:inline-flex"
              >
                <LogOut />
                Log Out
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">
                <LogIn />
                Log In
              </Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t px-4 py-3 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            <Link
              href="/problemset"
              className={linkClass(isProblemSetActive)}
              onClick={() => setMobileOpen(false)}
            >
              Problem Set
            </Link>
            {user && (
              <Link
                href="/submissions"
                className={linkClass(isSubmissionsActive)}
                onClick={() => setMobileOpen(false)}
              >
                Submissions
              </Link>
            )}
            <div className="mt-2 border-t pt-2">
              {user ? (
                <>
                  <Link
                    href={`/profile/${encodeURIComponent(user.username)}`}
                    className={linkClass(isProfileActive)}
                    onClick={() => setMobileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-1 w-full"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    Log Out
                  </Button>
                </>
              ) : (
                <Button asChild size="sm" className="w-full">
                  <Link href="/login">
                    <LogIn />
                    Log In
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}