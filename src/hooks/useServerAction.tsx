'use client'

import { useCallback, useEffect, useState } from 'react'

type AsyncFn<Args extends unknown[], R> = (...args: Args) => Promise<R>

const useServerAction = <Args extends unknown[], R>(
  action: AsyncFn<Args, R>,
  ...args: Args
) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<R | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await action(...args)
      setData(result)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
      if (typeof err === 'string') {
        setError(err)
      }
      setError('Не удалось загрузить данные.')
    } finally {
      setIsLoading(false)
    }
  }, [action, ...args])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, isLoading, error, refetch: fetchData }
}

export default useServerAction
