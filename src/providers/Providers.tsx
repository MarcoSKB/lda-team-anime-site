'use client'

import { TooltipProvider } from '@/components/ui'

import AuthProvider from './AuthProvider'
import { FavoriteProvider } from './FavoriteProvider'
import { ThemeProvider } from './ThemeProvider'
import { WatchedProvider } from './WatchedProvider'

interface Props {
  children: React.ReactNode
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme='system' enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <AuthProvider>
          <WatchedProvider>
            <FavoriteProvider>{children}</FavoriteProvider>
          </WatchedProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default Providers
