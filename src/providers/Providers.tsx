import { ThemeProvider } from './ThemeProvider'

interface Props {
  children: React.ReactNode
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme='system' enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}

export default Providers
