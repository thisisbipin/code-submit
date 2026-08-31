"use client"

import type { Components } from "react-markdown"
import ReactMarkdown from "react-markdown"

import { cn } from "@/lib/utils"

/**
 * Thin wrapper around react-markdown that applies the styling used across the
 * app for problem-statement markdown (headings, paragraphs, emphasis, ordered
 * lists, and fenced code blocks). Rendered content stays inert — react-markdown
 * never sets raw HTML — which matters because statements are static/trusted.
 */

const components: Components = {
  h3: ({ className, children }) => (
    <h3
      className={cn(
        "text-sm font-semibold tracking-wide text-foreground",
        className
      )}
    >
      {children}
    </h3>
  ),
  p: ({ className, children }) => (
    <p className={cn("leading-relaxed", className)}>{children}</p>
  ),
  strong: ({ className, children }) => (
    <strong className={cn("font-semibold", className)}>{children}</strong>
  ),
  em: ({ className, children }) => (
    <em className={cn("italic", className)}>{children}</em>
  ),
  ol: ({ className, children }) => (
    <ol className={cn("list-decimal space-y-1 pl-5", className)}>{children}</ol>
  ),
  pre: ({ className, children }) => (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg bg-muted/70 px-3 py-2.5 font-mono text-sm leading-relaxed",
        className
      )}
    >
      {children}
    </pre>
  ),
  code: ({ className, children }) => (
    <code className={cn("font-mono", className)}>{children}</code>
  ),
}

export function MarkdownRenderer({
  content,
  className,
}: {
  content: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  )
}