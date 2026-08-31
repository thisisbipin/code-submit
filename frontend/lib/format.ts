const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const

const pad = (n: number) => String(n).padStart(2, "0")

/** Format an ISO timestamp as "Aug/23/2026 12:20" (UTC, Codeforces-style). */
export function formatDateTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return `${MONTHS[date.getUTCMonth()]}/${pad(date.getUTCDate())}/${date.getUTCFullYear()} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`
}

/** Format a judge runtime in milliseconds; em dash when there is none. */
export function formatRuntime(ms: number): string {
  if (ms <= 0) return "—"
  return `${ms} ms`
}

/** Format a memory reading in KB (rendered as MB once it reaches 1 MiB). */
export function formatMemory(kb: number): string {
  if (kb <= 0) return "—"
  if (kb >= 1024) {
    const mb = kb / 1024
    return `${Number.isInteger(mb) ? mb : mb.toFixed(1)} MB`
  }
  return `${kb} KB`
}