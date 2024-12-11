'use client'

import { createContext, useContext, useState } from 'react'

interface TikTokContextType {
  connect: () => Promise<void>
  isConnecting: boolean
}

export const TikTokContext = createContext<TikTokContextType>({
  connect: async () => {},
  isConnecting: false,
})

export function TikTokProvider({ children }: { children: React.ReactNode }) {
  const [isConnecting, setIsConnecting] = useState(false)

  const connect = async () => {
    setIsConnecting(true)
    try {
      const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY
      const redirectUri = `${window.location.origin}/dashboard/accounts/tiktok/callback`
      const scope = 'user.info.basic,video.list,video.upload'
      const csrfState = Math.random().toString(36).substring(7)
      
      // Store CSRF state in localStorage for validation in callback
      localStorage.setItem('tiktok_csrf_state', csrfState)
      
      // Construct TikTok authorization URL
      const authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${clientKey}&scope=${scope}&response_type=code&redirect_uri=${redirectUri}&state=${csrfState}`
      
      // Redirect to TikTok auth
      window.location.href = authUrl
    } catch (error) {
      console.error('Error connecting to TikTok:', error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <TikTokContext.Provider value={{ connect, isConnecting }}>
      {children}
    </TikTokContext.Provider>
  )
}

export function useTikTok() {
  const context = useContext(TikTokContext)
  if (context === undefined) {
    throw new Error('useTikTok must be used within a TikTokProvider')
  }
  return context
}
