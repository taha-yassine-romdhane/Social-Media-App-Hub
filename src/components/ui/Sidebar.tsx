'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  PenSquare,
  CalendarDays,
  BarChart3,
  Megaphone,
  Settings,
  Menu,
  Share2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Social Accounts',
    href: '/dashboard/accounts',
    icon: Share2,
  },
  {
    title: 'Content',
    href: '/dashboard/content',
    icon: PenSquare,
  },
  {
    title: 'Planner',
    href: '/dashboard/planner',
    icon: CalendarDays,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Advertising',
    href: '/dashboard/advertising',
    icon: Megaphone,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-56 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-12 items-center border-b px-4">
        <Menu className="mr-2 h-5 w-5 text-blue-600" />
        <span className="text-sm font-semibold text-blue-600">Social Hub</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 p-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
