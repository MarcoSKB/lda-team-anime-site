'use client'

import { SessionProvider, signOut, useSession } from 'next-auth/react'
import { Suspense, useEffect } from 'react'

interface Props {
  children: React.ReactNode
}

const SessionWatcher = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === 'RefreshTokenError') {
      signOut({ callbackUrl: '/signin' })
    }
  }, [session])

  return null
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  return (
    <Suspense>
      <SessionProvider>
        <SessionWatcher />
        {children}
      </SessionProvider>
    </Suspense>
  )
}

export default AuthProvider
