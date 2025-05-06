import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'


// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const cookieStore = cookies()
  const hasCookie = cookieStore.has('AuthUser')
  const AgentCookie = cookieStore.has('AgentToken')
  const cookie = cookieStore.get('AuthUser')
  const AgentCookiecheck = cookieStore.has('AgentToken')
  if (cookie) {
    return NextResponse.next()
  }
  else if (AgentCookiecheck) {
    return NextResponse.next()
  }
  else {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

// See "Matching Paths" below to learn more


export const config = { matcher: ['/Admin/:path*', '/Agent/:path*'], }
