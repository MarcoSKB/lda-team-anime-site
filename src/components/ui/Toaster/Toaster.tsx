'use client'

import { useTheme } from 'next-themes'

import { Toaster as Sonner, ToasterProps } from 'sonner'

export const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme()

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps['theme']}
      className='toaster group'
      richColors
      {...props}
    />
  )
}
