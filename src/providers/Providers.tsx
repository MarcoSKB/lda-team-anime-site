import { SessionProvider } from 'next-auth/react'

import { ThemeProvider } from './ThemeProvider'

interface Props {
  children: React.ReactNode
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme='system' enableSystem disableTransitionOnChange>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}

export default Providers
