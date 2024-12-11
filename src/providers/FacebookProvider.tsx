'use client'

import Script from 'next/script'
import { createContext, useContext, useEffect, useState } from 'react'

interface FacebookContextType {
  isLoaded: boolean
  FB: typeof FB | null
}

export const FacebookContext = createContext<FacebookContextType>({
  isLoaded: false,
  FB: null,
})

export function useFacebook() {
  const context = useContext(FacebookContext)
  if (context === undefined) {
    throw new Error('useFacebook must be used within a FacebookProvider')
  }
  return context
}

export function FacebookProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [FB, setFB] = useState<typeof window.FB | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.FB) {
      setFB(window.FB)
      setIsLoaded(true)
    }
  }, [])

  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={() => {
          window.fbAsyncInit = function () {
            window.FB.init({
              appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
              cookie: true,
              xfbml: true,
              version: 'v18.0',
            })
            setFB(window.FB)
            setIsLoaded(true)
          }
        }}
      />
      <FacebookContext.Provider value={{ isLoaded, FB }}>
        {children}
      </FacebookContext.Provider>
    </>
  )
}
