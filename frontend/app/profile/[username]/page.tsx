import { ProtectedRoute } from "@/components/protected-route"
import { ProfileView } from "@/components/profile-view"
import { users } from "@/lib/data/users"

export function generateStaticParams(): { username: string }[] {
  return users.map((user) => ({ username: user.username }))
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  return (
    <ProtectedRoute>
      <ProfileView username={username} />
    </ProtectedRoute>
  )
}