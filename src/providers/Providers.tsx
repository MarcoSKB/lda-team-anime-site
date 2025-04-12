import ThemeProvider from './ThemeProvider'

interface Props {
  children: React.ReactNode
}

const Providers: React.FC<Props> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

export default Providers
