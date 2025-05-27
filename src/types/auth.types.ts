import { DefaultSession } from 'next-auth'
import 'next-auth/jwt'

import { UserType } from './account.types'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string
    user: UserType
  }

  interface User extends UserType {
    accessToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends UserType {
    accessToken: string
  }
}
