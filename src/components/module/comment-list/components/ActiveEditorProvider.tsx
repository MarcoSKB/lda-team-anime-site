'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

type ActiveEditorContextType = {
  activeId: string | null
  setActiveId: (id: string | null) => void
}

const ActiveEditorContext = createContext<ActiveEditorContextType | undefined>(
  undefined,
)

export const ActiveEditorProvider = ({ children }: { children: ReactNode }) => {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <ActiveEditorContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </ActiveEditorContext.Provider>
  )
}

export const useActiveEditor = () => {
  const ctx = useContext(ActiveEditorContext)
  if (!ctx) throw new Error('useActiveEditor must be used within provider')
  return ctx
}
