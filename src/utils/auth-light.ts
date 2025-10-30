// app/utils/auth-light.ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { CredentialsSignin } from '@auth/core/errors'

import { signInSchema } from '@/schemas/auth.schema'

import { API_BASE } from './global-vars'
import { formatSlug } from './query'
import { performRefresh } from './system'

class AuthError extends CredentialsSignin {
  code: string
  constructor(message: string) {
    super(message)
    this.code = formatSlug(message)
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: 'login',
      name: 'Login',
      authorize: async (credentials) => {
        try {
          await signInSchema.validate(credentials)

          const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          })

          if (!res.ok) {
            if (res.status === 400 || res.status === 404) {
              throw new Error('Неверный логин или пароль')
            }
            throw new Error('Произошла ошибка во время авторизации')
          }

          const {
            nickname,
            email,
            roles,
            refreshToken,
            avatarUrl,
            token: accessToken,
            expires: expAt,
          } = await res.json()

          return {
            username: nickname,
            email,
            roles,
            accessToken,
            refreshToken,
            avatar: avatarUrl ?? '/images/avatar-blank.jpg',
            expAt,
          }
        } catch (err) {
          if (err instanceof Error) throw new AuthError(err.message)
          throw new AuthError('Ошибка при авторизации')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.roles = user.roles
        token.username = user.username
        token.avatar = user.avatar
        token.expAt = new Date(user.expAt).getTime()
        token.lastRefresh = 0
      }

      if (trigger === 'update') {
        try {
          const res = await fetch(`${API_BASE}/user/me`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token.accessToken}` },
          })
          if (res.ok) {
            const data = await res.json()
            token.avatar = data.avatar?.url ?? '/images/avatar-blank.jpg'
            token.username = data.nickname
          }
        } catch {}
      }

      if (Date.now() < token.expAt - 30_000) return token

      if (token.lastRefresh && Date.now() - token.lastRefresh < 2000) {
        return token
      }

      try {
        const data = await performRefresh(token)
        return {
          ...token,
          accessToken: data.token,
          refreshToken: data.refreshToken,
          expAt: new Date(data.expires).getTime(),
          lastRefresh: Date.now(),
        }
      } catch {
        return { ...token, error: 'RefreshTokenError' }
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.expAt = token.expAt
      session.user.roles = token.roles
      session.user.username = token.username
      session.user.avatar = token.avatar
      session.error = token.error
      return session
    },
  },
  pages: {
    signIn: '/signin',
  },
})
