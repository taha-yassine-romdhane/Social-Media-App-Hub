'use client'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import {
  User,
  Bell,
  Shield,
  CreditCard,
  LogOut,
  Mail,
  Globe,
  Palette,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface SettingsSection {
  id: string
  name: string
  icon: any
  description: string
}

const settingsSections: SettingsSection[] = [
  {
    id: 'profile',
    name: 'Profile Settings',
    icon: User,
    description: 'Manage your account details and personal information',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell,
    description: 'Configure how you want to receive notifications',
  },
  {
    id: 'security',
    name: 'Security',
    icon: Shield,
    description: 'Protect your account with security features',
  },
  {
    id: 'billing',
    name: 'Billing & Plans',
    icon: CreditCard,
    description: 'Manage your subscription and billing information',
  },
  {
    id: 'email',
    name: 'Email Settings',
    icon: Mail,
    description: 'Configure your email preferences and templates',
  },
  {
    id: 'appearance',
    name: 'Appearance',
    icon: Palette,
    description: 'Customize the look and feel of your dashboard',
  },
  {
    id: 'language',
    name: 'Language & Region',
    icon: Globe,
    description: 'Set your preferred language and regional settings',
  },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    try {
      setLoading(true)
      await supabase.auth.signOut()
      window.location.href = '/auth/login'
    } catch (error) {
      toast.error('Error signing out')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your account settings and preferences
            </p>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="text-red-600 hover:text-red-700"
            disabled={loading}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          <div className="grid grid-cols-4 min-h-[600px]">
            {/* Settings Navigation */}
            <div className="col-span-1 border-r">
              <nav className="p-4 space-y-1">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span>{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Settings Content */}
            <div className="col-span-3 p-6">
              {activeSection === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your account profile information.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Write a short bio about yourself"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage your account security settings.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Button variant="outline" className="w-full justify-between">
                        <span>Change Password</span>
                        <Shield className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <Button variant="outline" className="w-full justify-between">
                        <span>Two-Factor Authentication</span>
                        <Shield className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <Button variant="outline" className="w-full justify-between">
                        <span>Connected Devices</span>
                        <Shield className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add more section content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
