import Link from "next/link"
import { SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
        <SearchX className="size-6 text-muted-foreground" />
      </div>
      <Card className="mt-6 w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-lg">404 — Page not found</CardTitle>
          <CardDescription>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link href="/problemset">Back to problem set</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}