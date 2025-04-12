'use client'

import { createContext, useEffect, useState } from 'react'

export interface ThemeContextType {
  theme: ThemeVariants
  changeTheme: () => void
  resolvedTheme: 'light' | 'dark'
}

type ThemeVariants = 'dark' | 'light' | 'system'

interface Props {
  children: React.ReactNode
}

const applyTheme = (theme: ThemeVariants) => {
  document.documentElement.setAttribute('data-theme', theme)
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeVariants>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark')

  const changeTheme = () => {
    if (theme === 'dark') {
      setThemeState('light')
      localStorage.setItem('theme', 'light')
      return
    }
    if (theme === 'light') {
      setThemeState('dark')
      localStorage.setItem('theme', 'dark')
      return
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemeVariants
    const initialTheme = stored || 'system'
    setThemeState(initialTheme)
  }, [])

  useEffect(() => {
    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      const systemTheme = media.matches ? 'dark' : 'light'
      setResolvedTheme(systemTheme)
      applyTheme(systemTheme)
      const listener = (e: MediaQueryListEvent) => {
        const newTheme = e.matches ? 'dark' : 'light'
        setResolvedTheme(newTheme)
        applyTheme(newTheme)
      }
      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
    } else {
      setResolvedTheme(theme)
      applyTheme(theme)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
