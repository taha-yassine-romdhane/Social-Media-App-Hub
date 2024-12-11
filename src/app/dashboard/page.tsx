'use client'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import {
  BarChart2,
  Calendar,
  Image,
  MessageCircle,
  Plus,
  ThumbsUp,
  Users,
  TrendingUp,
  Bell,
  Clock,
  Activity,
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface Post {
  id: string
  title: string
  platform: string
  scheduled_time: string
  status: string
}

interface Analytics {
  likes_count: number
  comments_count: number
  shares_count: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    scheduledPosts: 0,
    socialAccounts: 0,
    totalEngagement: 0,
    weeklyGrowth: 0,
  })
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/auth/login'
      }
    }
    checkAuth()
  }, [])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        // Fetch basic stats
        const { data: posts } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })
        
        const { data: accounts } = await supabase
          .from('social_accounts')
          .select()
        
        const { data: analytics } = await supabase
          .from('post_analytics')
          .select('likes_count, comments_count, shares_count')

        // Calculate total engagement
        const totalEngagement = analytics?.reduce(
          (sum, item: Analytics) =>
            sum + (item.likes_count + item.comments_count + item.shares_count),
          0
        ) || 0

        // Calculate weekly growth (mock data for now)
        const weeklyGrowth = Math.floor(Math.random() * 15) + 5 // 5-20% growth

        setStats({
          totalPosts: posts?.length || 0,
          scheduledPosts: posts?.filter((post) => post.status === 'SCHEDULED').length || 0,
          socialAccounts: accounts?.length || 0,
          totalEngagement,
          weeklyGrowth,
        })

        // Set recent posts
        setRecentPosts(posts?.slice(0, 5) || [])
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    // Refresh data every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PUBLISHED':
        return 'text-green-600 bg-green-50'
      case 'SCHEDULED':
        return 'text-blue-600 bg-blue-50'
      case 'DRAFT':
        return 'text-gray-600 bg-gray-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome Back!</h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening across your social media accounts
            </p>
          </div>
          <Button 
            onClick={() => window.location.href = '/dashboard/content/new'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalPosts}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Activity className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">{stats.weeklyGrowth}% growth</span>
            <span className="text-gray-500 ml-1">this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.scheduledPosts}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Clock className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-gray-500">Next post in 2 hours</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Connected Accounts</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.socialAccounts}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Plus className="w-4 h-4 text-purple-500 mr-1" />
            <span className="text-purple-500">Connect more accounts</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-pink-50 rounded-lg">
              <ThumbsUp className="w-6 h-6 text-pink-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Engagement</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalEngagement.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">12% increase</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* Recent Posts & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Posts */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h2>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Image className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(post.scheduled_time).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      post.status
                    )}`}
                  >
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-4"
                onClick={() => window.location.href = '/dashboard/content/new'}
              >
                <Image className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Create Post</div>
                  <div className="text-sm text-gray-500">Share across platforms</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start h-auto py-4"
                onClick={() => window.location.href = '/dashboard/planner'}
              >
                <Calendar className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Schedule Content</div>
                  <div className="text-sm text-gray-500">Plan your calendar</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start h-auto py-4"
                onClick={() => window.location.href = '/dashboard/streams'}
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">View Streams</div>
                  <div className="text-sm text-gray-500">Monitor activity</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start h-auto py-4"
                onClick={() => window.location.href = '/dashboard/advertising'}
              >
                <TrendingUp className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Boost Posts</div>
                  <div className="text-sm text-gray-500">Increase reach</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
