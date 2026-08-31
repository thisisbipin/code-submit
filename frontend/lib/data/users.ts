import type { User } from "@/types"

export const users: User[] = [
  {
    username: "tourist",
    rating: 3400,
    rank: "Legendary Grandmaster",
    solvedProblemIds: ["4A", "71A", "231A", "50A", "158A", "580A", "118A", "1B", "466A", "520B"],
    avatarUrl: "https://github.com/identicons/tourist.png",
  },
  {
    username: "Petr",
    rating: 3200,
    rank: "International Grandmaster",
    solvedProblemIds: ["4A", "71A", "231A", "50A", "158A", "580A", "118A", "1B"],
    avatarUrl: "https://github.com/identicons/Petr.png",
  },
  {
    username: "alice",
    rating: 2100,
    rank: "Candidate Master",
    solvedProblemIds: ["4A", "71A", "231A", "50A", "118A", "1B", "466A"],
    avatarUrl: "https://github.com/identicons/alice.png",
  },
  {
    username: "bob",
    rating: 1350,
    rank: "Pupil",
    solvedProblemIds: ["4A", "71A", "231A"],
    avatarUrl: "https://github.com/identicons/bob.png",
  },
]

export function getUserByUsername(username: string): User | undefined {
  const normalized = username.toLowerCase()
  return users.find((u) => u.username.toLowerCase() === normalized)
}