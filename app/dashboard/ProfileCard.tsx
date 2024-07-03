import { UserProfile } from '../lib/types'

export function ProfileCard({ profile }: { profile: UserProfile }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <div className="flex items-center">
        <img src={profile.avatar_url} alt={profile.name} className="w-20 h-20 rounded-full mr-4" />
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-600">@{profile.login}</p>
        </div>
      </div>
      <p className="mt-4">{profile.bio}</p>
      <div className="mt-4 flex space-x-4">
        <div>
          <span className="font-bold">{profile.public_repos}</span> repositories
        </div>
        <div>
          <span className="font-bold">{profile.followers}</span> followers
        </div>
        <div>
          <span className="font-bold">{profile.following}</span> following
        </div>
      </div>
    </div>
  )
}