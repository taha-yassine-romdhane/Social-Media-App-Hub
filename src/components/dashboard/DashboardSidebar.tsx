'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileEdit,
  Calendar,
  BarChart2,
  Settings,
  Users,
  MessageSquare,
} from 'lucide-react'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Posts',
    href: '/dashboard/posts',
    icon: FileEdit,
  },
  {
    title: 'Schedule',
    href: '/dashboard/schedule',
    icon: Calendar,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart2,
  },
  {
    title: 'Accounts',
    href: '/dashboard/accounts',
    icon: Users,
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-gray-900">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Logo */}
        <div className="flex items-center h-16 px-4 bg-gray-900">
          <Link 
            href="/dashboard"
            className="flex items-center space-x-2"
          >
            <span className="text-xl font-bold text-white">
              Social Hub
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
