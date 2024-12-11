'use client'

import { createContext, useContext, useState } from 'react'

interface InstagramContextType {
  connect: () => Promise<void>
  isConnecting: boolean
}

export const InstagramContext = createContext<InstagramContextType>({
  connect: async () => {},
  isConnecting: false,
})

export function InstagramProvider({ children }: { children: React.ReactNode }) {
  const [isConnecting, setIsConnecting] = useState(false)

  const connect = async () => {
    setIsConnecting(true)
    try {
      const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID
      const redirectUri = `${window.location.origin}/dashboard/accounts/instagram/callback`
      const scope = 'user_profile,user_media'
      
      // Construct Instagram authorization URL
      const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`
      
      // Redirect to Instagram auth
      window.location.href = authUrl
    } catch (error) {
      console.error('Error connecting to Instagram:', error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <InstagramContext.Provider value={{ connect, isConnecting }}>
      {children}
    </InstagramContext.Provider>
  )
}

export function useInstagram() {
  const context = useContext(InstagramContext)
  if (context === undefined) {
    throw new Error('useInstagram must be used within an InstagramProvider')
  }
  return context
}
