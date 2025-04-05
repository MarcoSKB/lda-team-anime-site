'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: React.ReactNode
}

const Portal: React.FC<Props> = ({ children }) => {
  const [loadedInClient, setLoadedInClient] = useState(false)
  useEffect(() => {
    setLoadedInClient(true)
  }, [])

  return loadedInClient && createPortal(children, document.body)
}

export default Portal
