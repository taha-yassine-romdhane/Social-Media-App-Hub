import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, content, status } = body

    // For now, we'll just return a mock response
    // Later, we'll integrate with your database
    return NextResponse.json({
      id: Date.now().toString(),
      title,
      content,
      status,
      userId,
      createdAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('[POSTS_POST]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
