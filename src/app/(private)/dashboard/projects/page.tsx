'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import { toast } from 'sonner'

import { getDashboardAnimeList } from '@/actions/dashboard'
import useServerAction from '@/hooks/useServerAction'

import { AnimeTable, Loading } from './_module'

const Page: React.FC = () => {
  const searchParams = useSearchParams()
  const pageIndex = Number(searchParams.get('page') ?? 0)
  const pageSize = Number(searchParams.get('count') ?? 10)
  const {
    data: animeList,
    error,
    isLoading,
    refetch,
  } = useServerAction(getDashboardAnimeList, pageIndex, pageSize)
  const stableRefetch = useCallback(() => refetch(), [refetch])
  if (error || animeList?.type == 'error') {
    toast.error(error)
    return (
      <div className='container mx-auto py-10'>
        Произошла ошибка. Повторите повторите попытку
      </div>
    )
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='container mx-auto py-10'>
      <AnimeTable
        data={animeList!.data.results}
        totalCount={animeList!.data.totalCount}
        searchParams={searchParams}
        refetchData={stableRefetch}
        page={pageIndex}
        count={pageSize}
      />
    </div>
  )
}
export default Page
