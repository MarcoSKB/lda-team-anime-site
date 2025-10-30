'use client'

import { createContext, useContext, useRef } from 'react'

const ImageMapContext = createContext<React.MutableRefObject<
  Map<string, File>
> | null>(null)

export const ImageMapProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const imageMapRef = useRef(new Map<string, File>())
  return (
    <ImageMapContext.Provider value={imageMapRef}>
      {children}
    </ImageMapContext.Provider>
  )
}

export const useImageMap = () => {
  const ctx = useContext(ImageMapContext)
  if (!ctx)
    throw new Error('useImageMap must be used inside <ImageMapProvider>')
  return ctx
}
