'use client'

import { useEffect, useState } from 'react'
import { UserProfile, Repository } from '../lib/types'
import { ProfileCard } from './ProfileCard'
import { RepoList } from './RepoList'

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [repos, setRepos] = useState<Repository[]>([])

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    console.log("URL Token:", token);  // Log the token from URL to verify it's being passed

    if (token) {
      localStorage.setItem('github_token', token);
      console.log("Token stored:", localStorage.getItem('github_token'));  // Verify token storage
    } else {
      console.log("No token in URL");
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('github_token')
      console.log("Token:", token);  // Log the token to verify it's being retrieved
      if (!token) return

      try {
        const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const profileData = await profileRes.json()
        console.log("Profile Data:", profileData);  // Log the profile data
        setProfile(profileData)

        const reposRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/repo/list`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const reposData = await reposRes.json()
        console.log("Repositories Data:", reposData);  // Log the repositories data
        if (Array.isArray(reposData)) {
          setRepos(reposData);
        } else {
          console.error('Expected an array of repositories, received:', reposData);
          setRepos([]);  // Set to empty array if not the expected format
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setRepos([]);  // Set to empty array on error
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    console.log("Profile State:", profile);
    console.log("Repositories State:", repos);
  }, [profile, repos]);

  if (!profile) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <ProfileCard profile={profile} />
      <RepoList repos={repos} />
    </div>
  )
}