'use client'

import { SessionProvider, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { TooltipProvider } from '@/components/ui'

import { FavoriteProvider } from './FavoriteProvider'
import { ThemeProvider } from './ThemeProvider'

interface Props {
  children: React.ReactNode
}

const SessionWatcher = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === 'RefreshTokenError') {
      signOut({ callbackUrl: '/signin' })
    }
  }, [session])

  return null
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme='system' enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <SessionProvider>
          <SessionWatcher />
          <FavoriteProvider>{children}</FavoriteProvider>
        </SessionProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default Providers
