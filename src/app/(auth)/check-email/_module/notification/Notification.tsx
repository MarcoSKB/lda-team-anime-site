'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { toast } from 'sonner'

const Notification: React.FC = () => {
  const params = useSearchParams()
  useEffect(() => {
    const error = params.get('error')
    if (error == 'notconfirmed') toast.error('Почта не потверждена')
  }, [params])

  return null
}

export default Notification
