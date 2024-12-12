'use client'

import { useState, useEffect } from 'react'
import { Bell, Settings, User, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function DashboardNavbar() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [avatarUrl, setAvatarUrl] = useState('/placeholder-avatar.jpg')
  const [notificationCount, setNotificationCount] = useState(0)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from('profiles').select('avatar_url').single()
      if (data) setAvatarUrl(data.avatar_url || '/placeholder-avatar.jpg')
    }
    const fetchNotifications = async () => {
      const { data } = await supabase.from('notifications').select('count').single()
      if (data) setNotificationCount(data.count || 0)
    }
    fetchProfile()
    fetchNotifications()
  }, [supabase])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Sign-out failed:', error)
    }
  }

  return (
    <div className="sticky top-0 z-40 flex h-12 w-full items-center justify-end border-b bg-white px-4 gap-3 md:h-16">
      <Button variant="ghost" size="sm" className="relative h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-medium text-white">
          5
        </span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-7 w-7 rounded-full">
            <Avatar className="h-7 w-7">
              <AvatarImage src={avatarUrl} alt="User avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
