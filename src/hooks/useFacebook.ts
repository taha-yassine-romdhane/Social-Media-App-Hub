'use client'

import { useCallback } from 'react'
import { useFacebook as useFacebookContext } from '@/providers/FacebookProvider'

export function useFacebook() {
  const { FB, isLoaded } = useFacebookContext()

  const login = useCallback(async () => {
    if (!FB) return null

    try {
      const response = await new Promise<FB.StatusResponse>((resolve) => {
        FB.login(resolve, {
          scope: 'pages_manage_posts,pages_read_engagement,pages_show_list',
        })
      })

      if (response.status === 'connected') {
        return response.authResponse
      }
      return null
    } catch (error) {
      console.error('Facebook login error:', error)
      return null
    }
  }, [FB])

  const getLoginStatus = useCallback(async () => {
    if (!FB) return null

    try {
      const response = await new Promise<FB.StatusResponse>((resolve) => {
        FB.getLoginStatus(resolve)
      })

      if (response.status === 'connected') {
        return response.authResponse
      }
      return null
    } catch (error) {
      console.error('Facebook status error:', error)
      return null
    }
  }, [FB])

  const logout = useCallback(async () => {
    if (!FB) return

    try {
      await new Promise<void>((resolve) => {
        FB.logout(() => resolve())
      })
    } catch (error) {
      console.error('Facebook logout error:', error)
    }
  }, [FB])

  return {
    isLoaded,
    login,
    logout,
    getLoginStatus,
  }
}
