import { DefaultSession } from 'next-auth'
import 'next-auth/jwt'

import { UserType } from './account.types'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string
    refreshToken: string
    error?: string
    expAt: number
    user: UserType
  }

  interface User extends UserType {
    accessToken: string
    refreshToken: string
    expAt: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends UserType {
    accessToken: string
    refreshToken: string
    error?: string
    expAt: number
    lastRefresh: number
  }
}
