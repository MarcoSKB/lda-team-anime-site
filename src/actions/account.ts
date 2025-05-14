'use server'

import { sleep } from '@/utils/system'

interface UserType {
  email: string
  username: string
  userAvatar?: string
  permission: 'user' | 'moderator' | 'admin'
}

export const getUser = async (): Promise<UserType | null> => {
  await sleep(3000)

  return {
    username: 'Marco',
    email: 'Marco@marco.com',
    permission: 'user',
  }
}
