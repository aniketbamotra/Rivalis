import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Sanity sends a webhook with { _type: "post" | "category" | "newsroomItem", slug?: { current: string } }
// Configure this URL in Sanity Studio → API → Webhooks

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  let body: { _type?: string; slug?: { current?: string } }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const { _type, slug } = body

  switch (_type) {
    case 'post':
      revalidateTag('post')
      if (slug?.current) {
        revalidateTag(`post:${slug.current}`)
        revalidatePath(`/intelligence-hub/perspectives/${slug.current}`)
      }
      revalidatePath('/intelligence-hub/perspectives')
      revalidatePath('/intelligence-hub')
      break

    case 'category':
      revalidateTag('category')
      revalidatePath('/intelligence-hub/perspectives')
      break

    case 'newsroomItem':
      revalidateTag('newsroomItem')
      if (slug?.current) {
        revalidateTag(`newsroomItem:${slug.current}`)
        revalidatePath(`/intelligence-hub/newsroom/${slug.current}`)
      }
      revalidatePath('/intelligence-hub/newsroom')
      revalidatePath('/intelligence-hub')
      break

    default:
      // Unknown type — revalidate everything intelligence-hub related
      revalidatePath('/intelligence-hub', 'layout')
  }

  return NextResponse.json({ revalidated: true, type: _type })
}
