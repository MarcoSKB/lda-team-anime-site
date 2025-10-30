import { type Session } from 'next-auth'

import { Roles } from '@/types/account.types'

import { API_BASE } from './global-vars'

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const requireAuth = (session: Session | null, roles?: Roles[]) => {
  if (!session || session.user === undefined) {
    return false
  }

  if (roles && roles.length > 0) {
    return roles.some((role) => session.user.roles.includes(role))
  }

  return true
}
// eslint-disable-next-line
type globalType = any
const globalRefreshes =
  (global as globalType)._refreshes ||
  ((global as globalType)._refreshes = new Map())

export const performRefresh = async (token: { refreshToken: string }) => {
  const key = token.refreshToken
  if (globalRefreshes.has(key)) return globalRefreshes.get(key)

  const promise = fetch(`${API_BASE}/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: key }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text()
        throw new Error(`Failed to refresh token: ${res.status} ${text}`)
      }
      return res.json()
    })
    .finally(() => {
      globalRefreshes.delete(key)
    })

  globalRefreshes.set(key, promise)
  return promise
}
