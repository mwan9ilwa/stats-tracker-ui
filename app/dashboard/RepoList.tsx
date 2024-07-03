import { Repository } from '../lib/types'

export function RepoList({ repos }: { repos: Repository[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Repositories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(repos) && repos.map((repo) => (
          <div key={repo.id} className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
            <p className="text-gray-600 mb-4">{repo.description}</p>
            <div className="flex justify-between text-sm">
              <span>{repo.language}</span>
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}