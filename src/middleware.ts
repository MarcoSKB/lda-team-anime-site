import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { auth } from './utils/auth-light'
import { API_BASE } from './utils/global-vars'

const publicPaths = ['/signin', '/signup', '/banned', '/check-email', '/verify']

export const middleware = async (req: NextRequest) => {
  if (publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const session = await auth()
  if (!session?.user) return NextResponse.next()

  const res = await fetch(`${API_BASE}/user/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    const data = await res.json()
    if (data.error === 'access_denied') {
      const url = req.nextUrl.clone()
      url.pathname = '/banned'
      url.search = `?reason=${encodeURIComponent(data.message || 'Доступ закрыт')}`
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }
  const data = await res.json()

  if (!data.emailConfirmed) {
    const url = req.nextUrl.clone()
    url.pathname = '/check-email'
    url.search = '?error=notconfirmed'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
