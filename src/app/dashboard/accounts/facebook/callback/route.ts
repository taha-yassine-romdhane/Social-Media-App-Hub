import { supabase } from '@/lib/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
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
    const supabase = createServerComponentClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.redirect('/dashboard/accounts?error=not_authenticated')
    }

    // Exchange code for access token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?` +
      `client_id=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}` +
      `&client_secret=${process.env.FACEBOOK_APP_SECRET}` +
      `&code=${code}` +
      `&redirect_uri=${process.env.NEXT_PUBLIC_URL}/dashboard/accounts/facebook/callback`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    )

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      throw new Error('Failed to get access token')
    }

    // Get Facebook Pages that the user manages
    const pagesResponse = await fetch(
      `https://graph.facebook.com/v18.0/me/accounts?access_token=${tokenData.access_token}`,
      {
        cache: 'no-store',
      }
    )

    const pagesData = await pagesResponse.json()

    if (!pagesData.data || pagesData.data.length === 0) {
      return NextResponse.redirect('/dashboard/accounts?error=no_pages')
    }

    // Store the pages in Supabase under the current user
    for (const page of pagesData.data) {
      const { error } = await supabase.from('social_accounts').upsert({
        user_id: session.user.id,  // Store under current user's ID
        platform: 'facebook',
        account_name: page.name,
        account_id: page.id,
        access_token: page.access_token,
        metadata: {
          category: page.category,
          tasks: page.tasks,
        },
      })

      if (error) {
        console.error('Error storing page:', error)
      }
    }

    return NextResponse.redirect('/dashboard/accounts?success=true')
  } catch (error) {
    console.error('Error in Facebook callback:', error)
    return NextResponse.redirect('/dashboard/accounts?error=unknown')
  }
}
