import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { useFiltersStore } from './useFiltersStore'

export type FiltersType = {
  status?: number[]
  tags?: string[]
  voiceover?: number[]
  minEp?: number
  maxEp?: number
  minRating?: number
  maxRating?: number
  order?: string
}

export const useFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { filtersValue, setFiltersValue } = useFiltersStore()

  useEffect(() => {
    if (Object.keys(filtersValue).length > 0) return

    const parseArray = (key: string): number[] | undefined => {
      const value = searchParams.get(key)
      if (!value) return undefined
      return value
        .split(',')
        .map((v) => Number(v))
        .filter((v) => !Number.isNaN(v))
    }

    const parseStringArray = (key: string): string[] | undefined => {
      const value = searchParams.get(key)
      if (!value) return undefined
      return value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
    }

    const parseNumber = (key: string): number | undefined => {
      const val = searchParams.get(key)
      if (!val) return undefined
      const num = Number(val)
      return Number.isNaN(num) ? undefined : num
    }

    const initialFilters: FiltersType = {
      status: parseArray('status'),
      tags: parseStringArray('tags'),
      voiceover: parseArray('voiceover'),
      minEp: parseNumber('min-ep'),
      maxEp: parseNumber('max-ep'),
      minRating: parseNumber('min-rating'),
      maxRating: parseNumber('max-rating'),
    }

    setFiltersValue(initialFilters)
  }, [searchParams])

  useEffect(() => {
    if (!filtersValue) return

    const params = new URLSearchParams(searchParams.toString())

    Object.entries(filtersValue).forEach(([key, value]) => {
      const kebabKey = key.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`)

      if (
        value == null ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'string' && value === '')
      ) {
        params.delete(kebabKey)
      } else if (Array.isArray(value)) {
        const cleaned = value
          .filter((v): v is string | number => {
            if (typeof v === 'number') return !Number.isNaN(v)
            if (typeof v === 'string') return v.trim() !== ''
            return false
          })
          .map(String)

        if (cleaned.length > 0) params.set(kebabKey, cleaned.join(','))
        else params.delete(kebabKey)
      } else if (typeof value === 'number') {
        if (!Number.isNaN(value)) params.set(kebabKey, String(value))
        else params.delete(kebabKey)
      } else {
        params.set(kebabKey, String(value))
      }
    })

    router.replace(`?${params.toString()}`, { scroll: false })

    return () => {
      if (!window.location.pathname.startsWith('/catalog')) {
        useFiltersStore.getState().resetFilters()
      }
    }
  }, [filtersValue])

  return { filtersValue, setFiltersValue }
}
