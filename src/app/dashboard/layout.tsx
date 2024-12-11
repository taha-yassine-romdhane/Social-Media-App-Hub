'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { 
  LayoutDashboard, 
  Share2, 
  FileText, 
  Calendar, 
  BarChart2, 
  MessageSquareMore,
  Settings 
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Social Accounts', href: '/dashboard/social-accounts', icon: Share2 },
  { name: 'Content', href: '/dashboard/content', icon: FileText },
  { name: 'Planner', href: '/dashboard/planner', icon: Calendar },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Advertising', href: '/dashboard/advertising', icon: MessageSquareMore },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-40">
        <div className="flex h-full items-center justify-between px-4">
          <Link href="/dashboard" className="text-xl font-semibold">
            Social Hub
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] border-r bg-white">
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="pl-64 pt-16">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}