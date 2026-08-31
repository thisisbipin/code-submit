import type { Verdict } from "@/types"

/** Tailwind classes applied to a Badge for each verdict. Shared by the
 * submission form and the submission-history table. */
/** Human-readable expansion of each verdict, e.g. for a tooltip. */
export const verdictDescription: Record<Verdict, string> = {
  AC: "Accepted",
  WA: "Wrong answer",
  TLE: "Time limit exceeded",
  MLE: "Memory limit exceeded",
  RTE: "Runtime error",
  CE: "Compilation error",
}

export const verdictBadgeClass: Record<Verdict, string> = {
  AC: "bg-green-600/10 text-green-700 hover:bg-green-600/15 dark:text-green-500 dark:hover:bg-green-500/15",
  WA: "bg-red-600/10 text-red-700 hover:bg-red-600/15 dark:text-red-500 dark:hover:bg-red-500/15",
  TLE: "bg-orange-600/10 text-orange-700 hover:bg-orange-600/15 dark:text-orange-500 dark:hover:bg-orange-500/15",
  MLE: "bg-purple-600/10 text-purple-700 hover:bg-purple-600/15 dark:text-purple-500 dark:hover:bg-purple-500/15",
  RTE: "bg-blue-600/10 text-blue-700 hover:bg-blue-600/15 dark:text-blue-500 dark:hover:bg-blue-500/15",
  CE: "bg-zinc-600/10 text-zinc-700 hover:bg-zinc-600/15 dark:text-zinc-500 dark:hover:bg-zinc-500/15",
}