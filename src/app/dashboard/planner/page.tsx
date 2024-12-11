'use client'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { 
  Plus,
  Facebook,
  Instagram,
  Image as ImageIcon,
  Video,
  Filter,
  MoreVertical,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

interface ScheduledPost {
  id: string
  content: string
  mediaUrls: string[]
  scheduledFor: string
  platform: 'facebook' | 'instagram'
  status: 'draft' | 'scheduled' | 'published'
  visibility: 'public' | 'private' | 'friends'
  page: {
    id: string
    name: string
    platform: 'facebook' | 'instagram'
    avatar: string
  }
}

interface ConnectedPage {
  id: string
  name: string
  platform: 'facebook' | 'instagram'
  avatar: string
}

export default function PlannerPage() {
  const [posts, setPosts] = useState<ScheduledPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null)
  const [connectedPages, setConnectedPages] = useState<ConnectedPage[]>([])
  const [selectedPages, setSelectedPages] = useState<string[]>([])

  // Mock data for demonstration
  useEffect(() => {
    const mockPages: ConnectedPage[] = [
      {
        id: '1',
        name: 'My Fashion Store',
        platform: 'facebook',
        avatar: 'https://ui-avatars.com/api/?name=Fashion+Store&background=5865F2&color=fff',
      },
      {
        id: '2',
        name: 'Summer Collection',
        platform: 'instagram',
        avatar: 'https://ui-avatars.com/api/?name=Summer+Collection&background=E4405F&color=fff',
      },
    ]

    const mockPosts: ScheduledPost[] = [
      {
        id: '1',
        content: '🌟 New Summer Collection Drop! Check out our latest designs perfect for the season. #SummerFashion #NewArrivals',
        mediaUrls: ['https://picsum.photos/400/400'],
        scheduledFor: '2024-12-11T14:00:00Z',
        platform: 'instagram',
        status: 'scheduled',
        visibility: 'public',
        page: mockPages[1],
      },
      {
        id: '2',
        content: 'Winter Sale starts tomorrow! Get up to 50% off on selected items. Don\'t miss out! 🛍️',
        mediaUrls: ['https://picsum.photos/400/401'],
        scheduledFor: '2024-12-12T10:00:00Z',
        platform: 'facebook',
        status: 'draft',
        visibility: 'public',
        page: mockPages[0],
      },
      // Add more mock posts throughout the month
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 3}`,
        content: `Sample post ${i + 3}`,
        mediaUrls: [`https://picsum.photos/400/${402 + i}`],
        scheduledFor: new Date(2024, 11, Math.floor(Math.random() * 31) + 1).toISOString(),
        platform: Math.random() > 0.5 ? 'facebook' : 'instagram' as const,
        status: Math.random() > 0.5 ? 'scheduled' : 'draft' as const,
        visibility: 'public',
        page: mockPages[Math.floor(Math.random() * mockPages.length)],
      })),
    ]

    setConnectedPages(mockPages)
    setPosts(mockPosts)
    setLoading(false)
  }, [])

  const getPlatformIcon = (platform: 'facebook' | 'instagram') => {
    return platform === 'facebook' ? (
      <Facebook className="w-4 h-4 text-blue-600" />
    ) : (
      <Instagram className="w-4 h-4 text-pink-600" />
    )
  }

  const getStatusColor = (status: ScheduledPost['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700'
      case 'scheduled':
        return 'bg-blue-100 text-blue-700'
      case 'published':
        return 'bg-green-100 text-green-700'
    }
  }

  const calendarEvents = posts.map(post => ({
    id: post.id,
    title: post.content,
    start: post.scheduledFor,
    backgroundColor: post.platform === 'facebook' ? 'rgba(24, 119, 242, 0.85)' : 'rgba(228, 64, 95, 0.85)',
    borderColor: post.platform === 'facebook' ? '#1877F2' : '#E4405F',
    extendedProps: post,
  }))

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar */}
      <div className="w-80 border-r bg-gray-50/50 p-6 flex flex-col overflow-y-auto">
        <Button
          className="w-full mb-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Post
        </Button>

        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Connected Pages</h3>
          <div className="space-y-2">
            {connectedPages.map((page) => (
              <label
                key={page.id}
                className="flex items-center p-3 rounded-xl hover:bg-white/80 cursor-pointer transition-colors duration-200 border border-transparent hover:border-gray-200"
              >
                <input
                  type="checkbox"
                  checked={selectedPages.includes(page.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPages([...selectedPages, page.id])
                    } else {
                      setSelectedPages(selectedPages.filter(id => id !== page.id))
                    }
                  }}
                  className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <img src={page.avatar} alt={page.name} className="w-8 h-8 rounded-lg mr-3" />
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-medium text-gray-900">{page.name}</span>
                  <span className="text-xs text-gray-500 flex items-center mt-0.5">
                    {getPlatformIcon(page.platform)}
                    <span className="ml-1">{page.platform}</span>
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {selectedPost && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border p-5">
            <div className="flex items-start space-x-3 mb-4">
              <img
                src={selectedPost.page.avatar}
                alt={selectedPost.page.name}
                className="w-10 h-10 rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedPost.page.name}</h3>
                    <div className="flex items-center mt-1">
                      {getPlatformIcon(selectedPost.platform)}
                      <span className="text-xs text-gray-500 ml-1">
                        {new Date(selectedPost.scheduledFor).toLocaleString(undefined, {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(selectedPost.status)}`}>
                    {selectedPost.status.charAt(0).toUpperCase() + selectedPost.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            {selectedPost.mediaUrls.length > 0 && (
              <div className="relative mb-4 rounded-xl overflow-hidden">
                <img
                  src={selectedPost.mediaUrls[0]}
                  alt="Post preview"
                  className="w-full h-40 object-cover"
                />
                {selectedPost.mediaUrls.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    +{selectedPost.mediaUrls.length - 1} more
                  </div>
                )}
              </div>
            )}
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{selectedPost.content}</p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex-1 font-medium">
                Edit Post
              </Button>
              <Button variant="outline" size="sm" className="flex-1 font-medium">
                Duplicate
              </Button>
              <Button variant="ghost" size="icon" className="!h-8 !w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Calendar */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Content Calendar</h1>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="font-medium">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          ) : (
            <div className="h-full calendar-wrapper">
              <style jsx global>{`
                .calendar-wrapper .fc {
                  height: 100%;
                  font-family: inherit;
                }
                .calendar-wrapper .fc-theme-standard td {
                  border-color: #e5e7eb;
                }
                .calendar-wrapper .fc-theme-standard th {
                  border-color: #e5e7eb;
                  padding: 8px;
                  background: #f9fafb;
                }
                .calendar-wrapper .fc-day-today {
                  background: #f0f9ff !important;
                }
                .calendar-wrapper .fc-event {
                  border-radius: 6px;
                  padding: 0;
                  margin: 1px;
                  border: none;
                  min-height: 45px;
                  overflow: hidden;
                }
                .calendar-wrapper .fc-event-main {
                  padding: 0;
                }
                .calendar-wrapper .fc-daygrid-event-harness {
                  margin: 2px 4px;
                }
                .calendar-wrapper .fc-daygrid-day-events {
                  margin-top: 4px;
                }
                .calendar-wrapper .fc-toolbar-title {
                  font-size: 1.25rem;
                  font-weight: 600;
                }
                .calendar-wrapper .fc-button {
                  background: white;
                  border: 1px solid #e5e7eb;
                  color: #374151;
                  font-weight: 500;
                  text-transform: capitalize;
                  padding: 0.5rem 1rem;
                  border-radius: 0.375rem;
                }
                .calendar-wrapper .fc-button:hover {
                  background: #f9fafb;
                }
                .calendar-wrapper .fc-button-active {
                  background: #f3f4f6 !important;
                  border-color: #d1d5db !important;
                }
              `}</style>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                eventClick={(info) => {
                  setSelectedPost(info.event.extendedProps as ScheduledPost)
                }}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,dayGridWeek'
                }}
                height="100%"
                eventContent={(eventInfo) => {
                  const post = eventInfo.event.extendedProps as ScheduledPost
                  return (
                    <div className="h-full w-full bg-white/10 backdrop-blur-sm">
                      <div className="px-2 py-1.5">
                        <div className="flex items-center gap-1 mb-0.5">
                          {getPlatformIcon(post.platform)}
                          <img
                            src={post.page.avatar}
                            alt={post.page.name}
                            className="w-3.5 h-3.5 rounded"
                          />
                          <span className="text-[10px] text-gray-900 font-medium">
                            {new Date(post.scheduledFor).toLocaleTimeString(undefined, {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-900 font-medium leading-tight line-clamp-2">
                          {eventInfo.event.title}
                        </p>
                      </div>
                    </div>
                  )
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
