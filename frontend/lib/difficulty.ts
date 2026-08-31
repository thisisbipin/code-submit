import type { Difficulty } from "@/types"

/** Tailwind classes applied to a Badge for each difficulty level. */
export const difficultyBadgeClass: Record<Difficulty, string> = {
  easy: "bg-green-600/10 text-green-700 hover:bg-green-600/15 dark:text-green-500 dark:hover:bg-green-500/15",
  medium: "bg-amber-600/10 text-amber-700 hover:bg-amber-600/15 dark:text-amber-500 dark:hover:bg-amber-500/15",
  hard: "bg-red-600/10 text-red-700 hover:bg-red-600/15 dark:text-red-500 dark:hover:bg-red-500/15",
}

/** Capitalized label for a difficulty level ("Easy", "Medium", "Hard"). */
export function difficultyLabel(difficulty: Difficulty): string {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
}