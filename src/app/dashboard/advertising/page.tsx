'use client'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import {
  TrendingUp,
  Target,
  Users,
  DollarSign,
  BarChart3,
  Clock,
  Filter,
  Search,
  Plus,
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface BoostedPost {
  id: string
  content: string
  mediaUrls: string[]
  platform: 'facebook' | 'instagram'
  page: {
    id: string
    name: string
    platform: 'facebook' | 'instagram'
    avatar: string
  }
  boostStatus: 'active' | 'scheduled' | 'ended' | 'draft'
  budget: number
  spent: number
  reach: number
  clicks: number
  startDate: string
  endDate: string
  targetAudience: {
    age: string[]
    gender: string[]
    locations: string[]
    interests: string[]
  }
}

export default function AdvertisingPage() {
  const [posts, setPosts] = useState<BoostedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<BoostedPost | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'scheduled' | 'ended' | 'draft'>('all')

  useEffect(() => {
    // Mock data for demonstration
    const mockPosts: BoostedPost[] = [
      {
        id: '1',
        content: '🌟 Summer Collection Sale! Up to 50% off on selected items. Shop now and refresh your wardrobe! #SummerFashion',
        mediaUrls: ['https://picsum.photos/400/400'],
        platform: 'instagram',
        page: {
          id: '1',
          name: 'Fashion Store',
          platform: 'instagram',
          avatar: 'https://ui-avatars.com/api/?name=Fashion+Store&background=E4405F&color=fff',
        },
        boostStatus: 'active',
        budget: 500,
        spent: 250,
        reach: 15000,
        clicks: 450,
        startDate: '2024-12-10T00:00:00Z',
        endDate: '2024-12-17T00:00:00Z',
        targetAudience: {
          age: ['18-24', '25-34'],
          gender: ['female'],
          locations: ['Tunisia', 'Algeria', 'Morocco'],
          interests: ['Fashion', 'Shopping', 'Luxury'],
        },
      },
      {
        id: '2',
        content: '🎄 Holiday Special Offers! Get ready for the festive season with our exclusive collection.',
        mediaUrls: ['https://picsum.photos/400/401'],
        platform: 'facebook',
        page: {
          id: '2',
          name: 'Winter Collection',
          platform: 'facebook',
          avatar: 'https://ui-avatars.com/api/?name=Winter+Collection&background=1877F2&color=fff',
        },
        boostStatus: 'scheduled',
        budget: 1000,
        spent: 0,
        reach: 0,
        clicks: 0,
        startDate: '2024-12-15T00:00:00Z',
        endDate: '2024-12-31T00:00:00Z',
        targetAudience: {
          age: ['18-24', '25-34', '35-44'],
          gender: ['all'],
          locations: ['Tunisia'],
          interests: ['Fashion', 'Shopping', 'Gifts'],
        },
      },
    ]

    setPosts(mockPosts)
    setLoading(false)
  }, [])

  const getStatusColor = (status: BoostedPost['boostStatus']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'scheduled':
        return 'bg-blue-100 text-blue-700'
      case 'ended':
        return 'bg-gray-100 text-gray-700'
      case 'draft':
        return 'bg-yellow-100 text-yellow-700'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Advertising</h1>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 mt-4">
          {(['all', 'active', 'scheduled', 'ended', 'draft'] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4 p-6">
        {[
          { icon: DollarSign, label: 'Total Spent', value: '$2,500' },
          { icon: Users, label: 'Total Reach', value: '45.2K' },
          { icon: Target, label: 'Click Rate', value: '3.2%' },
          { icon: BarChart3, label: 'Active Campaigns', value: '5' },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border p-4 flex items-center space-x-4"
          >
            <div className="p-3 rounded-lg bg-blue-50">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns List */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="space-y-4">
          {posts
            .filter((post) => filter === 'all' || post.boostStatus === filter)
            .map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  {/* Post Preview */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={post.page.avatar}
                        alt={post.page.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{post.page.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{post.platform}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          post.boostStatus
                        )}`}
                      >
                        {post.boostStatus}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">{post.content}</p>

                    {post.mediaUrls.length > 0 && (
                      <img
                        src={post.mediaUrls[0]}
                        alt="Post media"
                        className="rounded-lg w-full max-w-md mb-3"
                      />
                    )}

                    {/* Campaign Stats */}
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Budget</p>
                        <p className="font-medium text-gray-900">{formatCurrency(post.budget)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Spent</p>
                        <p className="font-medium text-gray-900">{formatCurrency(post.spent)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Reach</p>
                        <p className="font-medium text-gray-900">{post.reach.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Clicks</p>
                        <p className="font-medium text-gray-900">{post.clicks.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Campaign Duration */}
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(post.startDate).toLocaleDateString()} -{' '}
                      {new Date(post.endDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                      Stop
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
