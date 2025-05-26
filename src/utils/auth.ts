import NextAuth, { User } from 'next-auth'
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
          permission: profile.permission ?? 'user',
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
          permission: profile.permission ?? 'user',
        }
      },
    }),
    Credentials({
      id: 'login',
      name: 'Login',
      authorize: async (credentials) => {
        try {
          await signInSchema.validate(credentials)
          // const res = await fetch(
          //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
          //   {
          //     method: 'POST',
          //     headers: { 'Content-Type': 'application/json' },
          //     body: JSON.stringify(credentials),
          //   },
          // )
          // if (!res.ok) return null

          // const user = await res.json()
          return {
            id: 'ID',
            username: 'Marco',
            email: 'Marco@marco.com',
            permission: 'admin',
            accessToken: 'fwefwe',
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
          // const res = await fetch(
          //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
          //   {
          //     method: 'POST',
          //     headers: { 'Content-Type': 'application/json' },
          //     body: JSON.stringify(credentials),
          //   },
          // )
          // if (!res.ok) throw new Error("Произошла какая-то ошибка во время регистрации")

          // const user = await res.json()
          return {
            id: 'ID',
            username: 'Marco',
            email: 'Marco@marco.com',
            permission: 'user',
            accessToken: 'fwefwe',
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
    // async signIn({ user, account, profile }) {
    //   if (
    //     account?.provider !== 'credentials' &&
    //     account?.provider !== 'login' &&
    //     account?.provider !== 'register'
    //   ) {
    //     const userData = {
    //       provider: account?.provider,
    //       providerId: account?.providerAccountId,
    //       username: profile?.name,
    //       email: profile?.email ?? user.email,
    //       permission: user.permission ?? 'user',
    //       userAvatar: user.userAvatar ?? profile?.picture,
    //     }

    //     const res = await fetch(
    //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth`,
    //       {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(userData),
    //       },
    //     )

    //     if (!res.ok) {
    //       console.error('Ошибка создания пользователя на бэкенде')
    //       return false
    //     }
    //   }

    //   return true
    // },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.permission = user.permission
        token.username = user.username
        token.userAvatar = user.userAvatar
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user.permission = token.permission
      session.user.username = token.username
      session.user.userAvatar = token.userAvatar
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
