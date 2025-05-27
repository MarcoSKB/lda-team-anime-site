'use client'

import { useTheme } from 'next-themes'

import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
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

export default Toaster
