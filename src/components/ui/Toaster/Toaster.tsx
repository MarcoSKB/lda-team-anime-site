'use client'

import { useTheme } from 'next-themes'

import { Toaster as Sonner, ToasterProps } from 'sonner'

import { useMediaQuery } from '@/hooks/useMediaQuery'

export const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme()
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps['theme']}
      className='toaster group'
      position={isMobile ? 'top-center' : 'bottom-right'}
      richColors
      {...props}
    />
  )
}
