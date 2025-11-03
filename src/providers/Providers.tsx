'use client'

import { TooltipProvider } from '@/components/ui'

import AuthProvider from './AuthProvider'
import { FavoriteProvider } from './FavoriteProvider'
import { ThemeProvider } from './ThemeProvider'

interface Props {
  children: React.ReactNode
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme='system' enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <AuthProvider>
          <FavoriteProvider>{children}</FavoriteProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default Providers
