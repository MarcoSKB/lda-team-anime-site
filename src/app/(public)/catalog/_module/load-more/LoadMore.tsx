'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Card } from '@/components/module'

import { getCatalogList } from '@/actions/anime'
import { ShortAnimeTitle } from '@/types/anime.types'
import { ANIME_STATUS_TITLE } from '@/utils/global-vars'

import { useFiltersStore } from '../filter-menu/hooks/useFiltersStore'

interface Props {
  initiaHasMore: boolean
}

const LoadMore: React.FC<Props> = ({ initiaHasMore }) => {
  const [items, setItems] = useState<ShortAnimeTitle[]>([])
  const [hasMore, setHasMore] = useState(initiaHasMore)
  const [loading, setLoading] = useState(false)
  const { ref, inView } = useInView()
  const [page, setPage] = useState(1)
  const params = useSearchParams()
  const filtersValue = useFiltersStore((state) => state.filtersValue)

  const fetchMore = async (pageNum: number) => {
    try {
      setLoading(true)
      const query = Object.fromEntries(params.entries())
      const res = await getCatalogList({
        ...query,
        page: String(pageNum * 20),
        take: String(20),
      })

      if (res.type === 'error' || res.data.results.length === 0) {
        setHasMore(false)
      } else {
        if (res.data.count < 20) setHasMore(false)
        setItems((prev) => [...prev, ...res.data.results])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setItems([])

    fetchMore(1)
    setPage(2)
  }, [filtersValue, params.toString()])

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchMore(page)
      setPage((prev) => prev + 1)
    }
  }, [inView])

  return (
    <>
      {items.length > 0 &&
        items.map((anime) => (
          <li key={anime.id} className='max-w-[220px]'>
            <Card
              img={anime.poster?.url ?? '/images/placeholder-image.jpg'}
              voiceoverType={anime.currentVoiceoverType}
              format={ANIME_STATUS_TITLE[anime.currentTitleStatus]}
              tags={anime.genres}
              slug={anime.slug}
              title={anime.name}
            />
          </li>
        ))}

      {hasMore &&
        [...Array(10)].map((_, idx) => (
          <li key={idx} ref={idx === 1 ? ref : undefined}>
            <div className='group dark:border-secondary flex h-full w-full max-w-[220px] scroll-mt-10 flex-col gap-2 overflow-hidden rounded-lg border-1 border-solid border-[#d5d9e2] p-2 drop-shadow-xl dark:drop-shadow-none'>
              <div className='md:bg-secondary relative z-0 aspect-[202/264] h-full w-full animate-pulse rounded-[4px] bg-gray-500' />
              <div className='flex h-full flex-col gap-1 px-0.5'>
                <span className='dark:bg-secondary h-[14px] w-full animate-pulse rounded-xs bg-gray-500' />
                <span className='dark:bg-secondary h-[12px] w-[20%] animate-pulse rounded-xs bg-gray-500' />
              </div>
            </div>
          </li>
        ))}
    </>
  )
}

export default LoadMore
