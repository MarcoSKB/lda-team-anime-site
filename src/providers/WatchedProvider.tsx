'use client'

import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { toast } from 'sonner'

import { changeWatchedTitle, getUserWatchedTitles } from '@/actions/account'

type WatchedContextType = {
  watched: string[]
  toggleWatched: (id: string) => Promise<void>
  reloadWatched: () => Promise<void>
  isLoading: boolean
}

const WatchedContext = createContext<WatchedContextType | undefined>(undefined)

export const WatchedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession()
  const [watched, setWatched] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      reloadWatched()
    } else if (status === 'unauthenticated') {
      setWatched([])
    }
  }, [status])

  const reloadWatched = async () => {
    if (!session) return
    try {
      setIsLoading(true)
      const res = await getUserWatchedTitles()
      if (res.type == 'error') {
        if (res.message == 'access_denied') return

        throw new Error('Не удалось загрузить просмотренное')
      }
      const titleIdList = res.data.results.map((title) => title.id)

      setWatched(titleIdList)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleWatched = async (titleId: string) => {
    try {
      if (!session) toast.error('Вы не авторизованы.')

      setIsLoading(true)
      const res = await changeWatchedTitle(titleId)
      if (res.type == 'error')
        throw new Error('Не удалось поменять просмотренное')
      const isAdded = res.data

      setWatched((prev) => {
        if (isAdded) {
          toast.message('Аниме добавлен в просмотренное')
          return [...prev, titleId]
        } else {
          toast.message('Аниме удалено из просмотренного')
          return prev.filter((f) => f !== titleId)
        }
      })
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <WatchedContext.Provider
      value={{ watched, toggleWatched, reloadWatched, isLoading }}
    >
      {children}
    </WatchedContext.Provider>
  )
}

export const useWatched = () => {
  const ctx = useContext(WatchedContext)
  if (!ctx) throw new Error('useWatched must be used within WatchedProvider')
  return ctx
}
