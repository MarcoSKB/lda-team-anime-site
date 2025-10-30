'use client'

import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { toast } from 'sonner'

import { changeFavoriteTitle, getUserFavoriteTitles } from '@/actions/account'

type FavoriteContextType = {
  favorites: string[]
  toggleFavorite: (id: string) => Promise<void>
  reloadFavorites: () => Promise<void>
  isLoading: boolean
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
)

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession()
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      reloadFavorites()
    } else if (status === 'unauthenticated') {
      setFavorites([])
    }
  }, [status])

  const reloadFavorites = async () => {
    if (!session) return
    try {
      setIsLoading(true)
      const res = await getUserFavoriteTitles()
      if (res.type == 'error') {
        if (res.message == 'access_denied') return

        throw new Error('Не удалось загрузить избранное')
      }
      const titleIdList = res.data.results.map((title) => title.id)

      setFavorites(titleIdList)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleFavorite = async (titleId: string) => {
    try {
      if (!session) toast.error('Вы не авторизованы.')

      setIsLoading(true)
      const res = await changeFavoriteTitle(titleId)
      if (res.type == 'error') throw new Error('Не удалось поменять избранное')
      const isAdded = res.data

      setFavorites((prev) => {
        if (isAdded) {
          toast.message('Аниме добавлен в избранное')
          return [...prev, titleId]
        } else {
          toast.message('Аниме удален из избранных')
          return prev.filter((f) => f !== titleId)
        }
      })
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite, reloadFavorites, isLoading }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}

export const useFavorites = () => {
  const ctx = useContext(FavoriteContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoriteProvider')
  return ctx
}
