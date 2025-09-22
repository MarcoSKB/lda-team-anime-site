import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Discord from 'next-auth/providers/discord'
import Google from 'next-auth/providers/google'

import { CredentialsSignin } from '@auth/core/errors'

import { registerSchema, signInSchema } from '@/schemas/auth.schema'

import { formatSlug } from './query'

class AuthError extends CredentialsSignin {
  code: string
  constructor(message: string) {
    super(message)
    this.code = formatSlug(message)
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        return {
          ...profile,
          id: profile.sub,
          username: profile.name || profile.email.split('@')[0],
          userAvatar: profile.picture,
          roles: profile.permission ?? ['User'],
        }
      },
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      async profile(profile) {
        return {
          ...profile,
          id: profile.id,
          username: profile.username,
          email: profile.email,
          userAvatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.jpeg`,
          roles: profile.permission ?? ['User'],
        }
      },
    }),
    Credentials({
      id: 'login',
      name: 'Login',
      authorize: async (credentials) => {
        try {
          await signInSchema.validate(credentials)
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials),
            },
          )
          if (!res.ok) {
            if (res.status === 400 || res.status === 404) {
              throw new Error('Неверный логин или пароль')
            }
            throw new Error('Произошла какая-то ошибка во время авторизации')
          }

          const {
            username,
            email,
            roles,
            refreshToken,
            token: accessToken,
            expires: expAt,
          } = await res.json()

          return {
            username,
            email,
            roles,
            accessToken,
            refreshToken,
            expAt,
          }
        } catch (err) {
          if (err instanceof Error) {
            throw new AuthError(err.message)
          }
          throw new AuthError('Произошла какая-то ошибка во время авторизации')
        }
      },
    }),
    Credentials({
      id: 'register',
      name: 'Register',
      authorize: async (credentials) => {
        try {
          await registerSchema.validate(credentials)
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials),
            },
          )
          if (!res.ok)
            throw new Error('Произошла какая-то ошибка во время регистрации')

          const { refreshToken, accessToken, expires: expAt } = await res.json()

          return {
            username: credentials.nickname as string,
            email: credentials.email as string,
            roles: ['User'],
            expAt,
            accessToken,
            refreshToken,
          }
        } catch (err) {
          if (err instanceof Error) {
            throw new AuthError(err.message)
          }
          throw new AuthError('Произошла какая-то ошибка во время регистрации')
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (
        account?.provider !== 'credentials' &&
        account?.provider !== 'login' &&
        account?.provider !== 'register'
      ) {
        const userData = {
          provider: account?.provider,
          providerId: account?.providerAccountId,
          username: profile?.name,
          email: profile?.email ?? user.email,
          roles: user.roles ?? ['user'],
          userAvatar: user.userAvatar ?? profile?.picture,
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          },
        )

        if (!res.ok) {
          console.error('Ошибка создания пользователя на бэкенде')
          return false
        }
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.roles = user.roles
        token.username = user.username
        token.userAvatar = user.userAvatar
        token.expAt = user.expAt
      }

      if (Date.now() < new Date(token.expAt).getTime()) {
        return token
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              refreshToken: token.refreshToken,
            }),
          },
        )
        const data = await res.json()
        if (!res.ok) {
          throw data
        }
        return {
          ...token,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        return { ...token, error: 'RefreshTokenError' }
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.expAt = token.expAt
      session.user.roles = token.roles
      session.user.username = token.username
      session.user.userAvatar = token.userAvatar
      session.error = token.error
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      return baseUrl
    },
  },
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
})
