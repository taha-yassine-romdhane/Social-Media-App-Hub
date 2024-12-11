import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

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
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID!,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/accounts/instagram/callback`,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      throw new Error('Failed to get access token')
    }

    // Get user profile
    const profileResponse = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${tokenData.access_token}`
    )

    const profileData = await profileResponse.json()

    // Store the Instagram account in Supabase
    const { error } = await supabase.from('social_accounts').upsert({
      user_id: session.user.id,
      platform: 'instagram',
      account_name: profileData.username,
      account_id: profileData.id,
      access_token: tokenData.access_token,
      metadata: {
        username: profileData.username,
      },
    })

    if (error) {
      console.error('Error storing Instagram account:', error)
      return NextResponse.redirect('/dashboard/accounts?error=storage_failed')
    }

    return NextResponse.redirect('/dashboard/accounts?success=true')
  } catch (error) {
    console.error('Error in Instagram callback:', error)
    return NextResponse.redirect('/dashboard/accounts?error=unknown')
  }
}
