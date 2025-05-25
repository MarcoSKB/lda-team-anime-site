import { UserType } from '@/types/account.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserState = {
  user: UserType | null
  accessToken: string | null
  refreshToken: string | null
}

type UserActions = {
  setUser: (user: UserType) => void
  setTokens: (accessToken: string, refreshToken: string) => void
  logout: () => void
}

type UserStore = UserState & UserActions

export const useUserSession = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        username: 'Marco',
        email: 'Marco@marco.com',
        permission: 'admin',
      },
      accessToken: null,
      refreshToken: null,
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: 'user-session',
    },
  ),
)
