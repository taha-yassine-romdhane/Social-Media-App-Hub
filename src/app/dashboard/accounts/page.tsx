'use client'

import { Button } from '@/components/ui/button'
import { useFacebook } from '@/hooks/useFacebook'
import { useInstagram } from '@/providers/InstagramProvider'
import { useTikTok } from '@/providers/TikTokProvider'
import { supabase } from '@/lib/supabase'
import { Facebook, Instagram, Loader2, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface SocialAccount {
  id: string
  platform: string
  account_name: string
  created_at: string
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState(false)
  const { login, isLoaded } = useFacebook()
  const { connect: connectInstagram, isConnecting: isConnectingInstagram } = useInstagram()
  const { connect: connectTikTok, isConnecting: isConnectingTikTok } = useTikTok()

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      setLoading(true);
  
      // Get the current user's session (you may replace this with your own authentication logic)
      const session = await getSession();  // Assume `getSession` is a function that gets the current user session
      if (!session) {
        throw new Error('Not authenticated');
      }
  
      // Fetch accounts from your API endpoint
      const response = await fetch(`/api/social_accounts?user_id=${session.user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include any authorization token if necessary
          'Authorization': `Bearer ${session.token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }
  
      const data = await response.json();
      setAccounts(data || []);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      toast.error('Failed to fetch connected accounts');
    } finally {
      setLoading(false);
    }
  };
  

  const handleFacebookConnect = async () => {
    if (!isLoaded) {
      toast.error('Facebook SDK is not loaded yet')
      return
    }

    setConnecting(true)
    try {
      const response = await new Promise((resolve) => {
        FB.login(resolve, {
          scope: 'public_profile,pages_show_list,pages_read_engagement,pages_manage_posts',
          return_scopes: true
        })
      })

      const authResponse = response.authResponse
      
      if (!authResponse) {
        toast.error('Facebook login failed')
        return
      }

      // Exchange the short-lived token for a long-lived token and get pages
      const apiResponse = await fetch('/api/facebook/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: authResponse.accessToken,
          userId: authResponse.userID,
        }),
      })

      if (!apiResponse.ok) {
        throw new Error('Failed to connect Facebook account')
      }

      toast.success('Successfully connected Facebook account')
      fetchAccounts()
    } catch (error) {
      console.error('Error connecting to Facebook:', error)
      toast.error('Failed to connect Facebook account')
    } finally {
      setConnecting(false)
    }
  }

  const handleDisconnect = async (accountId: string) => {
    try {
      const { error } = await supabase
        .from('social_accounts')
        .delete()
        .eq('id', accountId)

      if (error) throw error
      
      toast.success('Account disconnected successfully')
      fetchAccounts()
    } catch (error) {
      console.error('Error disconnecting account:', error)
      toast.error('Failed to disconnect account')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Connect Your Social Media Accounts
        </h1>
        <p className="text-gray-600">
          Connect your personal or business social media accounts to manage all your content in one place.
          Each account you connect will only be accessible to you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Facebook Connect Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Facebook className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Facebook</h3>
                <p className="text-sm text-gray-500">
                  Connect your Facebook pages
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleFacebookConnect}
            disabled={connecting || !isLoaded}
          >
            {connecting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              'Connect Facebook'
            )}
          </Button>
        </div>

        {/* Instagram Connect Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-pink-50 rounded-lg">
                <Instagram className="w-6 h-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Instagram</h3>
                <p className="text-sm text-gray-500">
                  Connect your Instagram account
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => connectInstagram()}
            disabled={isConnectingInstagram}
          >
            {isConnectingInstagram ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              'Connect Instagram'
            )}
          </Button>
        </div>

        {/* TikTok Connect Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-gray-50 rounded-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.946 6.174 6.174 0 0 1-1.803-4.241h-3.51v13.892c0 .114-.003.227-.008.339a3.08 3.08 0 0 1-.051.396 3.024 3.024 0 0 1-2.963 2.392 3.025 3.025 0 0 1-3.025-3.025 3.025 3.025 0 0 1 3.025-3.025c.337 0 .664.056.969.16v-3.568a6.569 6.569 0 0 0-.969-.072A6.57 6.57 0 0 0 3.025 14.2a6.57 6.57 0 0 0 6.571 6.57 6.57 6.57 0 0 0 6.57-6.57c0-.114-.003-.227-.008-.339V7.614a9.667 9.667 0 0 0 5.164 1.516V5.562h-2.001z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">TikTok</h3>
                <p className="text-sm text-gray-500">
                  Connect your TikTok account
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => connectTikTok()}
            disabled={isConnectingTikTok}
          >
            {isConnectingTikTok ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              'Connect TikTok'
            )}
          </Button>
        </div>

        {/* Connected Accounts */}
        {accounts.map((account) => (
          <div
            key={account.id}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 rounded-lg" style={{
                  backgroundColor: account.platform === 'facebook' 
                    ? 'rgb(239 246 255)' 
                    : account.platform === 'instagram'
                    ? 'rgb(253 242 248)'
                    : 'rgb(249 250 251)'
                }}>
                  {account.platform === 'facebook' ? (
                    <Facebook className="w-6 h-6 text-blue-600" />
                  ) : account.platform === 'instagram' ? (
                    <Instagram className="w-6 h-6 text-pink-600" />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.946 6.174 6.174 0 0 1-1.803-4.241h-3.51v13.892c0 .114-.003.227-.008.339a3.08 3.08 0 0 1-.051.396 3.024 3.024 0 0 1-2.963 2.392 3.025 3.025 0 0 1-3.025-3.025 3.025 3.025 0 0 1 3.025-3.025c.337 0 .664.056.969.16v-3.568a6.569 6.569 0 0 0-.969-.072A6.57 6.57 0 0 0 3.025 14.2a6.57 6.57 0 0 0 6.571 6.57 6.57 6.57 0 0 0 6.57-6.57c0-.114-.003-.227-.008-.339V7.614a9.667 9.667 0 0 0 5.164 1.516V5.562h-2.001z"
                      />
                    </svg>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">
                    {account.account_name}
                  </h3>
                  <p className="text-sm text-gray-500">{account.platform.charAt(0).toUpperCase() + account.platform.slice(1)} Account</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-red-600 hover:text-red-700"
                onClick={() => handleDisconnect(account.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
