/** Tailwind text classes for a Codeforces-style rank color derived from
 * rating. Mirrors the general rating→title tiers used on Codeforces. */
export function rankColorClass(rating: number): string {
  if (rating >= 3000) return "text-red-500 dark:text-red-400"
  if (rating >= 2400) return "text-red-600 dark:text-red-500"
  if (rating >= 2200) return "text-orange-600 dark:text-orange-400"
  if (rating >= 1900) return "text-purple-600 dark:text-purple-400"
  if (rating >= 1600) return "text-blue-600 dark:text-blue-400"
  if (rating >= 1400) return "text-cyan-600 dark:text-cyan-400"
  if (rating >= 1200) return "text-green-600 dark:text-green-500"
  return "text-zinc-500 dark:text-zinc-400"
}