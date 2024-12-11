import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { accessToken, userId } = await request.json()

    // Get the current user's session
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Exchange short-lived token for long-lived token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&fb_exchange_token=${accessToken}`,
      { cache: 'no-store' }
    )

    const tokenData = await tokenResponse.json()
    
    if (!tokenData.access_token) {
      throw new Error('Failed to exchange token')
    }

    // Get user's Facebook pages
    const pagesResponse = await fetch(
      `https://graph.facebook.com/v18.0/me/accounts?access_token=${tokenData.access_token}`,
      { cache: 'no-store' }
    )

    const pagesData = await pagesResponse.json()

    if (!pagesData.data || pagesData.data.length === 0) {
      return NextResponse.json(
        { error: 'No Facebook pages found' },
        { status: 404 }
      )
    }

    // Store pages in database
    const supabaseClient = createRouteHandlerClient({ cookies })
    
    for (const page of pagesData.data) {
      await supabaseClient.from('social_accounts').upsert({
        user_id: session.user.id,
        platform: 'facebook',
        account_name: page.name,
        account_id: page.id,
        access_token: page.access_token,
        metadata: {
          category: page.category,
          tasks: page.tasks,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error connecting Facebook:', error)
    return NextResponse.json(
      { error: 'Failed to connect Facebook account' },
      { status: 500 }
    )
  }
}
