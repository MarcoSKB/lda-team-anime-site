'use client'

import { useEffect, useState } from 'react'

type AsyncFn<Args extends unknown[], R> = (...args: Args) => Promise<R>

const useServerAction = <Args extends unknown[], R>(
  action: AsyncFn<Args, R>,
  ...args: Args
) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<R | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await action(...args)
        if (mounted) setData(result)
      } catch (err) {
        if (mounted) setError(err as Error)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [action, ...args])

  return { data, isLoading, error }
}

export default useServerAction
