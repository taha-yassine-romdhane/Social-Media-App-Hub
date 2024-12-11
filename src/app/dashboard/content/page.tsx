'use client'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { 
  MessageCircle, 
  Search, 
  Filter, 
  MoreVertical, 
  Star, 
  Inbox, 
  Send, 
  Archive, 
  Trash2,
  Facebook,
  Instagram,
  ChevronDown
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface Message {
  id: string
  platform: 'facebook' | 'instagram'
  sender: string
  content: string
  timestamp: string
  read: boolean
  starred: boolean
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

export default function ContentPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFolder, setSelectedFolder] = useState('inbox')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [selectedPages, setSelectedPages] = useState<string[]>([])
  const [connectedPages, setConnectedPages] = useState<ConnectedPage[]>([])
  const [filterPlatform, setFilterPlatform] = useState<'all' | 'facebook' | 'instagram'>('all')

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
      {
        id: '3',
        name: 'Winter Deals',
        platform: 'facebook',
        avatar: 'https://ui-avatars.com/api/?name=Winter+Deals&background=5865F2&color=fff',
      },
    ]

    const mockMessages: Message[] = [
      {
        id: '1',
        platform: 'facebook',
        sender: 'John Doe',
        content: 'Hey, I love your products! When will you restock the summer collection?',
        timestamp: '2024-12-11T01:30:00Z',
        read: false,
        starred: true,
        page: mockPages[0],
      },
      {
        id: '2',
        platform: 'instagram',
        sender: 'jane_smith',
        content: 'Is this item still available? Love the design! 😍',
        timestamp: '2024-12-10T23:15:00Z',
        read: true,
        starred: false,
        page: mockPages[1],
      },
      {
        id: '3',
        platform: 'facebook',
        sender: 'Mike Johnson',
        content: 'What are your holiday hours?',
        timestamp: '2024-12-10T22:45:00Z',
        read: true,
        starred: false,
        page: mockPages[2],
      },
    ]

    setConnectedPages(mockPages)
    setMessages(mockMessages)
    setLoading(false)
  }, [])

  const folders = [
    { id: 'inbox', name: 'Inbox', icon: Inbox },
    { id: 'starred', name: 'Starred', icon: Star },
    { id: 'sent', name: 'Sent', icon: Send },
    { id: 'archived', name: 'Archived', icon: Archive },
    { id: 'trash', name: 'Trash', icon: Trash2 },
  ]

  const filteredMessages = messages.filter(message => {
    if (filterPlatform !== 'all' && message.platform !== filterPlatform) return false
    if (selectedPages.length > 0 && !selectedPages.includes(message.page.id)) return false
    if (selectedFolder === 'starred' && !message.starred) return false
    return true
  })

  const getPlatformIcon = (platform: 'facebook' | 'instagram') => {
    return platform === 'facebook' ? (
      <Facebook className="w-4 h-4 text-blue-600" />
    ) : (
      <Instagram className="w-4 h-4 text-pink-600" />
    )
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-72 border-r bg-gray-50 flex flex-col">
        <div className="p-4">
          <Button className="w-full">
            Compose
            <MessageCircle className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <nav className="mt-4">
          {folders.map((folder) => {
            const Icon = folder.icon
            return (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  selectedFolder === folder.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 mr-3" />
                {folder.name}
              </button>
            )
          })}
        </nav>

        <div className="mt-8 px-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Connected Pages</h3>
          <div className="space-y-2">
            {connectedPages.map((page) => (
              <label
                key={page.id}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
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
                  className="mr-3"
                />
                <img src={page.avatar} alt={page.name} className="w-6 h-6 rounded-full mr-2" />
                <span className="text-sm text-gray-700 flex-1">{page.name}</span>
                {getPlatformIcon(page.platform)}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            </div>
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value as 'all' | 'facebook' | 'instagram')}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Platforms</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </select>
            <Button variant="ghost" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          ) : (
            <div className="divide-y">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`flex items-start p-4 cursor-pointer ${
                    !message.read ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <img 
                    src={message.page.avatar} 
                    alt={message.page.name} 
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${!message.read ? 'text-black' : 'text-gray-900'}`}>
                        {message.sender}
                      </span>
                      {getPlatformIcon(message.platform)}
                      <span className="text-sm text-gray-500">• {message.page.name}</span>
                      {message.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 truncate">{message.content}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Detail */}
      {selectedMessage && (
        <div className="w-1/2 border-l bg-white">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <img 
                  src={selectedMessage.page.avatar} 
                  alt={selectedMessage.page.name} 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold flex items-center space-x-2">
                    <span>{selectedMessage.sender}</span>
                    {getPlatformIcon(selectedMessage.platform)}
                  </h2>
                  <p className="text-sm text-gray-500">via {selectedMessage.page.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Archive className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(selectedMessage.timestamp).toLocaleString()}
            </p>
            <p className="text-gray-800">{selectedMessage.content}</p>

            {/* Quick Reply Section */}
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center space-x-4">
                <textarea
                  placeholder="Type your reply..."
                  className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <Button variant="outline">Save as Template</Button>
                <Button>Send Reply</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
