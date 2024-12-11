import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) {
    return NextResponse.redirect('/dashboard/accounts?error=no_code')
  }

  try {
    // Get the current user's session
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.redirect('/dashboard/accounts?error=not_authenticated')
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://open-api.tiktok.com/oauth/access_token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_key: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY!,
        client_secret: process.env.TIKTOK_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/accounts/tiktok/callback`,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.data?.access_token) {
      throw new Error('Failed to get access token')
    }

    // Get user info
    const userResponse = await fetch('https://open-api.tiktok.com/user/info/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenData.data.access_token}`,
      },
    })

    const userData = await userResponse.json()

    if (!userData.data?.user) {
      throw new Error('Failed to get user info')
    }

    // Store the TikTok account in Supabase
    const { error } = await supabase.from('social_accounts').upsert({
      user_id: session.user.id,
      platform: 'tiktok',
      account_name: userData.data.user.display_name,
      account_id: userData.data.user.open_id,
      access_token: tokenData.data.access_token,
      metadata: {
        avatar_url: userData.data.user.avatar_url,
        follower_count: userData.data.user.follower_count,
        following_count: userData.data.user.following_count,
        refresh_token: tokenData.data.refresh_token,
        refresh_expires_in: tokenData.data.refresh_expires_in,
      },
    })

    if (error) {
      console.error('Error storing TikTok account:', error)
      return NextResponse.redirect('/dashboard/accounts?error=storage_failed')
    }

    return NextResponse.redirect('/dashboard/accounts?success=true')
  } catch (error) {
    console.error('Error in TikTok callback:', error)
    return NextResponse.redirect('/dashboard/accounts?error=unknown')
  }
}
