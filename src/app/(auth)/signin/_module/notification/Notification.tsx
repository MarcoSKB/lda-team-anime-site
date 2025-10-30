'use client'

import { useEffect } from 'react'

import { toast } from 'sonner'

const Notification: React.FC = () => {
  useEffect(() => {
    if (sessionStorage.getItem('verified')) {
      toast.success('Email успешно подтверждён! Теперь войдите в аккаунт.')
      sessionStorage.removeItem('verified')
    }
  }, [])

  return null
}

export default Notification
